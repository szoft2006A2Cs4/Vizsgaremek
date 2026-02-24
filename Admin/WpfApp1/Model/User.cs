using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WpfApp1.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Phone { get; set; }
        public string Password { get; set; }
        public float Review { get; set; }
        public int PostalCode { get; set; }
        public string City { get; set; }
        public string streetHnum { get; set; }

        public override string ToString()
        {
            return $"{Name}";
        }
    }
}
