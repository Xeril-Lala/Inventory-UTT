using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Engine.BO
{
    public class BaseBO
    {
        protected Type Type { get; set; }
        public Status Status { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string? TxnUser { get; set; }

        public BaseBO()
        {
            Type = GetType();
            CreatedOn = DateTime.Now;
            CreatedBy = string.Empty;
        }

        public bool IsEnabled => Status == Status.ENABLED;
    }
}
