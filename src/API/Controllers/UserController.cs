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

            string? hashedPassword = ParseProperty<string?>.GetValue("password", jObj);

            if (IsSHA256(hashedPassword)) 
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

            } else
            {
                ErrorManager?.Subscription?.Invoke(new Exception("Password is not hashed (SHA256)"), "No hashed password!");
            }

            return result;
        });

        [HttpPost("contact")]
        public Result SetContact([FromBody] UserContactDTO contact)
        => RequestBlock(result =>
        {
            contact.AuditUser = GetUserIdentity();
            result = DAL.SetUserContact(contact.Convert());

            if (result != null)
                result.Data = new UserContactDTO((UserContact?)result.Data);

            return result;
        });

        [HttpGet]
        public Result GetUsers([FromBody] JsonElement obj) => RequestResponse(() =>
        {
            var jObj = JsonObject.Create(obj);

            var model = DAL.GetUsers(
                ParseProperty<string?>.GetValue("username", jObj),
                ParseProperty<string?>.GetValue("search", jObj),
                ParseProperty<bool?>.GetValue("isActive", jObj)
            );

            return UserDTO.MapList<UserDTO>(model);
        });

        [HttpGet("{username}")]
        public Result GetDBUser(string username) => RequestResponse(() =>
        {
            var model = DAL.GetUsers(username: username)?.FirstOrDefault();

            return new UserDTO(model);
        });
    }
}