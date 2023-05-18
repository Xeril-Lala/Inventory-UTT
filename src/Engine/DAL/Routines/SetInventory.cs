using Engine.BO;
using Engine.Constants;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using BDAL = Engine.DAL.BaseDAL;
using D = Engine.BL.Delegates;
using MDB = DataService.MySQL.MySqlDataBase;
using MType = MySql.Data.MySqlClient.MySqlDbType;

namespace Engine.DAL.Routines
{
    public class SetInventory : StoredProcedure<Item, Result>
    {
        private IDataParameter OutParameter = MDB.CreateParameterOut("OUT_MSG", MType.String);

        public SetInventory(
            BDAL dal, 
            D.CallbackExceptionMsg? onException, 
            Action? onAction
        ) : base(dal, onException, onAction) 
        {
        }

        protected override string GetSPName() => SQL.SET_INVENTORY;

        protected override List<IDataParameter> GetParameters()
        {
            return new List<IDataParameter>() 
            {
                MDB.CreateParameter("IN_ID", EntryData?.Id, MType.Int32),
                MDB.CreateParameter("IN_CM_ID", EntryData?.CustomId, MType.String),
                MDB.CreateParameter("IN_DESC", EntryData?.Description, MType.Text),
                MDB.CreateParameter("IN_NAME", EntryData?.Name, MType.String),
                MDB.CreateParameter("IN_ACQUISITION_DT", EntryData?.Acquisition, MType.DateTime),
                MDB.CreateParameter("IN_MODEL_CODE", EntryData?.Model?.Code, MType.String),
                MDB.CreateParameter("IN_SERIAL", EntryData?.Serial, MType.String),
                MDB.CreateParameter("IN_CONDITION", EntryData?.Condition, MType.String),
                MDB.CreateParameter("IN_USER", EntryData?.TxnUser, MType.String),
                MDB.CreateParameter("IN_STATUS", EntryData?.IsEnabled, MType.Bit),
                OutParameter
            };
        }

        protected override Result OnResult(MySqlCommand cmd) => BDAL.FetchResult(cmd, OutParameter, GetSPName());
    }
}