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
    public class SetLoanDtl : StoredProcedure<LoanDtl, Result>
    {
        private IDataParameter OutParameter = MDB.CreateParameterOut("OUT_MSG", MType.String),
                               OutId = MDB.CreateParameterOut("OUT_ID", MType.Int32);

        public SetLoanDtl(
            BDAL dal, 
            D.CallbackExceptionMsg? onException, 
            Action? onProcess = null
        ) : base(dal, onException, onProcess)
        {
        }

        protected override string GetSPName() => SQL.SET_LOAN_DTL;

        protected override List<IDataParameter> GetParameters()
        {
            return new List<IDataParameter>()
            {
                MDB.CreateParameter("IN_ID", EntryData?.Id, MType.Int32),
                MDB.CreateParameter("IN_LOAN_ID", EntryData?.Loan ?.Id, MType.Int32),
                MDB.CreateParameter("IN_INVENTORY_ID", EntryData?.Item?.Id, MType.Int32),
                MDB.CreateParameter("IN_DESC", EntryData?.Description, MType.Text),                
                MDB.CreateParameter("IN_LN_STATUS", EntryData?.DetailStatus, MType.String),
                MDB.CreateParameter("IN_USER", EntryData?.TxnUser, MType.String),
                MDB.CreateParameter("IN_STATUS", EntryData?.IsEnabled, MType.Bit),
                OutId,
                OutParameter
            };
        }

        protected override Result OnResult(MySqlCommand cmd) => BDAL.FetchResult(cmd, OutParameter, GetSPName(),
            result => result.Data = OutId.Value
        );
    }
}