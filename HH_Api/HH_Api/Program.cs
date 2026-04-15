using CloudinaryDotNet;
using HH_Api.Auth;
using HH_Api.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
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
    public partial class Program
    {

        const string cloudName = "dknhbvrq9";
        const string APIKey = "299914551751983";
        const string APISecret = "hm8OXqwnUdm_0Kows3OXccaOmqk";

        public static void Main(string[] args)
        {
            Account account = new Account(cloudName, APIKey, APISecret);
            Cloudinary cloudinary = new Cloudinary(account);

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

            builder.Services.AddSingleton(cloudinary);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173", "https://dolphin-app-v9aox.ondigitalocean.app", "https://használthangszerek.hu/")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                    });
            });

            builder.Services.AddControllers()
                .AddJsonOptions(o =>
                {
                    o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseRouting();
            app.UseCors("AllowReactApp");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.Use((context, next) =>
            {
                var token = context.Request.Cookies["jwt"];
                if (!string.IsNullOrEmpty(token))
                {
                    app.Logger.LogDebug($"*** Token: {token}");
                }
                else
                {
                    app.Logger.LogDebug("*** Token Not Found");
                }
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
                builder.Services.AddAuthentication();
                builder.Services.AddAuthorization();
                return;
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
                        OnMessageReceived = context =>
                        {
                            if (context.Request.Cookies.TryGetValue("jwt", out var token))
                            {
                                context.Token = token;
                            }
                            return Task.CompletedTask;
                        },


                        OnTokenValidated = async context =>
						{
							var email = context.Principal?.FindFirst(ClaimTypes.Name)?.Value;
							if (!string.IsNullOrEmpty(email))
							{
								var dbContext = context.HttpContext.RequestServices.GetService<Context>() ??
												throw new ApplicationException("Kritikus hiba: Db kontextus nem elérhető!");

								var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
								
								if (user == null || string.IsNullOrEmpty(user.Token)) 
								{
									context.Fail("Érvénytelen token vagy lezárt munkamenet.");
									return;
								}

								var currentToken = context.SecurityToken as JsonWebToken;
								var encodedToken = currentToken?.EncodedToken;

								if (user.Token != encodedToken)
								{
									context.Fail("A token már nem érvényes (máshol jelentkeztek be).");
									return;
								}
							}
							else 
							{
								context.Fail("Érvénytelen azonosító.");
							}
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

            builder.Services.AddSwaggerGen(opt =>
            {
                opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT"
                });

                opt.AddSecurityRequirement(new OpenApiSecurityRequirement
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
    public partial class Program { }
}
