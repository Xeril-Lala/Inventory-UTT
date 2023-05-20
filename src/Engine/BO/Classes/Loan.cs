using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Engine.BO
{
    public class Loan : BaseBO
    {
        public int? Id { get; set; }
        public string? Comments { get; set; }
        public DateTime LoanDt { get; set; }
        public DateTime? ReturnDt { get; set; }
        public LoanMode? Mode { get; set; }
        public string? LoanStatus { get; set; }
        public List<LoanDtl> Items { get; set; }

        public Loan()
        {
            Items = new List<LoanDtl>();
        }
    }
}