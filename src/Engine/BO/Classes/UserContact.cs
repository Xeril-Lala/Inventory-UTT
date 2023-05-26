using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Engine.BO.Classes
{
    public class UserContact : BaseBO
    {
        public User? User { get; set; }
        public string? ID { get; set; }
        public string? AlternativeID { get; set; }
        public string? Email { get; set; }
        public string? Email2 { get; set; }
        public string? Phone { get; set; }
        public string? Phone2 { get; set; }
        public string? Address { get; set; }
    }
}