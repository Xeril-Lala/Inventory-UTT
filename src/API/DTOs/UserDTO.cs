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

        public UserDTO() : base()
        {
            Group = null;
        }

        public UserDTO(User? obj) : base(obj) 
        {
        }

        public override User Convert()
        {
            var model =  new User()
            {
                Name = Name,
                Lastname = Lastname,
                Username = Username,
                Group = Group?.Convert(),
            };

            ConvertBaseBO(model, this);

            return model;
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