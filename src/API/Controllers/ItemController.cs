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
using U = Engine.Constants.Utils;

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

            if (result != null)
                result.Data = new ItemDTO((Item?)result?.Data);

            return result;
        });

        [HttpPost("Excel")]
        public Result SetItem(List<IFormFile> files)
        => RequestResponse(() =>
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

            return new
            {
                fileCount = files.Count,
                size,
            };
        });

        [HttpGet]
        public Result GetItems(
            int? id = null,
            string? customId = null,
            string? serial = null,
            string? name = null,
            string? model = null,
            DateTime? fromDt = null,
            DateTime? toDt = null,
            bool? isActive = null
        ) => RequestResponse(() =>
        {
            var list = DAL.GetItems(
                id: id,
                customId: customId,
                serial: serial,
                name: name,
                model: model,
                fromDt: fromDt,
                toDt: toDt,
                status: isActive
            );

            return ItemDTO.MapList<ItemDTO>(list);
        });

        [HttpGet("{id}")]
        public Result GetItem(int id) => RequestResponse(() =>
        {
            return new ItemDTO(DAL.GetItems(id)?.FirstOrDefault());
        });


        // TODO: Add Export excel Method!

        #region Excel Methods
        private void ExcelItemProcessor(XLWorkbook wb)
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
                        row.Cell(1).TryGetValue(out string? customId);
                        row.Cell(2).TryGetValue(out string? itemName);
                        row.Cell(5).TryGetValue(out string? brand);
                        row.Cell(6).TryGetValue(out string? model);
                        row.Cell(7).TryGetValue(out string? serial);
                        row.Cell(9).TryGetValue(out string? location);
                        row.Cell(12).TryGetValue(out string? use);

                        serial = string.IsNullOrEmpty(serial) ? null : serial;

                        var oModel = string.IsNullOrEmpty(model) ? null : DAL
                            .GetAllAssets(value: model)
                            .FirstOrDefault();

                        var oLocation = string.IsNullOrEmpty(location) ? null : DAL
                            .GetAllAssets(value: location)
                            .FirstOrDefault();

                        if (oModel == null && !string.IsNullOrEmpty(model))
                        {
                            var oBrand = string.IsNullOrEmpty(brand) ? null : DAL
                                .GetAllAssets(value: brand)
                                .FirstOrDefault();

                            if (oBrand == null && !string.IsNullOrEmpty(brand))
                            {
                                var brandResult = DAL.SetAsset(new Asset()
                                {
                                    Code = U.GenerateRandomCode(),
                                    Value = brand,
                                    Key1 = C.BRAND,
                                    Desc1 = brand,
                                    TxnUser = GetUserIdentity()
                                });

                                if (brandResult?.Status == C.ERROR)
                                    throw new Exception($"Cant Generate Brand from Excel! Row: {row}");

                                oBrand = (Asset?)brandResult?.Data;
                            }

                            var modelResult = DAL.SetAsset(new Asset()
                            {
                                Code = U.GenerateRandomCode(),
                                Value = model,
                                Desc1 = model,
                                Key1 = C.MODEL,
                                Key2 = oBrand?.Code,
                                TxnUser = GetUserIdentity()
                            });

                            if (modelResult?.Status == C.ERROR)
                                throw new Exception($"Cant Generate Model from Excel! Row: {row}");

                            oModel = (Asset?)modelResult?.Data;
                        }

                        if (oLocation == null && !string.IsNullOrEmpty(location))
                        {
                            var locationResult = DAL.SetAsset(new Asset()
                            {
                                Code = U.GenerateRandomCode(),
                                Value = location,
                                Desc1 = location,
                                Key1 = C.LOCATION,
                                TxnUser = GetUserIdentity()
                            });

                            if (locationResult?.Status == C.ERROR)
                                throw new Exception($"Cant Generate Location from Excel! Row: {row}");

                            oLocation = (Asset?)locationResult?.Data;
                        }

                        var oItem = DAL.GetItems(customId: customId)?.FirstOrDefault();
                        int? id = null;
                        DateTime? acquisition = DateTime.Now;


                        if (oItem != null)
                        {
                            id = oItem.Id;
                            acquisition = oItem.Acquisition;
                        }

                        var result = DAL.SetItem(new Item()
                        {
                            Id = id,
                            Acquisition = acquisition,
                            Condition = use,
                            CustomId = customId,
                            Name = itemName,
                            Description = "LOADED FROM EXCEL",
                            Location = oLocation,
                            Model = oModel,
                            Serial = serial,
                            TxnUser = GetUserIdentity()
                        });

                        if (result?.Status == C.ERROR)
                            throw new Exception($"Cant Generate Item from Excel! Row: {row}");

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