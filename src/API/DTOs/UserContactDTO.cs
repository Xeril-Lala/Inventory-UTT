using BaseAPI.Classes;
using Engine.BO;
using Engine.BO.Classes;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace InventoryAPI.DTOs
{
    public class UserContactDTO : BaseDTO<UserContact>
    {
        [JsonPropertyName("userDetails")]
        public UserDTO? User { get; set; }
        public string? Id { get; set; }
        public string? Enrollment { get; set; }
        public string? Email { get; set; }
        public string? AlternativeEmail { get; set; }
        public string? Phone { get; set; }
        public string? AlternativePhone { get; set; }
        public string? Address { get; set; }

        public UserContactDTO() : base()
        {
            User = null;
        }

        public UserContactDTO(UserContact? obj) : base(obj)
        {
        }

        public override UserContact Convert()
        {
            var model = new UserContact()
            {
                User = User?.Convert(),
                ID = Id,
                AlternativeID = Enrollment,
                Email = Email,
                Email2 = AlternativeEmail,
                Phone = Phone,
                Phone2 = AlternativePhone,
                Address = Address
            };

            ConvertBaseBO(model, this);

            return model;
        }

        public override void Map(UserContact obj)
        {
            var userDto = new UserDTO();

            if (obj.User != null)
                userDto.Map(obj.User);
            
            User = userDto;
            Id = obj.ID;
            Enrollment = obj.AlternativeID;
            Email = obj.Email;
            AlternativeEmail = obj.Email2;
            Phone = obj.Phone;
            AlternativePhone = obj.Phone2;
            Address = obj.Address;

            MapBaseBO(this, obj);
        }
    }
}