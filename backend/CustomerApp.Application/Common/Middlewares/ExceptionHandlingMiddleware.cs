using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;

namespace CustomerApp.Application.Common.Middlewares
{


    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context); // call next middleware
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception occurred."); // log the exception
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
            string message = "An unexpected error occurred.";

            // Optional: handle specific exception types
            if (exception is KeyNotFoundException)
            {
                statusCode = HttpStatusCode.NotFound;
                message = exception.Message;
            }
            else if (exception is UnauthorizedAccessException)
            {
                statusCode = HttpStatusCode.Unauthorized;
                message = exception.Message;
            }

            var response = new
            {
                StatusCode = (int)statusCode,
                Message = message
            };

            string json = JsonSerializer.Serialize(response);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            return context.Response.WriteAsync(json);
        }
    }
}