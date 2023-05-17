using System;
using System.IO;
using System.Data;
using Engine.BL;
using Engine.BO;
using System.Text.Json;
using System.Configuration;
using System.Text.Json.Nodes;
using Engine.Services;
using Engine.DAL;

namespace Test
{
    public static class DummyTest
    {
        public static void Main(string[] arg) 
        {
            ConnectionString.SetConnectionString(GetConn, "test");
            BaseDAL.OnDALError = OnError;

            var dal = InventoryDAL.Instance;

            var result = dal.SetUser(new User() {
                Username = "DBA",
                Name = "Usr",
                Lastname = "Lastname",
                Password = "8udw153r_",
                Status = Status.ENABLED,
                TxnUser = "DBA"
            });
        }

        public static string GetConn()
        {
            string? conn = string.Empty;
            string file = File.ReadAllText("settings.json");
            var config = JsonNode.Parse(file);
            if (config != null)
            {
                conn = config["conn"]?.ToString();
            }

            return conn ?? string.Empty;
        }

        public static void OnError(Exception ex, string msg)
        {
            Console.WriteLine($"{msg} - {ex}");
        }
    }
}