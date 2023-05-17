using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Engine.BO
{
    public class LoanLocation : BaseBO
    {
        public Loan? Loan { get; set; }
        public Asset? Location { get; set; }
        public string? Description {get; set; }
    }
}
