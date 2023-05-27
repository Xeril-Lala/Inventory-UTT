using BaseAPI.Classes;
using Engine.BO;

namespace InventoryAPI.DTOs
{
    public class UserDTO : BaseDTO<User>
    {
        public string? Username { get; set; }
        public string? Name { get; set; }
        public string? Lastname { get; set; }

        public override User Convert()
        {
            return new User() {
                Name = Name,
                Lastname = Lastname,
                Username = Username
            };
        }

        public override UserDTO Map(User obj)
        {
            return new UserDTO()
            {
                Name = obj.Name,
                Lastname = obj.Lastname,
                Username = obj.Username
            };
        }
    }
}