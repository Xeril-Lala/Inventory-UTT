using BaseAPI;
using BaseAPI.Classes;
using Engine.Constants;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Unicode;

Builder.Build(new WebProperties("InventoryAPI", WebApplication.CreateBuilder(args))
{
    ConnectionString = C.INVENTORY_UTT_DB
},
    builderCallback: web =>
    {
        var configuration = web.Configuration;
        var issuer = configuration["Jwt:Issuer"];
        var key = configuration["Jwt:Key"];

        web.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options => {
            options.TokenValidationParameters = new()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = issuer,
                ValidAudience = issuer,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            };
        });

        web.Services.AddControllers().AddJsonOptions( options => {
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        });

    },
    appCallback: app =>
    {
        app.UseAuthentication();
        app.UseAuthorization();
    }
);