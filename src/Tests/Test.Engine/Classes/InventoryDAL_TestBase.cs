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
    public class InventoryDAL_TestBase
    {
        private JsonNode? Settings;

        public string? FailConnection;
        public string? Connection => TestUtils.GetConn();

        public InventoryDAL_TestBase()
        {
            Settings = TestUtils.Settings;
            if (Settings != null)
            {
                FailConnection = Settings["failConn"]?.ToString();
            }

            if (Connection != null)
            {
                ConnectionString.SetConnectionString(() => Connection, "Connection");
            }
        }

        protected static bool SPTest(Func<InventoryDAL, Result?> cbRes, out string? msg)
        {
            bool isSuccess = false;
            string result = C.OK;
            msg = string.Empty;

            D.CallbackExceptionMsg onException = (Exception ex, string msg) =>
            {
                isSuccess = false;
                result = msg;
            };

            var dal = InventoryDAL.GetInstance(onException);
            var oResult = cbRes(dal);

            isSuccess = TestUtils.IsSuccess(oResult);

            if (oResult?.Status == C.ERROR)
                result = oResult.Message;

            msg = result;

            return isSuccess;
        }

        protected static bool DBConnectionTest(out string msg)
        {
            bool isSuccess = false;
            string? result = C.OK;
            D.CallbackExceptionMsg onException = (Exception ex, string msg) =>
            {
                isSuccess = false;
                result = msg;
            };

            var dal = InventoryDAL.GetInstance(onException);
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