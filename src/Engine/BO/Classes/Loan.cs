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
        public string? Responsible { get; set; }
        public string? ResponsibleId { get; set; }
        public string? ResponsibleContact { get; set; }
        public string? ResponsibleContact2 { get; set; }
        public List<LoanDtl> Items { get; set; }
        public LoanLocation? Location { get; set; }

        public Loan()
        {
            Items = new List<LoanDtl>();
        }
    }
}