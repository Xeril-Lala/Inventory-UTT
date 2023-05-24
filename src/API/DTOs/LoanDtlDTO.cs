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

        public override LoanDtl Convert()
        {
            return new LoanDtl() {
                Id = Id,
                Item = Item.Convert(),
                Description = Description,
                DetailStatus = DetailStatus,
                Loan = Loan.Convert()
            };
        }

        public override LoanDtlDTO Map(LoanDtl obj)
        {
            return new LoanDtlDTO() {
                Id = obj.Id,
                Item = new ItemDTO().Map(obj.Item),
                Description = obj.Description,
                DetailStatus = obj.DetailStatus,
                Loan = new LoanDTO().Map(obj.Loan)
            };
        }
    }
}