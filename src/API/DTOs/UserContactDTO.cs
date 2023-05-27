using BaseAPI.Classes;
using Engine.BO;
using Engine.BO.Classes;

namespace InventoryAPI.DTOs
{
    public class UserContactDTO : BaseDTO<UserContact>
    {
        public UserDTO? User { get; set; }
        public string? Id { get; set; }
        public string? Enrollment { get; set; }
        public string? Email { get; set; }
        public string? AlternativeEmail { get; set; }
        public string? Phone { get; set; }
        public string? AlternativePhone { get; set; }
        public string? Address { get; set; }

        public UserContactDTO()
        {
            User = new ();
        }

        public override UserContact Convert()
        {
            return new UserContact() {
                User = User?.Convert(),
                ID = Id,
                AlternativeID = Enrollment,
                Email = Email,
                Email2 = AlternativeEmail,
                Phone = Phone,
                Phone2 = AlternativePhone,
                Address = Address,
            };
        }

        public override UserContactDTO Map(UserContact obj)
        {
            var userDto = obj.User != null
                ? new UserDTO().Map(obj.User)
                : new UserDTO();

            return new UserContactDTO() {
                User = userDto,
                Id = obj.ID,
                Enrollment = obj.AlternativeID,
                Email = obj.Email,
                AlternativeEmail = obj.Email2,
                Phone = obj.Phone,
                AlternativePhone = obj.Phone2,
                Address = obj.Address
            };
        }
    }
}