using Microsoft.AspNetCore.Mvc;
using BaseAPI.Classes;
using Engine.BO;
using InventoryAPI.DTOs;
using Engine.Constants;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;
using System.Text.Json.Nodes;
using DocumentFormat.OpenXml.Office2021.Excel.RichDataWebImage;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AssetController : CustomController
    {
        private readonly IConfiguration _configuration;
        public AssetController(IConfiguration conf) => _configuration = conf;

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
        public Result GetAll(
            string? code = null,
            string? group = null,
            string? subGroup = null,
            string? altGroup = null,
            string? desc = null,
            bool? isActive = null
        ) => RequestResponse(() =>
        {

            var list = DAL.GetAllAssets(
                code: code,
                group: group,
                subGroup: subGroup,
                altGroup: altGroup,
                desc: desc,
                status: isActive
            );

            return AssetDTO.MapList<AssetDTO>(list);
        });

        [HttpGet("image/{code}")]
        public IActionResult GetImage(string code)
        {
            string basePath = AppDomain.CurrentDomain.BaseDirectory;
            string noImage = $"{basePath}{_configuration["dir:noImage"]}";

            try
            {
                var model = DAL.GetAllAssets(code: code).First();
                if (model?.Data != null && model?.Data?.Length > 0)
                {
                    return File(model.Data, "image/jpeg");
                }
                else return PhysicalFile(noImage, "image/jpeg");
            } catch {
                return PhysicalFile(noImage, "image/jpeg");
            }
        }

        [HttpPost("image")]
        public Result SetImage([FromBody] JsonElement obj)
       => RequestResponse(() =>
       {
           var jObj = JsonObject.Create(obj);

           string? assetCode = ParseProperty<string?>.GetValue("code", jObj, ErrorManager.Subscription);
           string? b64 = ParseProperty<string?>.GetValue("b64", jObj, ErrorManager.Subscription);
           string? imageName = ParseProperty<string?>.GetValue("image", jObj, ErrorManager.Subscription);

           var asset = DAL.GetAllAssets(code: assetCode).FirstOrDefault();

           if (asset != null && !string.IsNullOrEmpty(b64))
           {
               asset.Data = Convert.FromBase64String(b64);
               asset.Value = imageName;
               asset.Key1 = C.IMAGE;
               DAL.SetAsset(asset);
               return C.OK;
           }
           else if(!string.IsNullOrEmpty(b64))
           {
               var inserted = DAL.SetAsset(new Asset() {
                   Code = assetCode,
                   Value = imageName,
                   Key1 = C.IMAGE,
                   Data = Convert.FromBase64String(b64),
               });

               return C.OK;
           }

           return C.ERROR;
       });

        [HttpGet("group")]
        public Result GetAllGroup(
            string? childCode = null,
            string? parentGroup = null,
            string? parentSubGroup = null,
            string? parentAltGroup = null,
            string? childGroup = null,
            string? childAltGroup = null,
            bool? isActive = null
        ) => RequestResponse(() =>
        {

            var list = DAL.GetAssets(
                childCode: childCode,
                parentGroup: parentGroup,
                parentSubGroup: parentSubGroup,
                parentAltGroup: parentAltGroup,
                childGroup: childGroup,
                childAltGroup: childAltGroup,
                status: isActive
            );

            return AssetDTO.MapList<AssetDTO>(list);
        });
    }
}