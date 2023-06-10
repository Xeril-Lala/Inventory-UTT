using Engine.BO;
using System.Diagnostics.CodeAnalysis;

namespace BaseAPI.Classes
{
    public abstract class BaseDTO<T>
    {
        public string? User { get; set; }
        public DateTime? LastModified { get; set; }
        public bool? IsActive { get; set; }
        public abstract void Map(T obj);
        public abstract T Convert();

        public static List<TDto> MapList<TDto>(List<T>? list) where TDto : BaseDTO<T>, new()
        {
            List<TDto> mappedList = new ();

            if(list != null)
            {
                foreach (var item in list)
                {
                    var dto = new TDto();
                    dto.Map(item);
                    mappedList.Add(dto);
                }
            }

            return mappedList;
        }

        public List<T> ConvertList<TDto>(List<TDto> list) where TDto : BaseDTO<T>, new()
        {
            List<T> convertedList = new ();

            foreach (var item in list)
                convertedList.Add(item.Convert());

            return convertedList;
        }

        public static TDto Map<TDto>(T obj) where TDto : BaseDTO<T>, new()
        {
            TDto dto = new ();
            dto.Map(obj);
            return dto;
        }

        public static void MapBaseBO(BaseDTO<T> dto, BaseBO bo)
        {
            dto.User = bo.TxnUser;
            dto.LastModified = DateComparison(bo.CreatedOn, bo.UpdatedOn ?? bo.CreatedOn);
            dto.IsActive = bo.IsEnabled;
        }

        public static DateTime? DateComparison(DateTime? dt1, DateTime? dt2) => dt1 >= dt2
            ? dt1 
            : dt2;
    }
}