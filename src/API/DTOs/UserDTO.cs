using BaseAPI.Classes;
using Engine.BO;

namespace InventoryAPI.DTOs
{
    public class UserDTO : BaseDTO<User>
    {
        public string? Username { get; set; }
        public string? Name { get; set; }
        public string? Lastname { get; set; }
        public AssetDTO? Group { get; set; }

        public override User Convert()
        {
            return new User() {
                Name = Name,
                Lastname = Lastname,
                Username = Username,
                Group = Group?.Convert()
            };
        }

        public override void Map(User obj)
        {
            var assetDto = new AssetDTO();

            if (obj.Group != null)
                assetDto.Map(obj.Group);

            Name = obj.Name;
            Lastname = obj.Lastname;
            Username = obj.Username;
            Group = assetDto;

            MapBaseBO(this, obj);
        }
    }
}