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
        public string? Responsible { get; set; }
        public string? ResponsibleId { get; set; }
        public List<string>? Contact { get; set; }
        public List<LoanDtlDTO>? Items { get; set; }

        public LoanDTO() : base()
        {
            Mode = null;
            Items = null;
            Contact = null;
        }

        public LoanDTO(Loan obj) : base(obj) 
        {
        }

        private List<LoanDtl> GetDtls()
        {
            List<LoanDtl> dtls = new ();
            if(Items != null)
            {
                foreach (var item in Items)
                    dtls.Add(item.Convert());
            }

            return dtls;
        }

        public override Loan Convert()
        {
            string? contact1 = null, contact2 = null;

            if (Contact != null && Contact.Count() > 0)
            {
                contact1 = Contact.ElementAtOrDefault(0);
                contact2 = Contact.ElementAtOrDefault(1);
            }

            var model =  new Loan()
            {
                Id = Id,
                Comments = Comments,
                LoanDt = LoanedOn,
                ReturnDt = ReturnedOn,
                Mode = Mode?.Convert(),
                LoanStatus = LoanStatus,
                Responsible = Responsible,
                ResponsibleId = ResponsibleId,
                ResponsibleContact = contact1,
                ResponsibleContact2 = contact2,
                Items = GetDtls()
            };

            ConvertBaseBO(model, this);

            return model;
        }

        public override void Map(Loan obj)
        {
            var loanModeDto = new LoanModeDTO();

            if (obj.Mode != null)
                loanModeDto.Map(obj.Mode);

            Contact = new List<string>();

            Id = obj.Id;
            Comments = obj.Comments;
            LoanedOn = obj.LoanDt;
            ReturnedOn = obj.ReturnDt;
            Mode = loanModeDto;
            LoanStatus = obj.LoanStatus;
            Items = GetDtos(obj.Items);
            Responsible = obj.Responsible;
            ResponsibleId = obj.ResponsibleId;

            if (obj.ResponsibleContact != null)
                Contact.Add(obj.ResponsibleContact);

            if (obj.ResponsibleContact2 != null)
                Contact.Add(obj.ResponsibleContact2);

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