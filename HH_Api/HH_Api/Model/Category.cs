using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HH_Api.Model
{
    [Table("category")]
    public class Category
    {
        [Key]
        [Column("cname")]
        public required string Name { get; set; }
    }
}
