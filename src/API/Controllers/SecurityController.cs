using BaseAPI.Classes;
using Engine.BO;
using Engine.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using InventoryAPI.DTOs;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : CustomController
    {
        private readonly IConfiguration _configuration;
        public SecurityController(IConfiguration conf) => _configuration = conf;

        [AllowAnonymous]
        [HttpPost("login")]
        public Result GetToken([FromBody] JsonElement data) => RequestResponse(() => {

            // TODO: Add already logged in logic
            var jObj = JsonObject.Create(data);
            string? user = ParseProperty<string>.GetValue("user", jObj, SetErrorOnRequest),
                    password = ParseProperty<string>.GetValue("password", jObj, SetErrorOnRequest);

            if (AuthCredentials(user, password, out User? oUser) && oUser != null)
            {
                return GetJWT(oUser);
            } else
            {
                return C.NOT_AUTH;
            }
        });

        [Authorize]
        [HttpGet("checkToken")]
        public Result CheckToken() => RequestResponse(() =>
        {
            Console.WriteLine(User);
            return C.OK;
        });

        private object? GetJWT(User user)
        {
            object? tokenResult = null;
            var key = _configuration["Jwt:Key"];
            var issuer = _configuration["Jwt:Issuer"];
            var expiration = _configuration["Jwt:Expiration"];
            var username = user.Username;
            var group = user?.Group?.Code;

            if (key != null && user?.Group != null && !string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(group))
            {
                var parsedKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                var credentials = new SigningCredentials(parsedKey, SecurityAlgorithms.HmacSha256);

                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(C.ROLE, group)
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

                var groupDto = new AssetDTO();
                groupDto.Map(user.Group);

                tokenResult = new {
                    token = new JwtSecurityTokenHandler().WriteToken(tokenOptions),
                    expiration = expirationDt,
                    group = groupDto
                };
            }

            return tokenResult;
        }

        private bool AuthCredentials(string? user, string? password, out User? group)
        {
            var result = DAL.AuthUser(user, password);

            group = DAL.GetUsers(username: user)?.FirstOrDefault();

            return result.Data != null && result?.Data?.ToString() == C.OK;
        }
    }
}
