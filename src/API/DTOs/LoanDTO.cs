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

        public override void Map(Loan obj)
        {
            var loanModeDto = new LoanModeDTO();

            if (obj.Mode != null)
                loanModeDto.Map(obj.Mode);

            Id = obj.Id;
            Comments = obj.Comments;
            LoanedOn = obj.LoanDt;
            ReturnedOn = obj.ReturnDt;
            Mode = loanModeDto;
            LoanStatus = obj.LoanStatus;
            Items = GetDtos(obj.Items);

            MapBaseBO(this, obj);
        }

        static private List<LoanDtlDTO> GetDtos(List<LoanDtl> dtls)
        {
            List<LoanDtlDTO> dtos = new();

            foreach (var dtl in dtls)
            {
                var dto = new LoanDtlDTO();

                dto.Map(dtl);
                dtos.Add(dto);
            }

            return dtos;
        }
    }
}