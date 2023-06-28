using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataService.MySQL
{
    public class MySQLCtx : DbContext
    {
        public string ConnectionString { get; set; }

        public MySQLCtx(string connectionString) => ConnectionString = connectionString;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            try
            {
                optionsBuilder.UseMySQL(ConnectionString);
            } catch
            {

            }
        }
    }
}