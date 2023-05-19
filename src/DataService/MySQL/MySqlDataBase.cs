using System;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace DataService.MySQL
{
    public class MySqlDataBase : IDisposable
    {
        // Delegates
        public delegate void DataException(Exception e, string msg = "");
        public delegate void ReaderAction(IDataReader reader);

        // Properties
        public MySqlConnection Connection { get; }
        private string? ConnectionString { get; set; }

        // Constructor
        public MySqlDataBase(string? connString)
        {
            ConnectionString = connString;
            Connection = new(ConnectionString);
            Connection.StateChange += OnStateChange;
        }

        public void OpenConnection()
        {
            if (Connection != null && Connection.State != ConnectionState.Open)
            {
                Connection.Open();
            }
        }

        public void CloseConnection()
        {
            if (Connection != null && Connection.State == ConnectionState.Open)
            {
                Connection.Close();
            }
        }

        public void Dispose()
        {
            Connection.Dispose();
        }

        public MySqlCommand CreateCommand(string cmdText, CommandType type) 
            => CreateCommand(cmdText, Connection, type);

        private void OnStateChange(object obj, StateChangeEventArgs args)
        {
            if (args.CurrentState == ConnectionState.Closed)
            {
                // Connection Closed Event handling
            }
        }

        #region Static Methods
        public static MySqlCommand CreateCommand(string cmdText, MySqlConnection conn, CommandType type) => new (cmdText, conn)
        {
            CommandType = type
        };

        public static IDataParameter CreateParameter(string name, object? value, MySqlDbType type, bool isNullable = true) => new MySqlParameter(name, value)
        {
            Direction = ParameterDirection.Input,
            MySqlDbType = type,
            IsNullable = isNullable
        };

        public static IDataParameter CreateParameterOut(string name, MySqlDbType type) => new MySqlParameter()
        {
            ParameterName = name,
            Direction = ParameterDirection.Output,
            MySqlDbType = type
        };

        public static void ReaderBlock(MySqlCommand cmd, ReaderAction action)
        {
            using var reader = cmd.ExecuteReader();
            action(reader);
            reader.Close();
        }

        public static void NonQueryBlock(MySqlCommand cmd, Action action)
        {
            cmd.ExecuteNonQuery();
            action();
        }

        public static void TransactionBlock(
            MySqlDataBase db,
            Action run,
            DataException onException,
            Action? onProcess = null
        )
        {
            MySqlConnection conn = db.Connection;
            bool isTxnSuccess;

            try
            {
                db.OpenConnection();
                run();
                isTxnSuccess = true;
            }
            catch (Exception e)
            {
                onException(e, e.Message);
                isTxnSuccess = false;
            }

            if (isTxnSuccess)
                onProcess?.Invoke();

            db.Dispose();
            db.CloseConnection();
        }
        #endregion
    }
}