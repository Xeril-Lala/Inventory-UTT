using Engine;
using Engine.Constants;
using Engine.DAL;
using Engine.Services;
using System.Text.Json.Nodes;
using System.Data;
using D = Engine.BL.Delegates;
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
            ConnectionString.SetConnectionString(() => Connection, "Connection");
        }

        [TestMethod]
        public void Test_DBConnection()
        {
            bool isSuccess = DBConnectionTest(out string result);
            Assert.IsTrue(isSuccess, result);
        }

        [TestMethod]
        public void Test_SetUser()
        {
            bool isSuccess = SPTest(
                () => dal.SetUser(DataSets.GetUser()), 
                out string? msg
            );
            Assert.IsTrue(isSuccess, msg);
        }

        [TestMethod]
        public void Test_SetUserContact()
        {
            bool isSuccess = SPTest(
                () => dal.SetUserContact(DataSets.GetContact()), 
                out string? msg
            );
            Assert.IsTrue(isSuccess, msg);
        }

        private bool SPTest(Func<Result?> cbRes, out string? msg)
        {
            bool isSuccess = false;
            string result = C.OK;
            msg = string.Empty;

            D.CallbackExceptionMsg onException = (Exception ex, string msg) =>
            {
                isSuccess = false;
                result = msg;
            };
            BaseDAL.OnError = onException;

            isSuccess = TestUtils.IsSuccess(cbRes());
            msg = result;

            return isSuccess;
        }

        private bool DBConnectionTest(out string msg)
        {
            bool isSuccess = false;
            string? result = C.OK;
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