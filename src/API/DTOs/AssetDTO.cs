using BaseAPI.Classes;
using Engine.BO;

namespace InventoryAPI.DTOs
{
    public class AssetDTO : BaseDTO<Asset>
    {
        private Asset Base { get; set; }

        public override Asset Convert()
        {
            throw new NotImplementedException();
        }

        public override BaseDTO<Asset> Map(Asset obj)
        {
            throw new NotImplementedException();
        }
    }
}
