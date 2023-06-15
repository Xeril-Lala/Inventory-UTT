using BaseAPI.Classes;
using Engine.BO;

namespace InventoryAPI.DTOs
{
    public class LoanModeDTO : BaseDTO<LoanMode>
    {
        public string? Code { get; set; }
        public string? Unit { get; set; }
        public double Duration { get; set; }

        public LoanModeDTO() : base()
        {
        }

        public LoanModeDTO(LoanMode obj) : base(obj) 
        {
        }

        public override LoanMode Convert()
        {
            var model = new LoanMode()
            {
                Code = Code,
                Unit = Unit,
                Duration = Duration,
            };

            ConvertBaseBO(model, this);

            return model;
        }

        public override void Map(LoanMode obj)
        {
            Code = obj.Code;
            Unit = obj.Unit;
            Duration = obj.Duration;

            MapBaseBO(this, obj);
        }
    }
}