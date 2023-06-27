using Engine.BO;
using System.Diagnostics.CodeAnalysis;

namespace BaseAPI.Classes
{
    public abstract class BaseDTO<T>
    {
        public string? AuditUser { get; set; }
        public DateTime? LastModified { get; set; }
        public bool? IsActive { get; set; }
        public abstract void Map(T obj);
        public abstract T Convert();

        public BaseDTO(T? obj)
        {
            if(obj != null)
                Map(obj);
        }

        public BaseDTO() => LastModified = null;
        

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

        public static List<TResult> ConvertList<TDto, TResult>(List<TDto>? list) where TDto : BaseDTO<TResult>, new()
        {
            List<TResult> convertedList = new ();

            if (list != null)
            {
                foreach (var item in list)
                    convertedList.Add(item.Convert());
            }

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
            dto.AuditUser =  !string.IsNullOrEmpty(bo.TxnUser) ? bo.TxnUser
                      : !string.IsNullOrEmpty(bo.UpdatedBy) ? bo.UpdatedBy
                      : !string.IsNullOrEmpty(bo.CreatedBy) ? bo.CreatedBy
                      : null;

            dto.LastModified = DateComparison(bo.CreatedOn, bo.UpdatedOn ?? bo.CreatedOn);
            dto.IsActive = bo.IsEnabled;
        }

        public static void ConvertBaseBO(BaseBO bo, BaseDTO<T> dto)
        {
            bo.Status = GetStatus(dto);
            bo.TxnUser = dto.AuditUser;
            bo.UpdatedOn = dto.LastModified;
        }

        public static DateTime? DateComparison(DateTime? dt1, DateTime? dt2) => dt1 >= dt2
            ? dt1 
            : dt2;

        public static Status GetStatus(BaseDTO<T> dto)
        {
            var stat = dto.IsActive;

            if (stat != null && stat.Value)
            {
                return Status.ENABLED;
            } 
            else if (stat != null && !stat.Value)
            {
                return Status.DISABLED;
            }
            else
            {
                return Status.ENABLED;
            }
        }
    }
}