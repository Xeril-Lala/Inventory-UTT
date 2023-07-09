using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BaseAPI.Classes;
using Engine.BO;
using InventoryAPI.DTOs;
using Engine.Constants;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using BaseAPI;
using System.Text.Json.Nodes;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata.Ecma335;
using Engine.BO.Classes;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : CustomController
    {
        [HttpPost]
        public Result SetUser([FromBody] JsonElement obj)
        => RequestBlock(result =>
        {
            var jObj = JsonObject.Create(obj);

            return InsertUser(jObj);
        });

        [HttpPost("contact")]
        public Result SetContact([FromBody] UserContactDTO contact) => RequestBlock(result => InsertUserContact(contact));

        [HttpPost("fullInfo")]
        public Result SetFullInfo([FromBody] JsonElement obj)
        => RequestBlock(result => 
        {
            var jObj = JsonObject.Create(obj);
            var contact = JsonSerializer.Deserialize<UserContactDTO>(jObj, options: new JsonSerializerOptions()
            {
                AllowTrailingCommas = true,
                PropertyNameCaseInsensitive = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            var userResult = InsertUser(jObj);

            if(contact != null && userResult?.Status == C.OK)
            {
                var contactResult = InsertUserContact(contact);
                var user = (UserDTO?)userResult.Data;
                var userContact = (UserContactDTO?)contactResult?.Data;

                if (user != null && userContact != null)
                {
                    userContact.User = null;
                    user.Contact = userContact;
                    userResult.Data = user;
                }
            }

            result = userResult;

            return result;
        });

        [HttpGet]
        public Result GetUsers(string? username = null, string? search = null, bool? isActive = null ) 
        => RequestResponse(() =>
        {
            var model = DAL.GetUsers(username, search, isActive);

            return UserDTO.MapList<UserDTO>(model);
        });

        [HttpGet("{username}")]
        public Result GetDBUser(string username)
        => RequestResponse(() =>
        {
            var model = DAL.GetUsers(username: username)?.FirstOrDefault();

            return new UserDTO(model);
        });

        private Result? InsertUser(JsonObject? jObj)
        {
            Result? result = null;

            string? hashedPassword = ParseProperty<string?>.GetValue("password", jObj);

            if (hashedPassword == null || IsSHA256(hashedPassword))
            {
                var user = new UserDTO()
                {
                    Username = ParseProperty<string?>.GetValue("username", jObj, ErrorManager.Subscription),
                    Name = ParseProperty<string?>.GetValue("name", jObj),
                    Lastname = ParseProperty<string?>.GetValue("lastname", jObj),
                    IsActive = ParseProperty<bool?>.GetValue("isActive", jObj),
                    Group = new AssetDTO()
                    {
                        Code = ParseProperty<string?>.GetValue("group", jObj, ErrorManager.Subscription)
                    },
                    AuditUser = GetUserIdentity()
                };

                var oUser = user.Convert();
                oUser.Password = hashedPassword;

                result = DAL.SetUser(oUser);
                if (result != null)
                    result.Data = new UserDTO((User?)result.Data);

            }
            else
            {
                ErrorManager?.Subscription?.Invoke(new Exception("Password is not hashed (SHA256)"), "No hashed password!");
            }

            return result;
        }

        private Result? InsertUserContact(UserContactDTO contact)
        {
            contact.AuditUser = GetUserIdentity();
            var result = DAL.SetUserContact(contact.Convert());
            if (result != null)
                result.Data = new UserContactDTO((UserContact?)result.Data);

            return result;
        }
    }
}