using BaseAPI.Classes;
using Engine.BO;

namespace InventoryAPI.DTOs
{
    public class LoanDtlDTO : BaseDTO<LoanDtl>
    {
        public int? Id { get; set; }
        public ItemDTO? Item { get; set; }
        public string? Description { get; set; }
        public string? DetailStatus { get; set; }
        public LoanDTO? Loan { get; set; }

        public LoanDtlDTO()
        {
            Item = new ();
            Loan = new ();
        }

        public override LoanDtl Convert()
        {
            return new LoanDtl() {
                Id = Id,
                Item = Item?.Convert(),
                Description = Description,
                DetailStatus = DetailStatus,
                Loan = Loan?.Convert()
            };
        }

        public override void Map(LoanDtl obj)
        {
            var itemDto = new ItemDTO();
            var loanDto = new LoanDTO();

            if (obj.Item != null)
                itemDto.Map(obj.Item);

            if (obj.Loan != null)
                loanDto.Map(obj.Loan);

            Id = obj.Id;
            Item = itemDto;
            Description = obj.Description;
            DetailStatus = obj.DetailStatus;
            Loan = loanDto;

            MapBaseBO(this, obj);
        }
    }
}