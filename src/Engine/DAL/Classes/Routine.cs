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
    public class Routine<TResult>
    {
        public delegate TResult OnResult(MySqlCommand cmd);

        private MySqlDataBase Db { get; set; }
        private string CommandName { get; set; }
        private D.CallbackExceptionMsg? OnException { get; set; }
        private Action? OnProcess { get; set; }
        public List<IDataParameter> Parameters { get; set; } = new List<IDataParameter>();

        public Routine(MySqlDataBase db, string cmdName)
        {
            Db = db;
            CommandName = cmdName;
        }

        public Routine(
            MySqlDataBase db,
            string cmdName,
            D.CallbackExceptionMsg onException,
            Action? onProcess = null
        )
        {
            Db = db;
            CommandName = cmdName;
            OnException = onException;
            OnProcess = onProcess;
        }

        private MySqlCommand CreateCommand()
        {
            MySqlCommand cmd = Db.CreateCommand(CommandName, CommandType.StoredProcedure);
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