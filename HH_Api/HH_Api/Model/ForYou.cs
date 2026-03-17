using HH_Api.DTOs;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HH_Api.Model
{
    [Table("foryou")]
    public class ForYou
    {
        [Column("fid")]
        public int Id { get; set; }

        [Column("uid")]
        public int UId { get; set; }

        [ForeignKey(nameof(UId))]
        public User? User { get; set; }


        [Column("cname")]
        public string? CName { get; set; }

        [ForeignKey(nameof(CName))]
        public Category? Category { get; set; }

    }
}
