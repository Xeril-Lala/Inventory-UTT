using Engine;
using Engine.Constants;
using Engine.DAL;
using Engine.Services;
using System.Text.Json.Nodes;
using System.Data;
using Test;
using D = Engine.BL.Delegates;
using System.Reflection.Metadata.Ecma335;
using Engine.BO;

namespace Test.Engine
{
    [TestClass]
    public class InventoryDAL_Test
    {
        private JsonNode? Settings;
        public string? FailConnection;

        public InventoryDAL dal => InventoryDAL.Instance;
        public string? Connection => TestUtils.GetConn();

        public InventoryDAL_Test()
        {
            Settings = TestUtils.Settings;

            if (Settings != null)
            {
                FailConnection = Settings["failConn"]?.ToString();
            }
        }

        [TestMethod]
        public void Test_DBConnection()
        {
            bool isSuccess = DBConnectionTest(Connection, out string result);
            Assert.IsTrue(isSuccess, result);
        }

        [TestMethod]
        public void Test_SetUser()
        {
            
        }

        private bool DBConnectionTest(string? connection, out string msg)
        {
            bool isSuccess = false;
            string? result = C.OK;
            ConnectionString.SetConnectionString(() => connection, "Connection");
            D.CallbackExceptionMsg onException = (Exception ex, string msg) =>
            {
                isSuccess = false;
                result = msg;
            };

            var routine = new Routine<string>(dal, "SELECT 'OK'", onException);

            routine.Exec(cmd => {
                cmd.CommandType = CommandType.Text;
                var res = cmd.ExecuteScalar();
                isSuccess = true;
                return res.ToString() ?? string.Empty;
            });

            msg = result ?? C.ERROR;

            return isSuccess;
        }
    }
}