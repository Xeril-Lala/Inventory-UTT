using System;
using System.Collections.Generic;
using System.Data;
using Engine.BO;
using Engine.Constants;
using Engine.Interfaces;
using MySql.Data.MySqlClient;
using BDAL = Engine.DAL.BaseDAL;
using D = Engine.BL.Delegates;
using MDB = DataService.MySQL.MySqlDataBase;
using MType = MySql.Data.MySqlClient.MySqlDbType;

namespace Engine.DAL.Routines
{
    public class SetUser : StoredProcedure<Result>, IServiceSP<User, Result>
    {
        public User EntryData { get; set; }

        private IDataParameter OutParameter = MDB.CreateParameterOut("OUT_MSG", MType.String);

        public SetUser(BDAL dal, D.CallbackExceptionMsg? onException, Action? onProcess ) : base(dal, onException, onProcess) 
            => EntryData = new User();

        public Result? GetOutput() => _Result;

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
        {
            Result result = new ();

            MDB.NonQueryBlock(
                cmd,
                () => BDAL.GetResult(OutParameter, GetSPName(), out result)
            );
            cmd.Dispose();

            return result;
        }
    }
}

//public SetUser(D.CallbackExceptionMsg? onException, User input, Action? onProcess) : base(onException, onProcess) 
//    => EntryData = input;