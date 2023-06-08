using Engine.BO;
using Engine.Constants;
using System.Data;
using MySql.Data.MySqlClient;
using BDAL = Engine.DAL.BaseDAL;
using D = Engine.BL.Delegates;
using MDB = DataService.MySQL.MySqlDataBase;
using MType = MySql.Data.MySqlClient.MySqlDbType;
using V = Engine.BO.Validate;

namespace Engine.DAL.Routines
{
    public class GetAssetGroup : StoredProcedure<dynamic, List<Asset>>
    {
        private IDataParameter OutParameter = MDB.CreateParameterOut("OUT_MSG", MType.String);

        public GetAssetGroup(
            BDAL dal,
            D.CallbackExceptionMsg? onException,
            Action? onProcess = null
        ) : base(dal, onException, onProcess)
        { }

        protected override string GetSPName() => SQL.GET_ASSET_GROUP;

        protected override List<IDataParameter> GetParameters()
        {
            return new() {
                BDAL.CreateParameter("IN_CHILD_CODE", EntryData?.ChildCode, MType.String),
                BDAL.CreateParameter("IN_PARENT_GROUP", EntryData?.ParentGroup, MType.String),
                BDAL.CreateParameter("IN_PARENT_SGROUP", EntryData?.ParentSubGroup, MType.String),
                BDAL.CreateParameter("IN_PARENT_AGROUP", EntryData?.ParentAltGroup, MType.String),
                BDAL.CreateParameter("IN_CHILD_GROUP", EntryData?.ChildGroup, MType.String),
                BDAL.CreateParameter("IN_CHILD_AGROUP", EntryData?.ChildAltGroup, MType.String),
                BDAL.CreateParameter("IN_STATUS", EntryData?.Status, MType.Bit),
                OutParameter
            };
        }

        protected override List<Asset> OnResult(MySqlCommand cmd)
        => DAL.ReaderPopulationBlock(cmd, OutParameter, GetSPName(), rdr => 
            new Asset()
            {
                Code = V.Instance.getDefaultStringIfDBNull(rdr["CHILD_CODE"]),
                Value = V.Instance.getDefaultStringIfDBNull(rdr["CHILD_VALUE"]),
                Key1 = V.Instance.getDefaultStringIfDBNull(rdr["CHILD_GROUP"]),
                Key2 = V.Instance.getDefaultStringIfDBNull(rdr["PARENT_GROUP"]),
                Key3 = V.Instance.getDefaultStringIfDBNull(rdr["CHILD_AGROUP"]),
                Desc1 = V.Instance.getDefaultStringIfDBNull(rdr["CHILD_DESC"])
            }
        );
        

        public static object CreateObject(
            string? childCode = null,
            string? parentGroup = null,
            string? parentSubGroup = null,
            string? parentAltGroup = null,
            string? childGroup = null,
            string? childAltGroup = null,
            bool? status = null
        ) => new { 
            ChildCode = childCode,
            ParentGroup = parentGroup,
            ParentSubGroup = parentSubGroup,
            ParentAltGroup = parentAltGroup,
            ChildGroup = childGroup,
            ChildAltGroup = childAltGroup,
            Status = status
        };
    }
}