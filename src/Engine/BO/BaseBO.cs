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
        public BaseBO() => Type = GetType();
    }
}
