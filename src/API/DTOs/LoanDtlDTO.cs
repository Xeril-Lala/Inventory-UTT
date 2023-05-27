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

        public override LoanDtlDTO Map(LoanDtl obj)
        {
            var itemDto = obj.Item != null
                ? new ItemDTO().Map(obj.Item)
                : new ItemDTO();

            var loanDto = obj.Loan != null
                ? new LoanDTO().Map(obj.Loan)
                : new LoanDTO();

            return new LoanDtlDTO() {
                Id = obj.Id,
                Item = itemDto,
                Description = obj.Description,
                DetailStatus = obj.DetailStatus,
                Loan = loanDto
            };
        }
    }
}