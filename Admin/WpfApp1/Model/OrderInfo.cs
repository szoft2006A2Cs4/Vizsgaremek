using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WpfApp1.Model
{
    public class OrderInfo
    {
        public int Id { get; set; }
        public DateTime DateOfPurchase { get; set; }
        public string DeliveryCity {  get; set; }
        public string DeliveryStreet {  get; set; }
        public int DeliveryPC { get; set; }
        public int SId { get; set; }
        public int CId { get; set; }
        public int IId { get; set; }

        public override string ToString()
        {
            return $"{Id}";
        }

    }
}
