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
        public DateTime Acquisition { get; set; }
        public AssetDTO? Model { get; set; }
        public string? Serial { get; set; }
        public string? ConditionUse { get; set; }

        public override Item Convert()
        {
            return new Item() {
                Id = Id,
                Name = Name,
                Acquisition = Acquisition,
                Condition = ConditionUse,
                Model = Model.Convert(),
                Serial = Serial,
                CustomId = CustomKey,
                Description = About
            };
        }

        public override ItemDTO Map(Item obj)
        {
            return new ItemDTO() {
                Id = obj.Id,
                Name = obj.Name,
                About = obj.Description,
                Acquisition = obj.Acquisition,
                ConditionUse = obj.Condition,
                CustomKey = obj.CustomId,
                Model = new AssetDTO().Map(obj.Model),
                Serial = obj.Serial
            };
        }
    }
}