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
        public void Test_0()
        {
            bool isSuccess = false;
            string? msg = string.Empty;

            var dal = InventoryDAL.GetInstance((ex, iMsg) => {
                isSuccess = false;
                msg = iMsg;
            });

            var list = dal.GetAssets(status: false);
            isSuccess = true;

            Assert.IsTrue(isSuccess, msg);
        }
    }
}
