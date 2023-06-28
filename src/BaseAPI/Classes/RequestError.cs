namespace BaseAPI.Classes
{
    public class RequestError
    {
        public string? Info { get; set; }
        public Exception? Exception { get; set; }

        public object FormatError
        {
            get
            {
                return new {
                    Info,
                    Exception?.Message,
                    Exception?.Source
                };
            }
        }

        public static List<object> FormatErrors(List<RequestError> errors)
        {
            var parsedErrors = new List<object>();

            if (errors != null && errors.Count > 0)
            {
                foreach (var err in errors)
                {
                    parsedErrors.Add(err.FormatError);
                }
            }

            return parsedErrors;
        }
    }
}
