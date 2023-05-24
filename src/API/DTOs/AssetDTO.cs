using BaseAPI.Classes;
using Engine.BO;

namespace InventoryAPI.DTOs
{
    public class AssetDTO : BaseDTO<Asset>
    {
        public string? Code { get; set; }
        public string? Value { get; set; }
        public string? Group { get; set; }
        public string? SubGroup { get; set; }
        public string? AlternativeGroup { get; set; }
        public List<string>? Description { get; set; }
        public string? MediaLink { get; set; }

        public override Asset Convert()
        {
            string? desc1 = null, desc2 = null, desc3 = null;

            return new()
            {
                Code = Code,
                Value = Value,
                Key1 = Group, 
                Key2 = SubGroup, 
                Key3 = AlternativeGroup,
                Desc1 = desc1,
                Desc2 = desc2,
                Desc3 = desc3,

            };
        }

        public override AssetDTO Map(Asset obj)
        {
            // TODO: Add description asignation
            List<string> description = new ();

            return new AssetDTO()
            {
                Code = obj.Code,
                Value = obj.Value,
                Description = description,
                Group = obj.Key1,
                SubGroup = obj.Key2,
                AlternativeGroup = obj.Key3,
                // TODO: Add the proper link configuration
                MediaLink = string.Empty,
            };
        }
    }
}