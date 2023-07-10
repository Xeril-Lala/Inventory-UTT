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