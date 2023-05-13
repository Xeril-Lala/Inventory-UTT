using System.Text.Json;

namespace Engine.Constants {
    public class C 
    {
        public const string OK = "OK";
        public const string ERROR = "ERROR";
        public const string COMPLETE = "COMPLETE";
        public const string PENDING = "PENDING";
        public const string ROLLABACK = "ROLLBACK";
        public const string NOT_MATCH = "NOT_MATCH";
        public const string NOT_AUTH = "NO_AUTH";

        public const string URL = "URL";
        public const string RESOURCE = "RESOURCE";
        public const string INFO = "INFO";
        public const string NO_CALLBACK = "NO_CALLBACK";

        public const string ENABLED = "ENABLED";
        public const string DISABLED = "DISABLED";

        /* Json Options */
        public static readonly JsonSerializerOptions CustomJsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
    }
}