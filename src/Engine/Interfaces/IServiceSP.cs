using Engine.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Engine.Interfaces
{
    public interface IServiceSP <Input, Output>
    {        
        Input? EntryData { get; set; }
        Output? GetOutput();
    }

    public interface IEntrySP
    {
        void Subscription(BaseDAL dal);
        void Run();
    }
}