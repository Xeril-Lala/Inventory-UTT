using Engine.BO;
using Engine.BO.Classes;
using NLog.Config;
using Org.BouncyCastle.Asn1.X509;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test
{
    public static class DataSets
    {
        public static User GetUser() => new()
        {
            Username = "DBA",
            Name = "User",
            Lastname = "Dóe",
            Password = "8udw153r_",
            Status = Status.ENABLED,
            TxnUser = "DBA"
        };

        public static UserContact GetContact() => new () 
        {
            User = GetUser(),
            Address = "Fake Address",
            ID = "0319125293",
            AlternativeID = "0001",
            Email = "email@mail.com",
            Phone = "6631226015",
            Status = Status.ENABLED,
            TxnUser = "DBA"
        };

        public static Asset GetBrand() => new()
        {
            Code = "BR1",
            Desc1 = "Brand - Description",
            Key1 = "BRAND",
            Value = "Brand TEST",
            Status = Status.ENABLED,
            TxnUser = "DBA"
        };

        public static Asset GetModel() => new () 
        {
            Code = "MD1",
            Desc1 = "Model - Description",
            Key1 = "MODEL",
            Key2 = GetBrand().Code,
            Value = "Model - TEST1",
            Status = Status.ENABLED,
            TxnUser = "DBA"
        };

        public static Item GetItem() => new ()
        {
            Id = null,
            CustomId = "0001-XXXX-AB",
            Serial = "0001-XMSL-ZZZ1",
            Name = "Iventory",
            Condition = "Condition - USE1",
            Acquisition = DateTime.Now.AddDays(-1),
            Description = "Description 1",
            Model = new Asset(),
            TxnUser = "DBA",
            Status = Status.ENABLED,
        };
    }
}
