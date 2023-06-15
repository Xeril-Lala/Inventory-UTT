using Engine.BO;
using Engine.BO.Classes;
using Engine.Constants;
using Engine.DAL.Routines;
using Engine.Services;
using System.Linq;
using D = Engine.BL.Delegates;
using V = Engine.BO.Validate;

namespace Engine.DAL
{
    public class InventoryDAL : BaseDAL
    {
        protected static ConnectionString? _tempConnectionString { get; set; } = null;
        private static ConnectionString? _ConnectionString => ConnectionString.Instance;
        
        public static InventoryDAL GetInstance(D.CallbackExceptionMsg? onError)
        {
            var instance = new InventoryDAL(onError);

            if ( _tempConnectionString != _ConnectionString)
            {
                _tempConnectionString = ConnectionString.Instance;
                _tempConnectionString = _ConnectionString;
            }

            return instance;
        }

        private InventoryDAL(D.CallbackExceptionMsg? onError = null) : base(_ConnectionString)
        {
            if (onError != null)
                OnError = onError;

            AddSP(new SetUser(this, OnError));
            AddSP(new SetUserContact(this, OnError));
            AddSP(new SetAsset(this, OnError));
            AddSP(new SetLoan(this, OnError));
            AddSP(new SetLoanDtl(this, OnError));
            AddSP(new SetLoanMode(this, OnError));
            AddSP(new SetLoanLocation(this, OnError));
            AddSP(new SetInventory(this, OnError));
            AddSP(new GetAssetGroup(this, OnError));
            AddSP(new GetInventory(this, OnError));
            AddSP(new GetLoan(this, OnError));
            AddSP(new GetLoanDtl(this, OnError));
            AddSP(new GetUser(this, OnError));
        }

        public Result? SetUser(User user) 
            => RunSP(GetSP<SetUser>(), user);

        public Result? SetUserContact(UserContact contact) 
            => RunSP(GetSP<SetUserContact>(), contact);

        public Result? SetAsset(Asset asset) 
            => RunSP(GetSP<SetAsset>(), asset);

        public Result? SetLoan(Loan loan) 
            => RunSP(GetSP<SetLoan>(), loan);

        public Result? SetLoanDtl(LoanDtl detail)
            => RunSP(GetSP<SetLoanDtl>(), detail);

        public Result? SetLoanMode(LoanMode mode)
            => RunSP(GetSP<SetLoanMode>(), mode);

        public Result? SetLoanLocation(LoanLocation mode)
            => RunSP(GetSP<SetLoanLocation>(), mode);

        public Result? SetItem(Item item) 
            => RunSP(GetSP<SetInventory>(), item);

        public List<Asset>? GetAssets(
            string? childCode = null,
            string? parentGroup = null,
            string? parentSubGroup = null,
            string? parentAltGroup = null,
            string? childGroup = null,
            string? childAltGroup = null,
            bool? status = null
        )
        {
            var entryData = GetAssetGroup.CreateObject(
                childCode,
                parentGroup,
                parentSubGroup,
                parentAltGroup,
                childGroup,
                childAltGroup,
                status
            );
            
            return RunSP(GetSP<GetAssetGroup>(), entryData);
        }

        public List<Item>? GetItems(
            int? id = null,
            string? customId = null,
            string? serial = null,
            string? name = null,
            string? model = null,
            DateTime? fromDt = null,
            DateTime? toDt = null,
            bool? status = null
        )
        {
            var entryData = GetInventory.CreateObject(
                id,
                customId,
                serial,
                name,
                model,
                fromDt,
                toDt,
                status
            );

            return RunSP(GetSP<GetInventory>(), entryData);
        }

        public List<Loan>? GetLoans(
            int? id = null,
            DateTime? fromDt = null,
            DateTime? toDt = null,
            string? comments = null,
            string? mode = null,
            bool? status = null
        )
        {
            var entryData = GetLoan.CreateObject(
                id,
                fromDt,
                toDt,
                comments,
                mode,
                status
            );

            return RunSP(GetSP<GetLoan>(), entryData);
        }

        public List<LoanDtl>? GetLoanDtls(
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
        )
        {
            var entryData = GetLoanDtl.CreateObject(
                id,
                fromDt,
                toDt,
                loanId,
                dtlDescription,
                dtlStatus,
                comments,
                loanMode,
                loanStatus,
                inventoryId,
                customId,
                serial,
                model,
                brand,
                status
            );

            return RunSP(GetSP<GetLoanDtl>(), entryData);
        }

        public List<User>? GetUsers(
            string? username = null,
            string? search = null,
            bool? status = null
        )
        {
            var entryData = GetUser.CreateObject(
                username,
                search,
                status
            );

            return RunSP(GetSP<GetUser>(), entryData);
        }

        public Result AuthUser(string? username, string? password)
        {
            Result result = new() { Status = C.NO_CALLBACK, Message = C.PENDING, Data = C.NOT_AUTH};

            TransactionBlock(this, () => {
                using var cmd = CreateCommand(
                    @$"SELECT IF({SQL.AUTH_USER}('{username}', '{password}'),'{C.OK}','{C.NOT_AUTH}')", 
                    System.Data.CommandType.Text
                );

                var oResult = cmd.ExecuteScalar();

                if (oResult != null)
                {
                    string? sResult = oResult.ToString();

                    result.Status = sResult ?? C.NOT_AUTH;
                    result.Data = sResult;
                    result.Message = C.COMPLETE;
                }

            }, (ex, msg) => OnError?.Invoke(ex, msg));

            return result;
        }

        public List<Asset> GetAllAssets(
            string? code = null,
            string? group = null,
            string? subGroup = null,
            string? altGroup = null,
            string? desc = null,
            bool? status = null
        )
        {
            var model = new List<Asset>();

            TransactionBlock(this, () => {
                var cmd = CreateCommand("SELECT * FROM ASSET", System.Data.CommandType.Text);

                model = ReaderPopulationBlock<Asset>(cmd, null, "GetAllAssets", rdr 
                => new() {
                    Code = V.Instance.getDefaultStringIfDBNull(rdr["ASSET_CODE"]),
                    Value = V.Instance.getDefaultStringIfDBNull(rdr["VALUE"]),
                    Key1 = V.Instance.getDefaultStringIfDBNull(rdr["KEY1"]),
                    Key2 = V.Instance.getDefaultStringIfDBNull(rdr["KEY2"]),
                    Key3 = V.Instance.getDefaultStringIfDBNull(rdr["KEY3"]),
                    Desc1 = V.Instance.getDefaultStringIfDBNull(rdr["DESC1"]),
                    Desc2 = V.Instance.getDefaultStringIfDBNull(rdr["DESC2"]),
                    Desc3 = V.Instance.getDefaultStringIfDBNull(rdr["DESC3"]),
                    Data = V.Instance.getDefaultBytesIfDBNull(rdr["BIN"])
                });

            }, (ex, msg) => OnError?.Invoke(ex, msg));

            return model.Where(x
                => (code == null        || x.Code?.Contains(code) == true)
                && (group == null       || x.Key1?.Contains(group) == true)
                && (subGroup == null    || x.Key2?.Contains(subGroup) == true)
                && (altGroup == null    || x.Key3?.Contains(altGroup) == true)
                && (desc == null        || x.Desc1?.Contains(desc) == true)
                && (desc == null        || x.Desc2?.Contains(desc) == true)
                && (desc == null        || x.Desc3?.Contains(desc) == true)
                && (status == null      || x.IsEnabled))
            .ToList();
        }

    }
}
