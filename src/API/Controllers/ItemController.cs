using Microsoft.AspNetCore.Mvc;
using BaseAPI.Classes;
using Engine.BO;
using InventoryAPI.DTOs;
using Engine.Constants;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;
using System.Text.Json.Nodes;
using ClosedXML;
using ClosedXML.Excel;
using System.Net;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ItemController : CustomController
    {
        [HttpPost]
        public Result SetItem([FromBody] ItemDTO itemDTO)
        => RequestBlock(result =>
        {
            itemDTO.AuditUser = GetUserIdentity();

            result = DAL.SetItem(itemDTO.Convert());

            if(result != null)
                result.Data = new ItemDTO((Item?)result?.Data);

            return result;
        });

        [HttpPost("Excel")]
        public Result SetItem(List<IFormFile> files) => RequestResponse(() =>
        {
            long size = files.Sum(f => f.Length);

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    using var stream = new MemoryStream();
                    formFile.CopyTo(stream);

                    var wb = new XLWorkbook(stream);
                    ExcelItemProcessor(wb);
                }
            }

            return new {
                fileCount = files.Count,
                size,
            };
        });

        [HttpGet]
        public Result GetItems([FromBody] JsonElement obj) => RequestResponse(() => 
        {
            var jObj = JsonObject.Create(obj);

            var model = DAL.GetItems(
                id: ParseProperty<int?>.GetValue("id", jObj),
                customId: ParseProperty<string?>.GetValue("customId", jObj),
                serial: ParseProperty<string?>.GetValue("serial", jObj),
                name: ParseProperty<string?>.GetValue("name", jObj),
                model: ParseProperty<string?>.GetValue("model", jObj),
                fromDt: ParseProperty<DateTime?>.GetValue("fromDt", jObj),
                toDt: ParseProperty<DateTime?>.GetValue("toDt", jObj),
                status: ParseProperty<bool?>.GetValue("isActive", jObj)
            );

            return ItemDTO.MapList<ItemDTO>(model);
        });

        [HttpGet("{id}")]
        public Result GetItem(int id) => RequestResponse(() =>
        { 
            return new ItemDTO(DAL.GetItems(id)?.FirstOrDefault());
        });


        private void ExcelItemProcessor(XLWorkbook wb)
        {
            foreach(var ws in wb.Worksheets)
            {
                var row = ws.LastRowUsed();

                Console.WriteLine(row.FirstCell().Value);
            }
        }

    }
}