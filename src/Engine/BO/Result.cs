using System.Text.Json.Serialization;

namespace Engine.BO {
    public class Result 
    {
        public string Status {get; set;}

        public string Message { get; set;}

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public object? Data { get; set;} = null;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public object? Data2 { get; set;} = null;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public object? Data3 { get; set; } = null;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public object? Data4 { get; set; } = null;

        public Result() {
            Status = string.Empty;
            Message = string.Empty;
        }
    }
}