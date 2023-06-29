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
using System.Text.RegularExpressions;

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
                var loanMode = new LoanMode() 
                {
                    Code = V.Instance.getDefaultStringIfDBNull(rdr["LM_CODE"]),
                    Duration = V.Instance.getDefaultDoubleIfDBNull(rdr["DURATION"]),
                    Unit = V.Instance.getDefaultStringIfDBNull(rdr["DURATION_UNIT"])
                };

                var loan = new Loan
                {
                    Id = V.Instance.getDefaultIntIfDBNull(rdr["LOAN_ID"]),
                    Comments = V.Instance.getDefaultStringIfDBNull(rdr["COMMENTS"]),
                    LoanDt = V.Instance.getDefaultDateIfDBNull(rdr["LOAN_DT"]),
                    ReturnDt = V.Instance.getDefaultDateIfDBNull(rdr["RETURN_DT"]),
                    Mode = loanMode,
                    Responsible = V.Instance.getDefaultStringIfDBNull(rdr["RESPONSIBLE"]),
                    ResponsibleId = V.Instance.getDefaultStringIfDBNull(rdr["RESPONSIBLE_KEY"]),
                    ResponsibleContact = V.Instance.getDefaultStringIfDBNull(rdr["RESPONSIBLE_CONTACT1"]),
                    ResponsibleContact2 = V.Instance.getDefaultStringIfDBNull(rdr["RESPONSIBLE_CONTACT2"]),
                    LoanStatus = V.Instance.getDefaultStringIfDBNull(rdr["LOAN_STATUS"]),
                    Items = new List<LoanDtl>()
                };

                //var locationCode = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_CODE"]);

                //if(!string.IsNullOrEmpty(locationCode))
                //{
                //    var location = new LoanLocation()
                //    {
                //        Description = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_DESCRIPTION"]),
                //        Loan = loan,
                //        Location = new ()
                //        {
                //            Code = locationCode,
                //            Key1 = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_GROUP"]),
                //            Key2 = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_SGROUP"]),
                //            Key3 = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_AGROUP"]),
                //            Value = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_VALUE"])
                //        },
                //    };

                //    loan.Location = location;
                //}

                return loan;
            });

            return rawLoans;
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
