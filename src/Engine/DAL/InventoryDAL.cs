using Engine.BO;
using Engine.BO.Classes;
using Engine.DAL.Routines;
using Engine.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using D = Engine.BL.Delegates;

namespace Engine.DAL
{
    public class InventoryDAL : BaseDAL
    {
        protected static ConnectionString? _tempConnectionString { get; set; } = null;
        private static ConnectionString? _ConnectionString => ConnectionString.Instance;
        
        public static InventoryDAL GetInstance(D.CallbackExceptionMsg? onError)
        {
            var instance = new InventoryDAL();

            if ( _tempConnectionString != _ConnectionString)
            {
                _tempConnectionString = ConnectionString.Instance;
                _tempConnectionString = _ConnectionString;
            }

            if(onError != null)
                instance.OnError = onError;

            return instance;
        }

        private InventoryDAL() : base(_ConnectionString)
        {
            AddSP(new SetUser(this, OnError));
            AddSP(new SetUserContact(this, OnError));
            AddSP(new SetAsset(this, OnError));
            AddSP(new SetLoan(this, OnError));
            AddSP(new SetLoanDtl(this, OnError));
            AddSP(new SetLoanMode(this, OnError));
            AddSP(new SetInventory(this, OnError));
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

        public Result? SetItem(Item item) 
            => RunSP(GetSP<SetInventory>(), item);
    }
}
