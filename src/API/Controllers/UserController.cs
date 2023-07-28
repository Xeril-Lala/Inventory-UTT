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
using ClosedXML.Excel;

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

        [HttpPost("Excel")]
        public Result SetUserCatalogExcel(List<IFormFile> files)
        => RequestResponse(() => {
            long size = files.Sum(f => f.Length);

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    using var stream = new MemoryStream();
                    formFile.CopyTo(stream);

                    var wb = new XLWorkbook(stream);
                    ExcelUserProcessor(wb);
                }
            }

            return new
            {
                fileCount = files.Count,
                size,
            };
        });

        [HttpGet]
        public Result GetUsers(string? username = null, string? search = null, string? group = null, bool? isActive = null ) 
        => RequestResponse(() =>
        {
            var model = DAL.GetUsers(username, search, group, isActive);

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

        #region Excel Methods
        private void ExcelUserProcessor(XLWorkbook wb)
        {
            if (wb.Worksheets.Count > 0)
            {
                var ws = wb.Worksheet(1);
                var lastRow = ws.LastRowUsed();

                int maxRow = lastRow.RowNumber();

                for (int rowPos = 2; rowPos <= maxRow; rowPos++)
                {
                    var row = ws.Row(rowPos);

                    try
                    {
                        row.Cell(1).TryGetValue(out string? username);
                        row.Cell(2).TryGetValue(out string? name);
                        row.Cell(3).TryGetValue(out string? lastname);
                        row.Cell(4).TryGetValue(out string? enrollment);
                        row.Cell(5).TryGetValue(out string? email);

                        if (username != null)
                        {
                            var resultUser = DAL.SetUser(new User()
                            {
                                Username = username,
                                Name = name,
                                Lastname = lastname,
                                Group = new Asset()
                                {
                                    Code = "STU"
                                },
                                Password = "NO_PASSWORD",
                                TxnUser = GetUserIdentity()
                            });

                            if(resultUser?.Status == C.OK)
                            {
                                var oUser = resultUser?.Data as User;

                                var resultContact = DAL.SetUserContact(new UserContact()
                                {
                                    User = oUser,
                                    ID = enrollment,
                                    Email = email,
                                    TxnUser = GetUserIdentity()
                                });

                            } else throw new Exception($"Can't insert username {username}");
                        }
                        else throw new Exception("Username is null");

                    }
                    catch (Exception ex)
                    {
                        //var cell = row.LastCellUsed();
                        //row.Cell(cell.Address.ColumnNumber + 1).Value = ex.Message;
                        //Console.WriteLine(ex.Message);

                        ErrorManager?.Subscription?.Invoke(ex, ex.Message);
                    }
                }
            }
        }
        #endregion
    }
}