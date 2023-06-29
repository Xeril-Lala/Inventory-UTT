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
    public class InventoryDAL_Ext_Test : InventoryDAL_TestBase
    {
        [TestMethod]
        public void Test_0GetAssets()
        {
            var isSuccess = SPTest(dal => new()
            {
                Status = C.OK,
                Message = C.COMPLETE,
                Data = dal.GetAssets(status: false)
            }, out string? msg);

            isSuccess = SPTest(dal => new()
            {
                Status = C.OK,
                Message = C.COMPLETE,
                Data = dal.GetAllAssets(status: false)
            }, out msg);

            Assert.IsTrue(isSuccess, msg);
        }

        [TestMethod]
        public void Test_1GetItems()
        {
            var isSuccess = SPTest(dal => new() { 
                Status = C.OK, 
                Message = C.COMPLETE,
                Data = dal.GetItems(status: false)
            },out string? msg);

            Assert.IsTrue(isSuccess, msg);
        }

        [TestMethod]
        public void Test_2GetLoans()
        {
            var isSuccess = SPTest(dal => new()
            {
                Status = C.OK,
                Message = C.COMPLETE,
                Data = dal.GetLoans(status: false)
            }, out string? msg);

            Assert.IsTrue(isSuccess, msg);
        }

        [TestMethod]
        public void Test_3GetLoansDtl()
        {
            var isSuccess = SPTest(dal => new()
            {
                Status = C.OK,
                Message = C.COMPLETE,
                Data = dal.GetLoanDtls(status: false)
            }, out string? msg);

            Assert.IsTrue(isSuccess, msg);
        }

        [TestMethod]
        public void Test_4GetUsers()
        {
            var isSuccess = SPTest(dal => new()
            {
                Status = C.OK,
                Message = C.COMPLETE,
                Data = dal.GetUsers(status: false)
            }, out string? msg);

            Assert.IsTrue(isSuccess, msg);
        }

        [TestMethod]
        public void Test_5LoanMode()
        {
            var isSuccess = SPTest(dal => new() 
            { 
                Status = C.OK,
                Message = C.COMPLETE,
                Data = dal.GetLoanModes() 
            }, out string? msg);

            Assert.IsTrue(isSuccess, msg);
        }
    }
}
