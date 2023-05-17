using Engine.BO;
using Engine.DAL.Routines;
using Engine.Interfaces;
using Engine.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Engine.DAL
{
    public class InventoryDAL : BaseDAL
    {
        private static InventoryDAL _instance = new ();
        private static ConnectionString? _ConnectionString => ConnectionString.FindConnection("test");

        public static InventoryDAL Instance = _instance;

        private InventoryDAL() : base(_ConnectionString)
        {
            if (_instance == null)
            {
                AddSP(new SetUser(this, OnDALError, null));
                _instance = this;
            }
        }

        public Result? SetUser(User user)
        {
            Result? result = null;
            SetUser? sp = GetSP<SetUser, Result>();

            if (sp != null)
            {
                sp.EntryData = user;
                sp.Run();
                result = sp.GetOutput();
            }

            return result;
        }

    }
}
