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
        public UserContactDTO? Contact { get; set; }

        public UserDTO() : base()
        {
            Group = null;
            Contact = null;
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
                Contact = Contact?.Convert()
            };

            ConvertBaseBO(model, this);

            return model;
        }

        public override void Map(User obj)
        {
            var assetDto = new AssetDTO();
            var contactDto = new UserContactDTO();

            if (obj.Group != null)
                assetDto.Map(obj.Group);

            if(obj.Contact != null)
            {
                obj.Contact.User = null;
                contactDto.Map(obj.Contact);
            }

            Name = obj.Name;
            Lastname = obj.Lastname;
            Username = obj.Username;
            Group = assetDto;
            Contact = contactDto;

            MapBaseBO(this, obj);
        }
    }
}