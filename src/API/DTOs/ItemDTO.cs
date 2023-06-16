using BaseAPI.Classes;
using Engine.BO;

namespace InventoryAPI.DTOs
{
    public class ItemDTO : BaseDTO<Item>
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? CustomKey { get; set; }
        public string? About { get; set; }
        public DateTime? Acquisition { get; set; }
        public AssetDTO? Model { get; set; }
        public AssetDTO? Location { get; set; }
        public string? Serial { get; set; }
        public string? ConditionUse { get; set; }

        public ItemDTO() : base()
        {
            Model = null;
        }

        public ItemDTO(Item? obj) : base(obj)
        {
        }

        public override Item Convert()
        {
            var model = new Item() 
            {
                Id = Id,
                Name = Name,
                Acquisition = Acquisition ?? DateTime.Now,
                Condition = ConditionUse,
                Model = Model?.Convert(),
                Location = Location?.Convert(),
                Serial = Serial,
                CustomId = CustomKey,
                Description = About,
            };

            ConvertBaseBO(model, this);

            return model;
        }

        public override void Map(Item obj)
        {
            var assetDto = new AssetDTO();

            var locDto = new AssetDTO();

            if (obj.Model != null)
                assetDto.Map(obj.Model);

            if (obj.Location != null)
                locDto.Map(obj.Location);

            Id = obj.Id;
            Name = obj.Name;
            About = obj.Description;
            Acquisition = obj.Acquisition;
            ConditionUse = obj.Condition;
            CustomKey = obj.CustomId;
            Model = assetDto;
            Location = locDto;
            Serial = obj.Serial;

            MapBaseBO(this, obj);
        }
    }
}