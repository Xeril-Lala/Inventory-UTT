using Engine.BO;
using Engine.BO.Classes;
using NLog.Config;
using Org.BouncyCastle.Asn1.X509;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace Test
{
    public static class DataSets
    {
        public static User GetUser() => new()
        {
            Username = "Test",
            Name = "User",
            Lastname = "Dóe",
            Password = "176c1e698b521373d77ce655d2e56a1d816f644edb4cca2777dca9c0e6e50c7e",
            Group = new Asset() {
                Code = "DEV"
            },
            Status = Status.DISABLED,
            TxnUser = TestUtils.GetTestingUser()
        };

        public static UserContact GetContact() => new () 
        {
            User = GetUser(),
            Address = "Fake Address",
            ID = "0319125293",
            AlternativeID = "0001",
            Email = "email@mail.com",
            Phone = "6631226015",
            Status = Status.DISABLED,
            TxnUser = TestUtils.GetTestingUser(),
        };

        public static Asset GetBrand() => new()
        {
            Code = "BR1",
            Desc1 = "Brand - Description",
            Key1 = "BRAND",
            Value = "Brand TEST",
            Status = Status.DISABLED,
            TxnUser = TestUtils.GetTestingUser(),
        };

        public static Asset GetModel() => new () 
        {
            Code = "MD1",
            Desc1 = "Model - Description",
            Key1 = "MODEL",
            Key2 = GetBrand().Code,
            Value = "Model - TEST1",
            Status = Status.DISABLED,
            TxnUser = TestUtils.GetTestingUser(),
        };

        public static Item GetItem() => new ()
        {
            Id = 100,
            CustomId = "0001-XXXX-AB",
            Serial = "0001-XMSL-ZZZ1",
            Name = "Inventory",
            Condition = "Condition - USE1",
            Acquisition = DateTime.Now.AddDays(-1),
            Description = "Description 1",
            Model = GetModel(),
            Location = GetLocation(),
            TxnUser = TestUtils.GetTestingUser(),
            Status = Status.DISABLED,
        };

        public static LoanMode GetLoanMode() => new() 
        { 
            Code = "CODE-TEST",
            Duration = 24,
            Unit = "HH",
            Status = Status.ENABLED,
            TxnUser = TestUtils.GetTestingUser(),
        };

        public static Loan GetLoan() => new ()
        {
            Id = 100,
            Mode = GetLoanMode(),
            Comments = "Comments - Test",
            LoanDt = DateTime.Now,
            Responsible = "User Dev",
            ResponsibleId = "0001",
            ResponsibleContact = "fake@mail.com",
            ResponsibleContact2 = "80000000",
            ReturnDt = null,
            LoanStatus = "STARTED",
            Status = Status.DISABLED,
            TxnUser = TestUtils.GetTestingUser(),
        };

        public static LoanDtl GetLoanDtl() => new() 
        {
            Id = 100,
            Description = "Description - Detail 1",
            DetailStatus = "LOANED",
            Item = GetItem(),
            Loan = GetLoan(),
            Status = Status.DISABLED,
            TxnUser = TestUtils.GetTestingUser(),
        };

        public static Asset GetLocation() => new()
        {
            Code = "LOC1",
            Key1 = "LOCATION",
            Value = "Test Location",
            Status = Status.DISABLED,
            TxnUser = TestUtils.GetTestingUser(),
            Desc1 = "TEST - LOCATION"
        };

        public static LoanLocation GetLoanLocation() => new ()
        {
            Loan = GetLoan(),
            Location = GetLocation(),
            Description = "Creating a Demo location",
            Status = Status.DISABLED,
            TxnUser = TestUtils.GetTestingUser(),
        };
    }
}
