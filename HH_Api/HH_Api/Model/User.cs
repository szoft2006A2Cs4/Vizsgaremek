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
        public required string Name { get; set; }

        [Column("email")]
        public string? Email { get; set; }

        [Column("pnumber")]
        public long PhoneNumber { get; set; }

        [Column("password")]
        public string? Password { get; set; }

        [Column("review")]
        public float Review { get; set; }

        [Column("postalcode")]
        public int PostalCode { get; set; }

        [Column("city")]
        public string? City { get; set; }

        [Column("streetHnum")]
        public string? StreetHouseNumber { get; set; }
        
        [Column("role")]
        public string? Role { get; set; }
        
        [Column("token")]
        public string? Token { get; set; }
    }
}
