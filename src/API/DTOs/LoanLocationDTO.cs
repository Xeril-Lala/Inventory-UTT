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

        public LoanLocationDTO()
        {
            Location = new ();
            Loan = new ();
        }

        public override LoanLocation Convert()
        {
            return new LoanLocation() {
                Loan = Loan?.Convert(),
                Location = Location?.Convert(),
                Description = Description
            };
        }

        public override LoanLocationDTO Map(LoanLocation obj)
        {
            var assetDto = obj.Location != null
                ? new AssetDTO().Map(obj.Location)
                : new AssetDTO();

            var loanDto = obj.Loan != null
                ? new LoanDTO().Map(obj.Loan)
                : new LoanDTO();

            return new LoanLocationDTO()
            {
                Description = obj.Description,
                Location = assetDto,
                Loan = loanDto,
            };
        }
    }
}