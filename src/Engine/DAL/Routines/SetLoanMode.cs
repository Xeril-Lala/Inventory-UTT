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
    public class SetLoanMode : StoredProcedure<LoanMode, Result>
    {
        private IDataParameter OutParameter = MDB.CreateParameterOut("OUT_MSG", MType.String);

        public SetLoanMode(
            BDAL dal, 
            D.CallbackExceptionMsg? onException, 
            Action? onProcess = null
        ) : base(dal, onException, onProcess)
        {
        }

        protected override string GetSPName() => SQL.SET_LOAN_MODE;

        protected override List<IDataParameter> GetParameters()
        {
            return new List<IDataParameter>() {
                MDB.CreateParameter("IN_CODE", EntryData?.Code, MType.String),
                MDB.CreateParameter("IN_UNIT", EntryData?.Unit, MType.String),
                MDB.CreateParameter("IN_DURATION", EntryData?.Duration, MType.Int32),
                MDB.CreateParameter("IN_USER", EntryData?.TxnUser, MType.String),
                MDB.CreateParameter("IN_STATUS", EntryData?.IsEnabled, MType.Bit),
                OutParameter
            };
        }

        protected override Result OnResult(MySqlCommand cmd) 
            => BDAL.FetchResult(cmd, OutParameter, GetSPName());
    }
}