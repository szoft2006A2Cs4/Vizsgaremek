using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace HH_Api.Model
{
    [Table("subcategory")]
    public class Subcategory
    {
        [Key]
        [Column("scname")]
        public required string Name { get; set; }

        [Column("cname")]
        public string? CName { get; set; }


        [ForeignKey(nameof(CName))]
        public Category? Category { get; set; }
    }
}
