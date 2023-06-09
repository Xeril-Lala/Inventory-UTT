using Engine.BO;

namespace BaseAPI.Classes
{
    public abstract class BaseDTO <T>
    {
        public string? User { get; set; }
        public DateTime? LastModified { get; set; }
        public abstract BaseDTO<T> Map(T obj);
        public abstract T Convert();

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