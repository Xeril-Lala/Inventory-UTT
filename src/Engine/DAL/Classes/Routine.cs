using DataService.MySQL;
using Engine.BO;
using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using MySql.Data.MySqlClient;
using D = Engine.BL.Delegates;

namespace Engine.DAL
{
    public class Routine<TResult> // where TResult : class, new()
    {
        public delegate TResult OnResult(MySqlCommand cmd);

        private MySqlDataBase Db { get; set; }
        private string StoreProcedure { get; set; }
        private D.CallbackExceptionMsg? OnException { get; set; }
        private Action? OnProcess { get; set; }
        public List<IDataParameter> Parameters { get; set; } = new List<IDataParameter>();

        public Routine(MySqlDataBase db, string sp)
        {
            Db = db;
            StoreProcedure = sp;
        }

        public Routine(
            MySqlDataBase db,
            string sp,
            D.CallbackExceptionMsg onException,
            Action? onProcess = null
        )
        {
            Db = db;
            StoreProcedure = sp;
            OnException = onException;
            OnProcess = onProcess;
        }

        private MySqlCommand CreateCommand()
        {
            MySqlCommand cmd = Db.CreateCommand(StoreProcedure, CommandType.StoredProcedure);
            cmd.Parameters.AddRange(Parameters.ToArray());
            return cmd;
        }

        public TResult? Exec(OnResult onResult)
        {
            TResult? result = default;

            MySqlDataBase.TransactionBlock(Db, () =>
            {
                using var cmd = CreateCommand();
                result = onResult(cmd);
            },
                (ex, msg) => OnException?.Invoke(ex, msg),
                OnProcess
            );

            return result;
        }
    }
}