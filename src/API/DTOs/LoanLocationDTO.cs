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

        public LoanLocationDTO() : base()
        {
            Location = null;
            Loan = null;
        }

        public LoanLocationDTO(LoanLocation obj) : base(obj)
        {
        }

        public override LoanLocation Convert()
        {
            var model =  new LoanLocation()
            {
                Loan = Loan?.Convert(),
                Location = Location?.Convert(),
                Description = Description
            };

            ConvertBaseBO(model, this);

            return model;
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