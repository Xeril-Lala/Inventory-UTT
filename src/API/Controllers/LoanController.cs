using BaseAPI.Classes;
using Engine.BO;
using InventoryAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Nodes;
using Engine.Constants;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LoanController : CustomController
    {
        [HttpGet]
        public Result GetLoans(
            int? id = null,
            DateTime? fromDt = null,
            DateTime? toDt = null,
            string? comments = null,
            string? mode = null,
            bool? isActive = null
        ) => RequestResponse(() =>
        {
            var list = DAL.GetLoans(
                id: id,
                fromDt: fromDt,
                toDt: toDt,
                comments: comments,
                mode: mode,
                status: isActive
            );

            if(list != null)
            {
                for (int i = 0; i < list.Count; i++)
                {
                    var loan = list[i];
                    loan = PopulateLoan(loan);
                }
            }

            return LoanDTO.MapList<LoanDTO>(list);
        });

        [HttpGet("{id}")]
        public Result GetLoan(int id) => RequestResponse(() =>
        {
            var loan = DAL
            .GetLoans(id: id)?
            .FirstOrDefault();

            loan = PopulateLoan(loan);

            return new LoanDTO(loan);
        });

        [HttpGet("detail")]
        public Result GetDetail(
            int? id = null,
            DateTime? fromDt = null,
            DateTime? toDt = null,
            int? loanId = null,
            string? dtlDescription = null,
            string? dtlStatus = null,
            string? comments = null,
            string? loanMode = null,
            string? loanStatus = null,
            int? inventoryId = null,
            string? customId = null,
            string? serial = null,
            string? model = null,
            string? brand = null,
            bool? isActive = null
        ) => RequestResponse(() => 
        {
            var list = DAL.GetLoanDtls(
                id: id,
                fromDt: fromDt,
                toDt: toDt,
                loanId: loanId,
                dtlDescription: dtlDescription,
                dtlStatus: dtlStatus,
                comments: comments,
                loanMode: loanMode,
                loanStatus: loanStatus,
                inventoryId: inventoryId,
                customId: customId,
                serial: serial,
                model: model,
                brand: brand,
                status: isActive
            );

            return LoanDtlDTO.MapList<LoanDtlDTO>(list);
        });

        [HttpGet("detail/{id}")]
        public Result GetDetail(int id) => RequestResponse(() =>
        {
            var list = DAL.GetLoanDtls(id: id);

            var model = list?.FirstOrDefault();

            return new LoanDtlDTO(model);
        });


        [HttpGet("mode")]
        public Result GetLoanModes() => RequestResponse(() => 
        {
            var list = DAL.GetLoanModes();
            return LoanModeDTO.MapList<LoanModeDTO>(list);
        });


        [HttpGet("mode/{code}")]
        public Result GetLoanMode(string code) => RequestResponse(() => 
        { 
            var model = DAL.GetLoanModes().Find(x => x.Code == code);
            return new LoanModeDTO(model);
        });

        [HttpPost]
        public Result SetLoan([FromBody] LoanDTO loan)
        => RequestBlock(result =>
        {
            LoanDTO? insertedLoan = null;

            loan.AuditUser = GetUserIdentity();
            result = DAL.SetLoan(loan.Convert());
            insertedLoan = new LoanDTO((Loan?)result?.Data);

            if (insertedLoan != null)
            {
                if (loan.Items != null)
                {
                    foreach (var item in loan.Items)
                    {
                        item.Loan = insertedLoan;
                        var itemResult = InsertDetail(item);

                        if (itemResult?.Status == null || itemResult?.Status != C.OK)
                        {
                            ErrorManager?.Subscription?.Invoke(
                                new Exception("Can't insert Loan Detail"),
                                $"Loan Detail could not be created: {item?.Id} | Inventory ID: {item?.Item?.Id}"
                            );
                        }
                        else
                        {
                            var dtl = (LoanDtlDTO?)itemResult?.Data;

                            if (dtl != null)
                                insertedLoan.Items?.Add(dtl);
                        }
                    }
                }
            }

            if (result != null)
                result.Data = insertedLoan;

            return result;
        });

        [HttpPost("detail")]
        public Result SetLoanDtl([FromBody] LoanDtlDTO dtl) => RequestBlock(result =>
            result = InsertDetail(dtl)
        );

        private Result? InsertDetail(LoanDtlDTO detail)
        {
            Result? result = null;

            try
            {
                detail.AuditUser = GetUserIdentity();
                result = DAL.SetLoanDtl(detail.Convert());

                if (result != null)
                    result.Data = new LoanDtlDTO((LoanDtl?)result?.Data);

            } 
            catch (Exception ex)
            {
                ErrorManager?.Subscription?.Invoke(ex, "Fatal Error Inserting Loan Detail!");
            }

            return result;
        }

        private Loan? PopulateLoan(Loan? loan)
        {
            if(loan != null && loan?.Id != null) 
            {
                var items = DAL.GetLoanDtls(loanId: loan?.Id);

                if(loan != null &&  items != null)
                {
                    foreach (var item in items)
                        item.Loan = null;

                    loan.Items = items;
                }
            }

            return loan;
        }
    }
}