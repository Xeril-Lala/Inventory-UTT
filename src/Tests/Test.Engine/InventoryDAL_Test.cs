using Engine;
using Engine.DAL;
using System.Text.Json.Nodes;
using Test;

namespace Test.Engine
{
    [TestClass]
    public class InventoryDAL_Test
    {
        private JsonNode? Settings;
        public string? FailConnection;
        public string? Connection => TestUtils.GetConn();

        public InventoryDAL_Test() 
        {
            Settings = TestUtils.Settings;

            if(Settings != null)
            {
                FailConnection = Settings["failConn"]?.ToString();
            }
        }

        [TestMethod]
        public void Test_DBConnection()
        {
            bool isSuccess = false;

            var del = (Exception ex, string msg) => isSuccess = false;
            var dal = InventoryDAL.Instance;
            var routine = new Routine<string>(
                dal, 
                "SELECT TRUE",
                (ex, msg) => isSuccess = false,
                null
            );

            var str = routine.Exec(cmd => {
                var res = cmd.ExecuteScalar();
                return res.ToString() ?? string.Empty;
            });

            Assert.IsFalse(isSuccess, $"Connection fail");
        }
    }
}