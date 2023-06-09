using System;
using Engine.BO;
using Engine.BL;
using D = Engine.BL.Delegates;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace BaseAPI.Classes
{
    public static class ParseProperty<T> {
        public static T? GetValue(string name, JsonObject? jObj, D.CallbackExceptionMsg? onMissingProperty = null) {
            try {
                var jKey = jObj?[name];
                T? result = default;
                
                if(jKey != null) {
                    result = jKey.GetValue<T?>();
                } 
                
                if(onMissingProperty != null && result == null)
                {
                    throw new Exception($"JSON Property `{ name }` is missing or invalid");
                }

                return result;

            } catch (Exception ex){
                onMissingProperty?.Invoke(ex, ex.Message);
                throw;
            }
        }
    }
}