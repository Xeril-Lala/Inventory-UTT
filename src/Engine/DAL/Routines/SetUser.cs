using System.Data;
using Engine.BO;
using Engine.Constants;
using MySql.Data.MySqlClient;
using BDAL = Engine.DAL.BaseDAL;
using D = Engine.BL.Delegates;
using MDB = DataService.MySQL.MySqlDataBase;
using MType = MySql.Data.MySqlClient.MySqlDbType;

namespace Engine.DAL.Routines
{
    public class SetUser : StoredProcedure<User, Result>
    {
        private IDataParameter OutParameter = MDB.CreateParameterOut("OUT_MSG", MType.String);

        public SetUser(
            BDAL dal, 
            D.CallbackExceptionMsg? onException,
            Action? onProcess = null
        ) : base(dal, onException, onProcess)
        {
        }

        protected override string GetSPName() => SQL.SET_USER;

        protected override List<IDataParameter> GetParameters()
        {
            return new List<IDataParameter>() {
                MDB.CreateParameter("IN_USERNAME", EntryData.Username, MType.String),
                MDB.CreateParameter("IN_NAME", EntryData.Name, MType.String),
                MDB.CreateParameter("IN_LASTNAME", EntryData.Lastname, MType.String),
                MDB.CreateParameter("IN_PASSWORD", EntryData.Password, MType.String),
                MDB.CreateParameter("IN_USER", EntryData.TxnUser, MType.String),
                MDB.CreateParameter("IN_STATUS", EntryData.IsEnabled, MType.Bit),
                OutParameter
            };
        }

        protected override Result OnResult(MySqlCommand cmd)
            => BDAL.FetchResult(cmd, OutParameter, GetSPName());
    }
}