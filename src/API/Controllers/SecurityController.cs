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
using System.Security.Cryptography;

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

        [AllowAnonymous]
        [HttpPost("checkToken")]
        public Result CheckToken([FromBody] JsonElement data, [FromHeader(Name = "Authorization")] string token ) => RequestResponse(() =>
        {

            try
            {
                var jObj = JsonObject.Create(data);
                var principal = GetPrincipalFromExpiredToken(token
                    .Replace("Bearer", "")
                    .Replace("\n", "")
                    .Trim()
                );
                var username = principal?.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
                var refresh = principal?.FindFirst(C.REFRESH_TOKEN)?.Value;

                var refreshToken = ParseProperty<string>.GetValue("refreshToken", jObj, onMissingProperty: ErrorManager.Subscription);

                if (refresh == refreshToken)
                {
                    var oUser = DAL.GetUsers(username)?.FirstOrDefault();

                    if (oUser != null)
                        return GetJWT(oUser);
                }

            } catch
            {
                return C.NOT_AUTH;
            }

            return C.NOT_AUTH;
        });

        private object? GetJWT(User user)
        {
            object? tokenResult = null;
            var key = _configuration["Jwt:Key"];
            var issuer = _configuration["Jwt:Issuer"];
            var expiration = _configuration["Jwt:Expiration"];
            var username = user.Username;
            var group = user?.Group?.Code;
            var refreshToken = GenerateRefreshToken();

            if (key != null && user?.Group != null && !string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(group))
            {
                var parsedKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                var credentials = new SigningCredentials(parsedKey, SecurityAlgorithms.HmacSha256);

                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(C.ROLE, group),
                    new Claim(C.REFRESH_TOKEN, refreshToken)
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

                var userDto = new UserDTO();
                userDto.Map(user);

                tokenResult = new {
                    token = new JwtSecurityTokenHandler().WriteToken(tokenOptions),
                    expiration = tokenOptions.ValidTo,
                    user = userDto,
                    refreshToken
                };
            }

            return tokenResult;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
        {
            ClaimsPrincipal? principal = null;
            var key = _configuration["Jwt:Key"];

            if ( !string.IsNullOrEmpty(key))
            {
                var validationOptions = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidAudience = _configuration["Jwt:Issuer"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                    ClockSkew = TimeSpan.Zero
                };

                var handler = new JwtSecurityTokenHandler();
                principal = handler.ValidateToken(token, validationOptions, out SecurityToken securityToken);
                // var jwtToken = (JwtSecurityToken)securityToken;
            }

            return principal;
        }

        private bool AuthCredentials(string? user, string? password, out User? oUser)
        {
            var result = DAL.AuthUser(user, password);

            oUser = DAL.GetUsers(username: user)?.FirstOrDefault();

            return result.Data != null && result?.Data?.ToString() == C.OK;
        }
    }
}
