using HH_Api.Auth;
using HH_Api.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;

namespace HH_Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var connectionString = builder.Configuration
                        .GetConnectionString("HH")
                        ?? throw new ArgumentNullException();

            // Add services to the container.
            builder.Services.AddDbContext<Context>(
                 dbBuilder =>
                 {
                     dbBuilder.UseMySQL(connectionString);
                 });
            AddJwtAuthentication(builder);
            
            builder.Services.AddControllers()
                .AddJsonOptions(o =>
                {
                    o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            
            var app = builder.Build();
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.Use((context, next) =>
            {
                var auth = context.Request.Headers.Authorization;
                app.Logger.LogDebug($"*** Authorization: {auth}");
                return next();
            });
            
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
        
        private static void AddJwtAuthentication(WebApplicationBuilder builder)
        {
            var secretKey = builder.Configuration["Auth:Jwt:Key"];
            var issuer = builder.Configuration["Auth:Jwt:Issuer"];
            var audience = builder.Configuration["Auth:Jwt:Audience"]; 
            if (string.IsNullOrEmpty(secretKey) || string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(audience))
            {
                throw new ApplicationException("Authentication konfiguráció hiányzik");
            }


            var tokenManager = new TokenManager(builder.Configuration);
            builder.Services.AddSingleton(tokenManager);
            
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = issuer,
                        ValidAudience = audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                    };
                    
                    options.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = async context =>
                        {
                            var email = context.Principal?.FindFirst(ClaimTypes.Name)?.Value;
                            if (!string.IsNullOrEmpty(email))
                            {
                                var dbContext = context.HttpContext.RequestServices.GetService<Context>() ??
                                                throw new ApplicationException("Kritikus hiba: Db kontextus nem elérhető!");

                                var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
                                if (user != null)
                                {
                                    if (user.Token != null)
                                    {
                                        var token = (context.SecurityToken as JsonWebToken)?.EncodedToken;
                                        if (user.Token != token)
                                        {
                                            user.Token = token;
                                            await dbContext.SaveChangesAsync();
                                        }
                                        return;
                                    }
                                    else context.Fail("Érvénytelen token: lezárt kapcsolat");
                                }
                                else context.Fail("Ismeretlen felhasználó");
                            }
                            else context.Fail("Érvénytelen token: azonosítás nem lehetséges");
                        }
                    };
                });
            builder.Services.AddAuthorization(options =>
            {
                foreach (var permission in tokenManager.Permissions)
                {
                    options.AddPolicy(permission, policy => policy.RequireClaim("permission", permission));
                }
            });
            builder.Services.AddSwaggerGen(
                options =>
                {
                    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                    {
                        Name = "Authorization",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.Http,
                        Scheme = "Bearer",
                        BearerFormat = "JWT"
                    });

                    options.AddSecurityRequirement(new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            Array.Empty<string>()
                        }
                    });
                });
        }
    }
}
