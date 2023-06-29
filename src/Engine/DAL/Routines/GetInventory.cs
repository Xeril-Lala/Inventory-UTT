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
    public class GetInventory : StoredProcedure<dynamic, List<Item>>
    {
        private IDataParameter OutParameter = MDB.CreateParameterOut("OUT_MSG", MType.String);

        public GetInventory(
            BDAL dal,
            D.CallbackExceptionMsg? onException,
            Action? onProcess = null
        ) : base(dal, onException, onProcess)
        { }

        protected override string GetSPName() => SQL.GET_INVENTORY;

        protected override List<IDataParameter> GetParameters()
        {
            return new List<IDataParameter>
            {
                BDAL.CreateParameter("IN_ID", EntryData?.Id, MType.Int32),
                BDAL.CreateParameter("IN_CUSTOM_ID", EntryData?.CustomId, MType.String),
                BDAL.CreateParameter("IN_SERIAL", EntryData?.Serial, MType.String),
                BDAL.CreateParameter("IN_NAME", EntryData?.Name, MType.String),
                BDAL.CreateParameter("IN_MODEL", EntryData?.Model, MType.String),
                BDAL.CreateParameter("IN_FROM_DT", EntryData?.FromDt, MType.DateTime),
                BDAL.CreateParameter("IN_TO_DT", EntryData?.ToDt, MType.DateTime),
                BDAL.CreateParameter("IN_STATUS", EntryData?.Status, MType.Bit),
                OutParameter
            };
        }

        protected override List<Item> OnResult(MySqlCommand cmd)
        =>  DAL.ReaderPopulationBlock(cmd, OutParameter, GetSPName(), rdr =>
            {
                var item = new Item()
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
                        Key2 = V.Instance.getDefaultStringIfDBNull(rdr["BRAND_CODE"]),
                        Key3 = V.Instance.getDefaultStringIfDBNull(rdr["MODEL_ALTERNATIVE"]),
                        Desc1 = V.Instance.getDefaultStringIfDBNull(rdr["MODEL_DESC"]),
                        Data = Array.Empty<byte>()
                    },
                    Location = new()
                    {
                        Code = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_CODE"]),
                        Key1 = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_GROUP"]),
                        Key2 = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_SGROUP"]),
                        Key3 = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_AGROUP"]),
                        Value = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_VALUE"]),
                        Desc1 = V.Instance.getDefaultStringIfDBNull(rdr["LOCATION_DESCRIPTION"]),
                        Data = Array.Empty<byte>()
                    },
                    Serial = V.Instance.getDefaultStringIfDBNull(rdr["SERIAL"]),
                    Condition = V.Instance.getDefaultStringIfDBNull(rdr["CONDITION_USE"])
                };

                return item;
            }
        );

        public static object CreateObject(
            int? id = null,
            string? customId = null,
            string? serial = null,
            string? name = null,
            string? model = null,
            DateTime? fromDt = null,
            DateTime? toDt = null,
            bool? status = null
        ) => new
        {
            Id = id,
            CustomId = customId,
            Serial = serial,
            Name = name,
            Model = model,
            FromDt = fromDt,
            ToDt = toDt,
            Status = status
        };
    }
}