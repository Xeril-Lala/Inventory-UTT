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
using Engine.BO.Classes;

namespace Engine.DAL.Routines
{
    public class GetUser : StoredProcedure<dynamic, List<User>>
    {
        private readonly IDataParameter OutParameter = MDB.CreateParameterOut("OUT_MSG", MType.String);

        public GetUser(
            BDAL dal,
            D.CallbackExceptionMsg? onException,
            Action? onProcess = null
        ) : base(dal, onException, onProcess)
        { }

        protected override string GetSPName() => SQL.GET_USER;

        protected override List<IDataParameter> GetParameters()
        {
            return new List<IDataParameter>
            {
                BDAL.CreateParameter("IN_USERNAME", EntryData?.Username, MType.String),
                BDAL.CreateParameter("IN_SEARCH", EntryData?.Search, MType.String),
                BDAL.CreateParameter("IN_STATUS", EntryData?.Status, MType.Bit),
                OutParameter
            };
        }

        protected override List<User> OnResult(MySqlCommand cmd)
        => DAL.ReaderPopulationBlock(cmd, OutParameter, GetSPName(), rdr =>
        {
            var contact = new UserContact()
            {
                User = null,
                ID = V.Instance.getDefaultStringIfDBNull(rdr["KEY1"]),
                AlternativeID = V.Instance.getDefaultStringIfDBNull(rdr["KEY2"]),
                Email = V.Instance.getDefaultStringIfDBNull(rdr["EMAIL1"]),
                Email2 = V.Instance.getDefaultStringIfDBNull(rdr["EMAIL2"]),
                Phone = V.Instance.getDefaultStringIfDBNull(rdr["PHONE1"]),
                Phone2 = V.Instance.getDefaultStringIfDBNull(rdr["PHONE2"]),
                Address = V.Instance.getDefaultStringIfDBNull(rdr["ADDRESS"])
            };

            var user = new User()
            {
                Username = V.Instance.getDefaultStringIfDBNull(rdr["USERNAME"]),
                Name = V.Instance.getDefaultStringIfDBNull(rdr["NAME"]),
                Lastname = V.Instance.getDefaultStringIfDBNull(rdr["LASTNAME"]),
                Group = new Asset()
                {
                    Code = V.Instance.getDefaultStringIfDBNull(rdr["GROUP_CODE"]),
                    Value = V.Instance.getDefaultStringIfDBNull(rdr["GROUP_VALUE"]),
                    Key1 = V.Instance.getDefaultStringIfDBNull(rdr["USER_GROUP"]),
                    Key2 = V.Instance.getDefaultStringIfDBNull(rdr["USER_SGROUP"]),
                    Key3 = V.Instance.getDefaultStringIfDBNull(rdr["USER_AGROUP"]),
                    Desc1 = V.Instance.getDefaultStringIfDBNull(rdr["GROUP_DESC"]),
                },
                Contact = contact
            };

            contact.User = user;

            return user;
        });

        public static object CreateObject(
            string? username = null,
            string? search = null,
            bool? status = null
        ) => new
        {
            Username = username,
            Search = search,
            Status = status
        };
    }
}