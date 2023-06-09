using Engine.BO;
using System.Diagnostics.CodeAnalysis;

namespace BaseAPI.Classes
{
    public abstract class BaseDTO<T>
    {
        public string? User { get; set; }
        public DateTime? LastModified { get; set; }
        public abstract BaseDTO<T> Map(T obj);
        public abstract T Convert();

        public static List<TDto> MapList<TDto, TObj>(List<TObj> list) where TDto : BaseDTO<TObj>, new()
        {
            List<TDto> mappedList = new ();

            foreach (var item in list)
            {
                var dto = new TDto();
                dto.Map(item);
                mappedList.Add(dto);
            }

            return mappedList;
        }

        public List<TObj> ConvertList<TDto, TObj>(List<TDto> list) where TDto : BaseDTO<TObj>, new()
        {
            List<TObj> convertedList = new ();

            foreach (var item in list)
                convertedList.Add(item.Convert());

            return convertedList;
        }

        public static void MapBaseBO<InType>(BaseBO bo, InType dto ) where InType : BaseDTO<BaseBO>
        {
            dto.User = bo.TxnUser;
            dto.LastModified = DateComparison(bo.CreatedOn, bo.UpdatedOn ?? bo.CreatedOn);
        }

        public static DateTime? DateComparison(DateTime? dt1, DateTime? dt2) => dt1 >= dt2
            ? dt1 
            : dt2;
    }
}