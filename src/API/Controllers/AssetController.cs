using Microsoft.AspNetCore.Mvc;
using BaseAPI.Classes;
using Engine.BO;
using InventoryAPI.DTOs;
using Engine.Constants;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AssetController : CustomController
    {
        [HttpPost]
        public Result SetAsset([FromBody] AssetDTO dto) 
        => RequestBlock(result => 
        {
            dto.AuditUser = GetUserIdentity();
            result = DAL.SetAsset(dto.Convert());

            if (result != null)
                result.Data = new AssetDTO((Asset?)result.Data);

            return result;
        });

        [HttpGet("{code}")]
        public Result GetAsset(string code) => RequestResponse(() =>
        {
            var list = DAL.GetAllAssets(code: code);
            return new AssetDTO(list.FirstOrDefault());
        });

        [HttpGet]
        public Result GetAll([FromBody] JsonElement obj) => RequestResponse(() =>
        {
            JsonObject? jObj = JsonObject.Create(obj);

            var list = DAL.GetAllAssets(
                code: ParseProperty<string?>.GetValue("code", jObj),
                group: ParseProperty<string?>.GetValue("group", jObj),
                subGroup: ParseProperty<string?>.GetValue("subGroup", jObj),
                altGroup: ParseProperty<string?>.GetValue("altGroup", jObj),
                desc: ParseProperty<string?>.GetValue("desc", jObj),
                status: ParseProperty<bool?>.GetValue("isActive", jObj)
            );

            return AssetDTO.MapList<AssetDTO>(list);
        });

        [HttpGet("group")]
        public Result GetAllGroup([FromBody] JsonElement obj) => RequestResponse(() =>
        {
            JsonObject? jObj = JsonObject.Create(obj);

            var list = DAL.GetAssets(
                childCode: ParseProperty<string?>.GetValue("childCode", jObj),
                parentGroup: ParseProperty<string?>.GetValue("parentGroup", jObj),
                parentSubGroup: ParseProperty<string?>.GetValue("parentSubGroup", jObj),
                parentAltGroup: ParseProperty<string?>.GetValue("parentAltGroup", jObj),
                childGroup: ParseProperty<string?>.GetValue("childGroup", jObj),
                childAltGroup: ParseProperty<string?>.GetValue("childAltGroup", jObj),
                status: ParseProperty<bool?>.GetValue("isActive", jObj)
            );

            return AssetDTO.MapList<AssetDTO>(list);
        });
    }
}