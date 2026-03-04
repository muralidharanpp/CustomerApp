using CustomerApp.Application.Commands;
using CustomerApp.Application.Common.Middlewares;
using CustomerApp.Application.Interfaces;
using CustomerApp.Infrastructure.Data;
using CustomerApp.Infrastructure.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Serilog;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        // Configure Serilog before building the app
        Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(builder.Configuration)
            .Enrich.FromLogContext()
            .CreateLogger();

        builder.Host.UseSerilog(); // 

        builder.Services.AddDbContext<AppDbContext>(options =>
           options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));


        builder.Services.AddCors(options =>
        {
            options.AddPolicy("DevCorsPolicy", policy =>
            {
                policy
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
        builder.Services.AddMediatR(typeof(CreateCustomerHandler));

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();
        app.UseCors("DevCorsPolicy");
        app.UseMiddleware<ExceptionHandlingMiddleware>();


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