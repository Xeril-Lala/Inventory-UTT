using Engine.BO;
using Engine.Constants;
using System;
using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;
using BDAL = Engine.DAL.BaseDAL;
using D = Engine.BL.Delegates;
using MDB = DataService.MySQL.MySqlDataBase;
using MType = MySql.Data.MySqlClient.MySqlDbType;
using V = Engine.BO.Validate;

namespace Engine.DAL.Routines
{
    public class GetLoan : StoredProcedure<dynamic, List<Loan>>
    {
        private IDataParameter OutParameter = MDB.CreateParameterOut("OUT_MSG", MType.String);

        public GetLoan(
            BDAL dal,
            D.CallbackExceptionMsg? onException,
            Action? onProcess = null
        ) : base(dal, onException, onProcess)
        { }

        protected override string GetSPName() => SQL.GET_LOAN;

        protected override List<IDataParameter> GetParameters()
        {
            return new List<IDataParameter>
            {
                BDAL.CreateParameter("IN_ID", EntryData?.Id, MType.Int32),
                BDAL.CreateParameter("IN_FROM_DT", EntryData?.FromDt, MType.DateTime),
                BDAL.CreateParameter("IN_TO_DT", EntryData?.ToDt, MType.DateTime),
                BDAL.CreateParameter("IN_COMMENTS", EntryData?.Comments, MType.Text),
                BDAL.CreateParameter("IN_MODE", EntryData?.Mode, MType.String),
                BDAL.CreateParameter("IN_STATUS", EntryData?.Status, MType.Bit),
                OutParameter
            };
        }

        protected override List<Loan> OnResult(MySqlCommand cmd)
        {
            var rawLoans = DAL.ReaderPopulationBlock(cmd, OutParameter, GetSPName(), rdr => 
            {
                // TODO: Populate Loan mode object
                var loanMode = new LoanMode();

                var loan = new Loan
                {
                    Id = V.Instance.getDefaultIntIfDBNull(rdr["LOAN_ID"]),
                    Comments = V.Instance.getDefaultStringIfDBNull(rdr["COMMENTS"]),
                    LoanDt = V.Instance.getDefaultDateIfDBNull(rdr["LOAN_DT"]),
                    ReturnDt = V.Instance.getDefaultDateIfDBNull(rdr["RETURN_DT"]),
                    Mode = loanMode,
                    LoanStatus = V.Instance.getDefaultStringIfDBNull(rdr["LOAN_STATUS"]),
                    Items = new List<LoanDtl>()
                };

                var loanDtl = new LoanDtl
                {
                    Id = V.Instance.getDefaultIntIfDBNull(rdr["LOAN_DTL_ID"]),
                    Description = V.Instance.getDefaultStringIfDBNull(rdr["DESCRIPTION"]),
                    DetailStatus = V.Instance.getDefaultStringIfDBNull(rdr["DETAIL_STATUS"]),
                    Loan = loan
                };

                loan.Items.Add(loanDtl);

                return loan;
            });

            return rawLoans
               .GroupBy(loan => loan.Id)
               .Select(group =>
               {
                   var baseModel = group.First();
                   var consolidatedItems = group.SelectMany(loan => loan.Items).ToList();
                   baseModel.Items.AddRange(consolidatedItems);
                   return baseModel;
               })
               .ToList();
        }

        public static object CreateObject(
            int? id = null,
            DateTime? fromDt = null,
            DateTime? toDt = null,
            string? comments = null,
            string? mode = null,
            bool? status = null
        ) => new
        {
            Id = id,
            FromDt = fromDt,
            ToDt = toDt,
            Comments = comments,
            Mode = mode,
            Status = status
        };
    }
}
