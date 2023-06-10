namespace BaseAPI
{
    public interface IControllerActions
    {
        IEnumerable<TResult> GetAll<TResult>();
        TResult Get<TResult>();
        void Set(object? data);
    }
}
