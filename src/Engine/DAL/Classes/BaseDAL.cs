using System.Data;
using System.Security.Cryptography;
using DataService.MySQL;
using Engine.BO;
using Engine.Constants;
using Engine.Interfaces;
using MySql.Data.MySqlClient;
using D = Engine.BL.Delegates;

namespace Engine.DAL
{
    public abstract class BaseDAL : MySqlDataBase
    {
        protected D.CallbackExceptionMsg? OnError { get; set; }
        protected List<IEntrySP> Routines { get; }
        protected IConnectionString? ConnString { get; set; }

        protected BaseDAL(IConnectionString? conn) : base(conn?.ConnectionString) 
        { 
            ConnString = conn;
            Routines = new List<IEntrySP>();
        }

        protected void AddSP(IEntrySP sp)
        {
            Routines.Add(sp);
            sp.Subscription(this);
        }

        protected T? GetSP<T>()
        {
            T? sp = default;

            try
            {
                foreach (var r in Routines)
                {
                    if (r.GetType() == typeof(T))
                    {
                        return (T)r;
                    }
                }
            }
            catch
            {
                sp = default;
            }

            return sp;
        }

        protected int GetLastId()
        {
            int id = 0;
            TransactionBlock(this, () =>
            {
                using var cmd = CreateCommand("SELECT LAST_INSERT_ID()", CommandType.Text);
                var result = cmd.ExecuteScalar().ToString();

                if (result != null)
                {
                    id = int.Parse(result);
                }

            }, (ex, msg) => SetExceptionResult($"{GetType()}.GetLastId()", msg, ex));

            return id;
        }

        public List<T> ReaderPopulationBlock<T>(MySqlCommand cmd, IDataParameter? outParam, string routineName, Func<IDataReader, T> onRow) where T : BaseBO
        {
            List<T> values = new();

            ReaderBlock(cmd, rdr => {

                while (rdr.Read())
                {
                    var model = onRow(rdr);
                    SetAuditoryValues(model, rdr);
                    values.Add(model);
                }

            });

            if(outParam != null)
            {
                GetResult(outParam, routineName, out Result oResult);
                if (oResult.Status != C.OK)
                    OnError?.Invoke(new Exception($"Could not get result from Reader Routine {routineName}"), oResult.Message);
            }

            return values;
        }

        public static TOutput? RunSP<TInput, TOutput>(StoredProcedure<TInput, TOutput>? sp, TInput input)
        {
            TOutput? result = default;

            if (sp != null)
            {
                sp.EntryData = input;
                sp.Run();
                result = sp.GetOutput();
            }

            return result;
        }

        public static void GetResult(IDataParameter pResult, string routineName, out Result result)
        {
            result = new Result();
            try
            {
                var res = pResult.Value?.ToString();
                if (string.IsNullOrEmpty(res))
                {
                    result.Status = C.ERROR;
                    result.Message = $"Routine {routineName} did not return response value";
                }
                else if (res != C.OK)
                {
                    result.Status = C.ERROR;
                    result.Message = res;
                    throw new ArgumentException($"Error From Internal Routine -> Says: {result.Message}");
                }
                else
                {
                    result.Status = res;
                    result.Message = C.COMPLETE;
                }
            }
            catch (Exception ex)
            {
                result.Status = C.ERROR;
                result.Message = ex.Message;
            }
        }

        public static Result FetchResult(MySqlCommand cmd, IDataParameter outParam, string sp, Action<Result>? onAction = null)
        {
            Result result = new();

            NonQueryBlock(
                cmd,
                () => {
                    GetResult(outParam, sp, out result);
                    onAction?.Invoke(result);
                }
            );
            cmd.Dispose();

            return result;
        }

        public static void SetAuditoryValues(BaseBO bo, IDataReader reader)
        {
            bo.CreatedBy = Validate.Instance.getDefaultStringIfDBNull(reader["CREATED_BY"]);
            bo.CreatedOn = Validate.Instance.getDefaultDateIfDBNull(reader["CREATED_ON"]);
            bo.UpdatedBy = Validate.Instance.getDefaultStringIfDBNull(reader["UPDATED_BY"]);
            bo.UpdatedOn = Validate.Instance.getDefaultDateIfDBNull(reader["UPDATED_ON"]);
            bo.Status = ReadStatus(reader);
        }

        public static Status ReadStatus(IDataReader reader)
        {
            var status = Validate.Instance.getDefaultStringIfDBNull(reader["STATUS"]);

            if (!Enum.TryParse(status, out Status eStatus))
                return Status.DISABLED;

            return eStatus;
        }

        protected void SetExceptionResult(string actionName, string msg, Exception ex, Result? result = null)
            => OnError?.Invoke(ex, $"Exception ({actionName}) - {msg}{(result != null ? " " + result.ToString() : string.Empty)}");
    }
}