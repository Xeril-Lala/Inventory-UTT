using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataService.MySQL;
using Engine.Constants;
using Engine.Interfaces;
using MySql.Data.MySqlClient;
using D = Engine.BL.Delegates;
using MDB = DataService.MySQL.MySqlDataBase;
using MType = MySql.Data.MySqlClient.MySqlDbType;

namespace Engine.DAL
{
    public abstract class StoredProcedure<TResult> : IEntrySP
    {
        public BaseDAL? DAL { get; private set; }
        public Routine<TResult>? Routine { get; private set; }

        private D.CallbackExceptionMsg? OnException { get; set; }
        private Action? OnProcess { get; set; }
        protected TResult? _Result { get; private set; }

        public StoredProcedure(BaseDAL dal)
        {
            DAL = dal;
            Routine = InitRoutine();
        }

        public StoredProcedure(BaseDAL? dal, D.CallbackExceptionMsg? onException, Action? onProcess = null)
        {
            DAL = dal;
            Routine = InitRoutine();
            OnException = onException;
            OnProcess = onProcess;
        }

        public void Subscription(BaseDAL dal) => DAL = dal;

        public void Run() => _Result = Execute();

        private TResult? Execute() 
        {
            if (Routine != null)
            {
                Routine.Parameters = GetParameters();
                return Routine.Exec(OnResult);
            } else
            {
                return default;
            }
        }

        private Routine<TResult>? InitRoutine()
        {
            Routine<TResult>? routine = null;

            try
            {
                if (DAL != null)
                {
                    routine = OnException != null
                        ? new Routine<TResult>(DAL, GetSPName(), OnException, OnProcess)
                        : new Routine<TResult>(DAL, GetSPName());
                }
            }
            catch (Exception ex)
            {
                OnException?.Invoke(ex, "Error initializing routine");
            }

            return routine;
        }

        protected abstract TResult OnResult(MySqlCommand cmd);
        protected abstract List<IDataParameter> GetParameters();
        protected abstract string GetSPName();
    }
}