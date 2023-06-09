﻿using Engine.BO;
using Engine.Constants;
using MySql.Data.MySqlClient;
using System.Data;
using BDAL = Engine.DAL.BaseDAL;
using D = Engine.BL.Delegates;
using MDB = DataService.MySQL.MySqlDataBase;
using MType = MySql.Data.MySqlClient.MySqlDbType;

namespace Engine.DAL.Routines
{
    public class SetLoan : StoredProcedure<Loan, Result>
    {
        private IDataParameter OutParameter = MDB.CreateParameterOut("OUT_MSG", MType.String),
                               OutId = MDB.CreateParameterOut("OUT_ID", MType.Int32);

        public SetLoan(
            BDAL dal, 
            D.CallbackExceptionMsg? onException,
            Action? onProcess = null
        ) : base(dal, onException, onProcess)
        {
        }

        protected override string GetSPName() => SQL.SET_LOAN;

        protected override List<IDataParameter> GetParameters()
        {
            return new List<IDataParameter>() {
                MDB.CreateParameter("IN_ID", EntryData?.Id, MType.Int32),
                MDB.CreateParameter("IN_COMMENT", EntryData?.Comments, MType.Text),
                MDB.CreateParameter("IN_LN_DT", EntryData?.LoanDt, MType.DateTime),
                MDB.CreateParameter("IN_RN_DT", EntryData?.ReturnDt, MType.DateTime),
                MDB.CreateParameter("IN_MODE", EntryData?.Mode?.Code, MType.String),
                MDB.CreateParameter("IN_LN_STS", EntryData?.LoanStatus, MType.String),
                MDB.CreateParameter("IN_RESPONSIBLE", EntryData?.Responsible, MType.String),
                MDB.CreateParameter("IN_RESPONSIBLE_KEY", EntryData?.ResponsibleId, MType.String),
                MDB.CreateParameter("IN_CONTACT1", EntryData?.ResponsibleContact, MType.String),
                MDB.CreateParameter("IN_CONTACT2", EntryData?.ResponsibleContact2, MType.String),
                MDB.CreateParameter("IN_USER", EntryData?.TxnUser, MType.String),
                MDB.CreateParameter("IN_STATUS", EntryData?.IsEnabled, MType.Bit),
                OutId,
                OutParameter
            };
        }

        protected override Result OnResult(MySqlCommand cmd)
        {
            Result result = BDAL.FetchResult(cmd, OutParameter, GetSPName(), result =>
            {
                var value = OutId?.Value;

                if(value != null)
                {
                    result.Data = Validate.Instance.getDefaultIntIfDBNull(value);
                }
            });

            if (result.Status == C.OK && result.Message == C.COMPLETE)
                result.Data = InventoryDAL.GetInstance(OnException)
                    .GetLoans(id: (int?)result.Data)?
                    .FirstOrDefault();

            return result;
        }
    }
}