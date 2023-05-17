using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Engine.BO
{
    public class Loan
    {
        public int Id { get; set; }
        public string? Comments { get; set; }
        public DateTime LoanDt { get; set; }
        public DateTime ReturnDt { get; set; }
        public LoanMode? Mode { get; set; }
        public string? Status { get; set; }
    }
}