using System.ComponentModel.DataAnnotations.Schema;

namespace HH_Api.Model
{
    [Table("category")]
    public class Category
    {
        [Column("cname")]
        public required string Name { get; set; }
    }
}
