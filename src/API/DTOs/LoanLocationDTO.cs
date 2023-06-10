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

        public override void Map(LoanLocation obj)
        {
            var assetDto = new AssetDTO();
            var loanDto = new LoanDTO();

            if (obj.Location != null)
                assetDto.Map(obj.Location);

            if (obj.Loan != null)
                loanDto.Map(obj.Loan);

            Description = obj.Description;
            Location = assetDto;
            Loan = loanDto;

            MapBaseBO(this, obj);
        }
    }
}