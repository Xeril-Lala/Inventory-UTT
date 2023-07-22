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

        public const string IMAGE = "IMAGE";

        public const string INVENTORY_UTT_DB = "Inventory-utt";

        public const string URL = "URL";
        public const string RESOURCE = "RESOURCE";
        public const string INFO = "INFO";
        public const string NO_CALLBACK = "NO_CALLBACK";

        public const string ROLE = "ROLE";
        public const string REFRESH_TOKEN = "REFRESH_TOKEN";

        public const string ENABLED = "ENABLED";
        public const string DISABLED = "DISABLED";

        public const string MODEL = "MODEL";
        public const string BRAND = "BRAND";
        public const string LOCATION = "LOCATION";
        public const string USER_GROUP = "USER_GROUP";
        public const string APP_GROUP = "APP_GROUP";

        /* Json Options */
        public static readonly JsonSerializerOptions CustomJsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
    }
}