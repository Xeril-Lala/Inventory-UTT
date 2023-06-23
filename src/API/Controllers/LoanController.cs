using BaseAPI.Classes;
using Engine.BO;
using InventoryAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LoanController : CustomController
    {
        [HttpGet]
        public Result GetLoans([FromBody] JsonElement obj) => RequestResponse(() =>
        {
            var jObj = JsonObject.Create(obj);
            
            var list = DAL.GetLoans(
                id: ParseProperty<int?>.GetValue("id", jObj),
                fromDt: ParseProperty<DateTime?>.GetValue("fromDt", jObj),
                toDt: ParseProperty<DateTime?>.GetValue("toDt", jObj),
                comments: ParseProperty<string?>.GetValue("comments", jObj),
                mode: ParseProperty<string?>.GetValue("mode", jObj),
                status: ParseProperty<bool?>.GetValue("status", jObj)
            );

            return LoanDTO.MapList<LoanDTO>(list);
        });

        [HttpGet("{id}")]
        public Result GetLoan(int id) => RequestResponse(() =>
        {
            var loan = DAL
            .GetLoans(id: id)?
            .FirstOrDefault();

            return new LoanDTO(loan);
        });

        [HttpPost]
        public Result SetLoan([FromBody] LoanDTO loan)
        => RequestBlock(result =>
        {
            loan.AuditUser = GetUserIdentity();
            result = DAL.SetLoan(loan.Convert());

            if (result != null)
                result.Data = new LoanDTO((Loan?)result?.Data);

            return result;
        });
    }
}