
using HH_Api.Model;
using Microsoft.EntityFrameworkCore;

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

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
