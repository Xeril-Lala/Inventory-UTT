using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataService.MySQL;
using Engine.BO.Classes;
using Engine.Constants;
using Engine.Interfaces;
using MySql.Data.MySqlClient;
using D = Engine.BL.Delegates;

namespace Engine.DAL
{
    public abstract class StoredProcedure<TInput, TOutput> : IServiceSP<TInput, TOutput>, IEntrySP
    {
        public BaseDAL? DAL { get; private set; }
        public TInput? EntryData { get; set; }

        private D.CallbackExceptionMsg? OnException { get; set; }
        private Action? OnProcess { get; set; }
        protected Routine<TOutput>? Routine { get; set; }
        protected TOutput? _Result { get; private set; }

        public StoredProcedure(BaseDAL dal)
        {
            EntryData = default;
            DAL = dal;
            Routine = InitRoutine();
        }

        public StoredProcedure(BaseDAL? dal, D.CallbackExceptionMsg? onException, Action? onProcess = null)
        {
            EntryData = default;
            DAL = dal;
            OnException = onException;
            OnProcess = onProcess;
            Routine = InitRoutine();
        }

        public TOutput? GetOutput() => _Result;

        public void Subscription(BaseDAL dal) => DAL = dal;

        public void Run() => _Result = Execute();

        private TOutput? Execute() 
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

        private Routine<TOutput>? InitRoutine()
        {
            Routine<TOutput>? routine = null;

            try
            {
                if (DAL != null)
                {
                    routine = OnException != null
                        ? new Routine<TOutput>(DAL, GetSPName(), OnException, OnProcess)
                        : new Routine<TOutput>(DAL, GetSPName());
                }
            }
            catch (Exception ex)
            {
                OnException?.Invoke(ex, "Error initializing routine");
            }

            return routine;
        }

        protected abstract TOutput OnResult(MySqlCommand cmd);
        protected abstract List<IDataParameter> GetParameters();
        protected abstract string GetSPName();
    }
}