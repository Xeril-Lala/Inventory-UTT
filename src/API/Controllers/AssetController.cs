using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BaseAPI.Classes;
using Engine.BO;
using InventoryAPI.DTOs;
using Engine.Constants;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize()]
    public class AssetController : CustomController
    {
        [HttpPost]
        public Result SetAsset([FromBody] AssetDTO dto) => RequestResponse(() => 
            DAL.SetAsset(dto.Convert())
        );


        [HttpGet]
        public Result GetAsset([FromBody] JsonElement? json) => RequestResponse(() => {
            return DAL.GetAssets(status: false);
        });
    }
}