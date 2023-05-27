using BaseAPI.Classes;
using Engine.BO;
using System.Security.Cryptography.X509Certificates;

namespace InventoryAPI.DTOs
{
    public class LoanDTO : BaseDTO<Loan>
    {
        public int? Id { get; set; }
        public string? Comments { get; set; }
        public DateTime LoanedOn { get; set; }
        public DateTime? ReturnedOn { get; set; }
        public LoanModeDTO? Mode { get; set; }
        public string? LoanStatus { get; set; }
        public List<LoanDtlDTO> Items { get; set; }

        public LoanDTO()
        {
            Mode = new();
            Items = new ();
        }

        private List<LoanDtl> GetDtls()
        {
            List<LoanDtl> dtls = new ();

            foreach(var item in Items)
                dtls.Add(item.Convert());

            return dtls;
        }

        public override Loan Convert()
        {
            return new Loan() {
                Id = Id,
                Comments = Comments,
                LoanDt = LoanedOn,
                ReturnDt = ReturnedOn,
                Mode = Mode?.Convert(),
                LoanStatus = LoanStatus,
                Items = GetDtls()
            };
        }

        public override LoanDTO Map(Loan obj)
        {
            var loanModeDto = obj.Mode != null
                ? new LoanModeDTO().Map(obj.Mode)
                : new LoanModeDTO();

            return new LoanDTO
            {
                Id = obj.Id,
                Comments = obj.Comments,
                LoanedOn = obj.LoanDt,
                ReturnedOn = obj.ReturnDt,
                Mode = loanModeDto,
                LoanStatus = obj.LoanStatus,
                Items = GetDtos(obj.Items)
            };
        }

        static private List<LoanDtlDTO> GetDtos(List<LoanDtl> dtls)
        {
            List<LoanDtlDTO> dtos = new();

            foreach (var dtl in dtls)
                dtos.Add(new LoanDtlDTO().Map(dtl));

            return dtos;
        }
    }
}