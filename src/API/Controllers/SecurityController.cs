using BaseAPI.Classes;
using Engine.BO;
using Engine.Constants;
using Engine.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Asn1;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : CustomController
    {
        private readonly IConfiguration _configuration;
        public SecurityController(IConfiguration conf) => _configuration = conf;

        [AllowAnonymous]
        [HttpPost("token")]
        public Result GetToken([FromBody] JsonElement data) => RequestResponse(() => {
            var jObj = JsonObject.Create(data);
            string? user = ParseProperty<string>.GetValue("user", jObj, SetErrorOnRequest),
                    password = ParseProperty<string>.GetValue("password", jObj, SetErrorOnRequest);

            if (AuthCredentials(user, password))
            {
                return GetJWT(user ?? string.Empty);
            } else
            {
                ErrorManager?.Subscription?.Invoke(new Exception("Failed Authorization!"), "Failed Authorization. Incorrect User or Password");
                return string.Empty;
            }
        });

        [Authorize]
        [HttpGet("checkToken")]
        public Result CheckToken() => RequestResponse(() =>
        {
            Console.WriteLine(User);
            return C.OK;
        });

        private object? GetJWT(string user)
        {
            object? tokenResult = null;
            var key = _configuration["Jwt:Key"];
            var issuer = _configuration["Jwt:Issuer"];
            var expiration = _configuration["Jwt:Expiration"];

            if (key != null)
            {
                var parsedKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                var credentials = new SigningCredentials(parsedKey, SecurityAlgorithms.HmacSha256);

                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, user),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var expirationDt = !string.IsNullOrEmpty(expiration)
                    ? DateTime.Now.AddMinutes(int.Parse(expiration))
                    : DateTime.Now.AddHours(1);

                var tokenOptions = new JwtSecurityToken(
                    issuer: issuer,
                    audience: issuer,
                    claims: claims,
                    expires: expirationDt,
                    signingCredentials: credentials
                );

                tokenResult = new {
                    token = new JwtSecurityTokenHandler().WriteToken(tokenOptions),
                    expiration = expirationDt
                };
            }

            return tokenResult;
        }

        private bool AuthCredentials(string? user, string? password)
        {
            var _user = _configuration["Secret:User"];
            var _password = _configuration["Secret:Password"];

            return _user == user && _password == password;
        }
    }
}
