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

        public override UserDTO Map(User obj)
        {
            var assetDto = obj.Group != null
                            ? new AssetDTO().Map(obj.Group)
                            : new AssetDTO();

            return new UserDTO()
            {
                Name = obj.Name,
                Lastname = obj.Lastname,
                Username = obj.Username,
                Group = assetDto
            };
        }
    }
}