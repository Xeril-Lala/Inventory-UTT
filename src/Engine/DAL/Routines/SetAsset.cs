using Engine.BO;
using Engine.Constants;
using MySql.Data.MySqlClient;
using System.Data;
using BDAL = Engine.DAL.BaseDAL;
using D = Engine.BL.Delegates;
using MDB = DataService.MySQL.MySqlDataBase;
using MType = MySql.Data.MySqlClient.MySqlDbType;

namespace Engine.DAL.Routines
{
    public class SetAsset : StoredProcedure<Asset, Result>
    {
        private IDataParameter OutParameter = MDB.CreateParameterOut("OUT_MSG", MType.String);

        public SetAsset(
            BDAL dal, 
            D.CallbackExceptionMsg? onException, 
            Action? onProcess = null
        ) : base(dal, onException, onProcess) 
        {
        }

        protected override string GetSPName() => SQL.SET_ASSET;

        protected override List<IDataParameter> GetParameters()
        {
            return new List<IDataParameter>() {
                MDB.CreateParameter("IN_CODE", EntryData?.Code, MType.String),
                MDB.CreateParameter("IN_VALUE", EntryData?.Value, MType.String),
                MDB.CreateParameter("IN_KEY1", EntryData?.Key1, MType.String),
                MDB.CreateParameter("IN_KEY2", EntryData?.Key2, MType.String),
                MDB.CreateParameter("IN_KEY3", EntryData?.Key3, MType.String),
                MDB.CreateParameter("IN_DESC1", EntryData?.Desc1, MType.Text),
                MDB.CreateParameter("IN_DESC2", EntryData?.Desc2, MType.Text),
                MDB.CreateParameter("IN_DESC3", EntryData?.Desc3, MType.Text),
                MDB.CreateParameter("IN_HEX_BIN", EntryData?.Desc1, MType.LongText),
                MDB.CreateParameter("IN_USER", EntryData?.TxnUser, MType.String),
                MDB.CreateParameter("IN_STATUS", EntryData?.IsEnabled, MType.Bit),
                OutParameter
            };
        }

        protected override Result OnResult(MySqlCommand cmd)
            => BDAL.FetchResult(cmd, OutParameter, GetSPName());
    }
}