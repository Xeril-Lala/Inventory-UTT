using BaseAPI.Classes;
using Engine.BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryAPI.DTOs 
{
    public class LoanLocationDTO : BaseDTO<LoanLocation>
    {
        public LoanDTO? Loan { get; set; }
        public AssetDTO? Location { get; set; }
        public string? Description { get; set; }

        public override LoanLocation Convert()
        {
            return new LoanLocation() {
                Loan = Loan.Convert(),
                Location = Location.Convert(),
                Description = Description
            };
        }

        public override LoanLocationDTO Map(LoanLocation obj)
        {
            return new LoanLocationDTO()
            {
                Description = obj.Description,
                Location = new AssetDTO().Map(obj.Location),
                Loan = new LoanDTO().Map(obj.Loan),
            };
        }
    }
}