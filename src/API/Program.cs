using BaseAPI;
using BaseAPI.Classes;
using Engine.BO;
using Engine.Constants;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

Builder.Build(new WebProperties("InventoryAPI", WebApplication.CreateBuilder(args))
{
    ConnectionString = C.INVENTORY_UTT_DB
},
    builderCallback: web =>
    {
        var configuration = web.Configuration;
        var issuer = configuration["Jwt:Issuer"];
        var key = configuration["Jwt:Key"];

        web.Services.AddHttpLogging(logging => {
            // Customize HTTP logging here.
            logging.LoggingFields = HttpLoggingFields.All;
            logging.RequestHeaders.Add("sec-ch-ua");
            logging.ResponseHeaders.Add("my-response-header");
            logging.MediaTypeOptions.AddText("application/javascript");
            logging.RequestBodyLogLimit = 4096;
            logging.ResponseBodyLogLimit = 4096;
        });

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

        JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

        web.Services.AddControllers().AddJsonOptions( options => {
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        });

        CustomController.GetUser = identity => identity.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
    },
    appCallback: app =>
    {
        app.UseAuthentication();
        app.UseAuthorization();
    }
);