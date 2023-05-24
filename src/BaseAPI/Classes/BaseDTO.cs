using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseAPI.Classes
{
    public abstract class BaseDTO <T>
    {
        //public BaseDTO(T entity)
        //{
        //    var obj = Map(entity);
        //    this = obj;
        //}

        public abstract BaseDTO<T> Map(T obj);
        public abstract T Convert();
    }
}
