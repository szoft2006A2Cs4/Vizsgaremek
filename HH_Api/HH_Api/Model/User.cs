using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HH_Api.Model
{
    [Table("user")]
    public class User
    {
        [Column("uid")]
        public int Id { get; set; }

        [Column("uname")]
        public int Name { get; set; }

        [Column("email")]
        public int Email { get; set; }

        [Column("pnumber")]
        public int PhoneNumber { get; set; }

        [Column("password")]
        public int Password { get; set; }

        [Column("review")]
        public int Review { get; set; }

        [Column("postalcode")]
        public int PostalCode { get; set; }

        [Column("city")]
        public int City { get; set; }

        [Column("streetHnum")]
        public int StreetHouseNumber { get; set; }
    }
}
