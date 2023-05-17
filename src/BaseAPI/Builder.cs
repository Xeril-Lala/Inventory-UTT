﻿using BaseAPI.Classes;
using Engine.BL;
using Engine.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BaseAPI
{
    public static class Builder
    {
        public static string URL { get; set; } = string.Empty;

        public static void Build(
            WebProperties props, 
            Action<WebApplicationBuilder>? builderCallback = null, 
            Action<WebApplication>? appCallback = null
        )
        {            
            var builder = props.Builder;
            SetServices(builder.Services);
            builderCallback?.Invoke(builder);

            var app = builder.Build();
            SetApplication(props.Name, app);
            appCallback?.Invoke(app);

            SetConnections(props);
            SetErrorsCallback();
            SetUrl(props);

            //props.SubscriptionAPI.SendAPI();

            BinderBL.Start();

            app.Run();
        }        

        private static void SetServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddSwaggerGen();
            services.AddCors(SetCors);
        }

        private static void SetCors(CorsOptions options)
        {
            options.AddDefaultPolicy(policy =>
            {
                policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
            });

            //options.AddPolicy("SignalR", policy =>
            //{
            //    policy
            //    .WithOrigins("http://localhost", "http://localhost:4200", "http://192.168.0.114")
            //    .AllowAnyHeader()
            //    .WithMethods("GET", "POST")
            //    .AllowCredentials();
            //});
        }

        private static void SetApplication(string apiName, WebApplication app)
        {
            app.MapGet("/", () => $"{apiName} API is working...");

            app.UseStaticFiles();
            app.UseRouting();

            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseCors();
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}"
            );
        }

        private static void SetConnections(WebProperties props)
        {
            var builder = props.Builder;

            if (props.ConnectionString != null)
            {
                ConnectionString.SetConnectionString(
                    () => builder.Configuration.GetConnectionString(props.ConnectionString), 
                    props.ConnectionString
                );
            }

            if (props.ConnectionString != null && props.ConnectionStrings.Count > 0)
            {
                foreach (var connectionName in props.ConnectionStrings)
                {
                    var conn = builder.Configuration.GetConnectionString(connectionName);
                    ConnectionString.AddConnectionString(
                        ConnectionString.InstanceName(() => conn, connectionName)
                    );
                }
            }
        }
        
        private static void SetUrl(WebProperties props)
        {
            try
            {
                var builder = props.Builder;
                var url = builder.Configuration.GetSection("Configuration").GetValue<string>("Url");

                if (!string.IsNullOrEmpty(url))
                {
                    URL = url;
                }

            } catch
            {

            }        
        }

        private static void SetErrorsCallback()
        {
            BinderBL.SetDalError((ex, msg) => Console.WriteLine($"Error Opening connection {msg} - {ex.Message}"));
        }        

    }
}
