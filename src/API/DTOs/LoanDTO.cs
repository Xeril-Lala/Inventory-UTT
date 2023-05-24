using BaseAPI.Classes;
using Engine.BO;

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

        public List<LoanDtl> GetDtls()
        {
            List<LoanDtl> dtls = new ();

            foreach(var item in Items)
                dtls.Add(item.Convert());

            return dtls;
        }

        public List<LoanDtlDTO> GetDtos(List<LoanDtl> dtls)
        {
            List<LoanDtlDTO> dtos = new();

            foreach (var dtl in dtls)
                dtos.Add(new LoanDtlDTO().Map(dtl));

            return dtos;
        }

        public override Loan Convert()
        {
            return new Loan() {
                Id = Id,
                Comments = Comments,
                LoanDt = LoanedOn,
                ReturnDt = ReturnedOn,
                Mode = Mode.Convert(),
                LoanStatus = LoanStatus,
                Items = GetDtls()
            };
        }

        public override LoanDTO Map(Loan obj)
        {
            return new LoanDTO
            {
                Id = obj.Id,
                Comments = obj.Comments,
                LoanedOn = obj.LoanDt,
                ReturnedOn = obj.ReturnDt,
                Mode = new LoanModeDTO().Map(obj.Mode),
                LoanStatus = obj.LoanStatus,
                Items = GetDtos(obj.Items)
            };
        }
    }
}