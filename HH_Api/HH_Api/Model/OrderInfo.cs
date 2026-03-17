using HH_Api.DTOs;
using System.ComponentModel.DataAnnotations.Schema;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace HH_Api.Model
{
    [Table("orderinfo")]
    public class OrderInfo
    {
        [Column("oid")]
        public int Id { get; set; }

        [Column("status")]
        public string? status { get; set; }

        [Column("dateOfPurchase")]
        public DateTime DateOfPurchase { get; set; }

        [Column("dateOfShipArrive")]
        public DateTime DateOfShipArrive { get; set; }

        [Column("dateOfShipStart")]
        public DateTime DateOfShipStart { get; set; }

        [Column("cid")]
        public int CId { get; set; }

        [ForeignKey(nameof(CId))]
        public UserDTO? Customer { get; set; }

        [Column("iid")]
        public int IId { get; set; }

        [ForeignKey(nameof(IId))]
        public InstrumentDTO? Instrument { get; set; }
    }
}
