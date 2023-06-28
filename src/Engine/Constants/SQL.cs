using System;

namespace Engine.Constants {
    public class SQL 
    {    
        public const string IVENTORY_UTT = "INVENTORY_UTT";

        #region SP
        public const string ADD_AUDIT_COLUMNS = "ADD_AUDIT_COLUMNS";
        public const string SET_ASSET = "SET_ASSET";
        public const string SET_INVENTORY = "SET_INVENTORY";
        public const string SET_LOAN = "SET_LOAN";
        public const string SET_LOAN_DTL = "SET_LOAN_DTL";
        public const string SET_LOAN_LOCATION = "SET_LOAN_LOCATION";
        public const string SET_LOAN_MODE = "SET_LOAN_MODE";
        public const string SET_USER = "SET_USER";
        public const string SET_USER_CONTACT = "SET_USER_CONTACT";

        public const string GET_ASSET_GROUP = "GET_ASSET_GROUP";
        public const string GET_INVENTORY = "GET_INVENTORY";
        public const string GET_LOAN = "GET_LOAN";
        public const string GET_LOAN_DTL = "GET_LOAN_DTL";
        public const string GET_USER = "GET_USER";
        #endregion

        #region FUNCIONS
        public const string AUTH_USER = "AUTH_USER";
        #endregion
    }
}