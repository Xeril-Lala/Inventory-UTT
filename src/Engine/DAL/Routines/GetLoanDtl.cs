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
    public class GetLoanDtl : StoredProcedure<dynamic, List<LoanDtl>>
    {
        private IDataParameter OutParameter = MDB.CreateParameterOut("OUT_MSG", MType.String);

        public GetLoanDtl(
            BDAL dal,
            D.CallbackExceptionMsg? onException,
            Action? onProcess = null
        ) : base(dal, onException, onProcess)
        { }

        protected override string GetSPName() => SQL.GET_LOAN_DTL;

        protected override List<IDataParameter> GetParameters()
        {
            return new List<IDataParameter>
            {
                BDAL.CreateParameter("IN_ID", EntryData?.Id, MType.Int32),
                BDAL.CreateParameter("IN_FROM_DT", EntryData?.FromDt, MType.DateTime),
                BDAL.CreateParameter("IN_TO_DT", EntryData?.ToDt, MType.DateTime),
                BDAL.CreateParameter("IN_LOAN_ID", EntryData?.LoanId, MType.Int32),
                BDAL.CreateParameter("IN_DTL_DESCRIPTION", EntryData?.DtlDescription, MType.Text),
                BDAL.CreateParameter("IN_DTL_STS", EntryData?.DtlStatus, MType.String),
                BDAL.CreateParameter("IN_COMMENTS", EntryData?.Comments, MType.Text),
                BDAL.CreateParameter("IN_LOAN_MODE", EntryData?.LoanMode, MType.VarChar),
                BDAL.CreateParameter("IN_LOAN_STS", EntryData?.LoanStatus, MType.VarChar),
                BDAL.CreateParameter("IN_INVENTORY_ID", EntryData?.InventoryId, MType.Int32),
                BDAL.CreateParameter("IN_CUSTOM_ID", EntryData?.CustomId, MType.VarChar),
                BDAL.CreateParameter("IN_SERIAL", EntryData?.Serial, MType.VarChar),
                BDAL.CreateParameter("IN_MODEL", EntryData?.Model, MType.VarChar),
                BDAL.CreateParameter("IN_BRAND", EntryData?.Brand, MType.VarChar),
                BDAL.CreateParameter("IN_STATUS", EntryData?.Status, MType.Bit),
                OutParameter
            };
        }

        protected override List<LoanDtl> OnResult(MySqlCommand cmd)
        {
            return DAL.ReaderPopulationBlock(cmd, OutParameter, GetSPName(), rdr =>
            {
                var loanMode = new LoanMode()
                {
                    Code = V.Instance.getDefaultStringIfDBNull(rdr["LM_CODE"]),
                    Duration = V.Instance.getDefaultDoubleIfDBNull(rdr["DURATION"]),
                    Unit = V.Instance.getDefaultStringIfDBNull(rdr["DURATION_UNIT"])
                };

                Loan? currentLoan = new Loan()
                {
                    Id = V.Instance.getDefaultIntIfDBNull(rdr["LOAN_ID"]),
                    Comments = V.Instance.getDefaultStringIfDBNull(rdr["COMMENTS"]),
                    LoanDt = V.Instance.getDefaultDateIfDBNull(rdr["LOAN_DT"]),
                    ReturnDt = V.Instance.getDefaultDateIfDBNull(rdr["RETURN_DT"]),
                    Responsible = V.Instance.getDefaultStringIfDBNull(rdr["RESPONSIBLE"]),
                    ResponsibleId = V.Instance.getDefaultStringIfDBNull(rdr["RESPONSIBLE_KEY"]),
                    ResponsibleContact = V.Instance.getDefaultStringIfDBNull(rdr["RESPONSIBLE_CONTACT1"]),
                    ResponsibleContact2 = V.Instance.getDefaultStringIfDBNull(rdr["RESPONSIBLE_CONTACT2"]),
                    Mode = loanMode,
                    LoanStatus = V.Instance.getDefaultStringIfDBNull(rdr["LOAN_STS"]),
                    Items = new List<LoanDtl>()
                };

                var locationCode = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_CODE"]);

                if (!string.IsNullOrEmpty(locationCode))
                {
                    var location = new LoanLocation()
                    {
                        Description = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_DESCRIPTION"]),
                        Loan = currentLoan,
                        Location = new()
                        {
                            Code = locationCode,
                            Key1 = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_GROUP"]),
                            Key2 = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_SGROUP"]),
                            Key3 = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_AGROUP"]),
                            Value = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_VALUE"])
                        },
                    };

                    currentLoan.Location = location;
                }

                var loanDtl = new LoanDtl
                {
                    Id = V.Instance.getDefaultIntIfDBNull(rdr["LOAN_DTL_ID"]),
                    Description = V.Instance.getDefaultStringIfDBNull(rdr["LOAN_STL_DESC"]),
                    DetailStatus = V.Instance.getDefaultStringIfDBNull(rdr["LOAN_DTL_STS"]),
                    Item = new Item()
                    {
                        Id = V.Instance.getDefaultIntIfDBNull(rdr["INVENTORY_ID"]),
                        Name = V.Instance.getDefaultStringIfDBNull(rdr["NAME"]),
                        CustomId = V.Instance.getDefaultStringIfDBNull(rdr["CUSTOM_ID"]),
                        Description = V.Instance.getDefaultStringIfDBNull(rdr["DESCRIPTION"]),
                        Acquisition = V.Instance.getDefaultDateIfDBNull(rdr["ACQUISITION_DT"]),
                        Model = new Asset()
                        {
                            Code = V.Instance.getDefaultStringIfDBNull(rdr["MODEL_CODE"]),
                            Value = V.Instance.getDefaultStringIfDBNull(rdr["MODEL_VALUE"]),
                            Key1 = V.Instance.getDefaultStringIfDBNull(rdr["MODEL_GROUP"]),
                            Key2 = V.Instance.getDefaultStringIfDBNull(rdr["BRAND_GROUP"]),
                            Key3 = V.Instance.getDefaultStringIfDBNull(rdr["MODEL_ALTERNATIVE"]),
                            Desc1 = V.Instance.getDefaultStringIfDBNull(rdr["MODEL_DESCRIPTION"]),
                            Data = Array.Empty<byte>()
                        },
                        Serial = V.Instance.getDefaultStringIfDBNull(rdr["SERIAL"]),
                        Condition = V.Instance.getDefaultStringIfDBNull(rdr["CONDITION_USE"])
                    },
                    Loan = currentLoan
                };

                currentLoan.Items.Add(loanDtl);
                
                return loanDtl;
            });
        }

        public static object CreateObject(
            int? id = null,
            DateTime? fromDt = null,
            DateTime? toDt = null,
            int? loanId = null,
            string? dtlDescription = null,
            string? dtlStatus = null,
            string? comments = null,
            string? loanMode = null,
            string? loanStatus = null,
            int? inventoryId = null,
            string? customId = null,
            string? serial = null,
            string? model = null,
            string? brand = null,
            bool? status = null
        ) => new
        {
            Id = id,
            FromDt = fromDt,
            ToDt = toDt,
            LoanId = loanId,
            DtlDescription = dtlDescription,
            DtlStatus = dtlStatus,
            Comments = comments,
            LoanMode = loanMode,
            LoanStatus = loanStatus,
            InventoryId = inventoryId,
            CustomId = customId,
            Serial = serial,
            Model = model,
            Brand = brand,
            Status = status
        };
    }
}
