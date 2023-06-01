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
        public string? Connection => TestUtils.GetConn();

        public InventoryDAL_Test()
        {
            Settings = TestUtils.Settings;
            if (Settings != null)
            {
                FailConnection = Settings["failConn"]?.ToString();
            }

            if(Connection != null)
            {
                ConnectionString.SetConnectionString(() => Connection, "Connection");
            }
        }

        [TestMethod]
        public void Test_1DBConnection()
        {
            bool isSuccess = DBConnectionTest(out string result);
            Assert.IsTrue(isSuccess, result);
        }

        [TestMethod]
        public void Test_2SetUser()
        {
            bool isSuccess = SPTest(
                dal => dal.SetUser(DataSets.GetUser()), 
                out string? msg
            );
            Assert.IsTrue(isSuccess, msg);
        }

        [TestMethod]
        public void Test_3SetUserContact()
        {
            bool isSuccess = SPTest(
                dal => dal.SetUserContact(DataSets.GetContact()), 
                out string? msg
            );
            Assert.IsTrue(isSuccess, msg);
        }

        [TestMethod]
        public void Test_4SetAsset()
        {
            bool isSuccess = SPTest(
                dal => dal.SetAsset(DataSets.GetModel()),
                out string? msg
            );

            isSuccess = SPTest(
                dal => dal.SetAsset(DataSets.GetBrand()),
                out msg
            );

            Assert.IsTrue(isSuccess, msg);
        }

        [TestMethod]
        public void Test_5SetInventory()
        {
            bool isSuccess = SPTest(
                dal => dal.SetItem(DataSets.GetItem()),
                out string? msg
            );

            Assert.IsTrue(isSuccess, msg);
        }

        [TestMethod]
        public void Test_6SetLoanMode()
        {
            bool isSuccess = SPTest(
                dal => dal.SetLoanMode(DataSets.GetLoanMode()),
                out string? msg
            );

            Assert.IsTrue(isSuccess, msg);
        }

        [TestMethod]
        public void Test_7SetLoan()
        {
            bool isSuccess = SPTest(
                dal => dal.SetLoan(DataSets.GetLoan()),
                out string? msg
            );

            Assert.IsTrue(isSuccess, msg);
        }

        [TestMethod]
        public void Test_8SetLoanDtl()
        {
            bool isSuccess = SPTest(
                dal => dal.SetLoanDtl(DataSets.GetLoanDtl()),
                out string? msg
            );

            Assert.IsTrue(isSuccess, msg);
        }

        [TestMethod]
        public void Test_9StressTest()
        {
            bool isSuccess = false;
            string? msg = string.Empty;

            for(int i = 0; i < 1000; i++)
            {
                isSuccess = SPTest(
                    dal => dal.SetLoanDtl(DataSets.GetLoanDtl()),
                    out msg
                );

                if (isSuccess)
                    break;
            }

            Assert.IsTrue(isSuccess, msg);
        }

        private static bool SPTest(Func<InventoryDAL, Result?> cbRes, out string? msg)
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

            if(oResult?.Status == C.ERROR)
                result = oResult.Message;

            msg = result;

            return isSuccess;
        }

        private static bool DBConnectionTest(out string msg)
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