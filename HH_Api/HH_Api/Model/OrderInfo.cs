using System.ComponentModel.DataAnnotations.Schema;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace HH_Api.Model
{
    [Table("orderinfo")]
    public class OrderInfo
    {
        [Column("oid")]
        public int Id { get; set; }

        [Column("dateOfPurchase")]
        public DateTime DateOfPurchase { get; set; }

        [Column("deliveryCity")]
        public string? DeliveryCity { get; set; }

        [Column("deliveryStreet")]
        public string? DeliveryStreet { get; set; }

        [Column("deliveryPC")]
        public int DeliveryPC { get; set; }

        [Column("iid")]
        public int IId { get; set; }



        [ForeignKey(nameof(IId))]
        public Instrument? Instrument { get; set; }
    }
}
