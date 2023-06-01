using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BaseAPI.Classes;
using Engine.BO;
using InventoryAPI.DTOs;
using Engine.Constants;
using Microsoft.AspNetCore.Authorization;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AssetController : CustomController
    {
        [HttpPost]
        public Result SetAsset([FromBody] AssetDTO dto) => RequestResponse(() => {
            var asset = dto.Convert();

            DAL.SetAsset(asset);

            return C.OK;
        });
    }
}