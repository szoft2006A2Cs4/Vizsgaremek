using System.ComponentModel.DataAnnotations.Schema;

namespace HH_Api.Model
{
    [Table("instrument")]
    public class Instrument
    {
        [Column("iid")]
        public int Id { get; set; }

        [Column("iname")]
        public string? Name { get; set; }

        [Column("cost")]
        public int Cost { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("sold")]
        public bool Sold { get; set; }

        [Column("uid")]
        public int UId { get; set; }

        [Column("scname")]
        public string? SCName { get; set; }


        [ForeignKey(nameof(UId))]
        public User? Seller { get; set; }

        [ForeignKey(nameof(SCName))]
        public Subcategory? SubCategory { get; set; }
    }
}
