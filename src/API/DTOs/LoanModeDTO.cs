using BaseAPI.Classes;
using Engine.BO;

namespace InventoryAPI.DTOs
{
    public class LoanModeDTO : BaseDTO<LoanMode>
    {
        public string? Code { get; set; }
        public string? Unit { get; set; }
        public double Duration { get; set; }

        public override LoanMode Convert()
        {
            return new LoanMode()
            {
                Code = Code,
                Unit = Unit,
                Duration = Duration
            };
        }

        public override LoanModeDTO Map(LoanMode obj)
        {
            return new LoanModeDTO() { 
                Code = obj.Code,
                Unit = obj.Unit,
                Duration = obj.Duration,
            };
        }
    }
}