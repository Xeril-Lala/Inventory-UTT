using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using D = Engine.BL.Delegates;

namespace Engine.Services
{
    public class ExceptionManager
    {
        private decimal KeyTime { get; }
        public D.CallbackExceptionMsg? Subscription { get; }

        public ExceptionManager(D.CallbackExceptionMsg? subCallback)
        {
            Subscription = subCallback;
            KeyTime = decimal.Parse(DateTime.Now.ToString("MMddyyyyHHmmss"));
        }
    }
}