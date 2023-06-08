using Engine.Constants;

namespace Test.Engine
{
    [TestClass]
    public class InventoryDAL_Test : InventoryDAL_TestBase
    {

        [TestMethod]
        public void Test_0DBConnection()
        {
            bool isSuccess = DBConnectionTest(out string result);
            Assert.IsTrue(isSuccess, result);
        }

        [TestMethod]
        public void Test_1Auth()
        {
            bool isSucess = SPTest(dal => 
                {
                    var result = dal.AuthUser(TestUtils.GetTestingUser(), TestUtils.GetTestingPass());

                    if(result.Status == C.NOT_AUTH)
                    {
                        result.Status = C.ERROR;
                        result.Message = C.NOT_AUTH;
                    }

                    return result;
                },
                out string? msg
            );
            Assert.IsTrue(isSucess, msg);
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
    }
}