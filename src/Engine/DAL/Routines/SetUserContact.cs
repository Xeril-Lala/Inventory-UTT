using Engine.BO;
using Engine.BO.Classes;
using Engine.Constants;
using MySql.Data.MySqlClient;
using System.Data;
using BDAL = Engine.DAL.BaseDAL;
using D = Engine.BL.Delegates;
using MDB = DataService.MySQL.MySqlDataBase;
using MType = MySql.Data.MySqlClient.MySqlDbType;

namespace Engine.DAL.Routines
{
    public class SetUserContact : StoredProcedure<UserContact, Result>
    {
        private IDataParameter OutParameter = MDB.CreateParameterOut("OUT_MSG", MType.String);

        public SetUserContact(
            BDAL dal,
            D.CallbackExceptionMsg? onException,
            Action? onProcess
        ) : base(dal, onException, onProcess)
        {
        }

        protected override string GetSPName() => SQL.SET_USER_CONTACT;

        protected override List<IDataParameter> GetParameters()
        {
            return new List<IDataParameter>() 
            {
                MDB.CreateParameter("IN_USERNAME", EntryData?.User?.Username, MType.String),
                MDB.CreateParameter("IN_KEY1", EntryData?.ID, MType.String),
                MDB.CreateParameter("IN_KEY2", EntryData?.AlternativeID, MType.String),
                MDB.CreateParameter("IN_EMAIL1", EntryData?.Email, MType.String),
                MDB.CreateParameter("IN_EMAIL2", EntryData?.Email2, MType.String),
                MDB.CreateParameter("IN_PHONE1", EntryData?.Phone, MType.String),
                MDB.CreateParameter("IN_PHONE2", EntryData?.Phone2, MType.String),
                MDB.CreateParameter("IN_ADDRESS", EntryData?.Address, MType.Text),
                MDB.CreateParameter("IN_USER", EntryData?.TxnUser, MType.String),
                MDB.CreateParameter("IN_STATUS", EntryData?.IsEnabled, MType.Bit),
                OutParameter
            };
        }

        protected override Result OnResult(MySqlCommand cmd) 
            => BDAL.FetchResult(cmd, OutParameter, GetSPName());
    }
}