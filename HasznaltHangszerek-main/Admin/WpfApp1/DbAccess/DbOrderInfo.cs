using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using WpfApp1.Model;

namespace WpfApp1.DbAccess
{
    public class DbOrderInfo : DbAccessor<OrderInfo>
    {

        protected DbConnection _conn;
        public DbOrderInfo(DbConnection conn) : base(conn)
        {
            _conn = conn;
        }

        public override void Create(OrderInfo order)
        {
            using (var cmd = _conn.CreateCommand())
            {
                cmd.CommandText = $"INSERT INTO orderinfo (dateOfPurchase, deliveryCity, deliveryStreet, deliveryPC, sid, cid, iid)" +
                                  $"VALUES ({DateTime.Now: 00:00 0000:00:00}, {order.DeliveryCity}, {order.DeliveryStreet}, {order.DeliveryCity}, {order.SId}, {order.CId}, {order.IId});";
                if (cmd.ExecuteNonQuery() == 1) { MessageBox.Show("Sikeres Rendelés"); }
            }
        }

        public override OrderInfo? Read(int id)
        {
            OrderInfo? order = new OrderInfo();
            using (var cmd = _conn.CreateCommand())
            {
                cmd.CommandText = $"SELECT * FROM orderinfo WHERE uid={id};";
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        order = new OrderInfo
                        {
                            Id = id,
                            DateOfPurchase = reader.GetDateTime(1),
                            DeliveryCity = reader.GetString(2),
                            DeliveryStreet = reader.GetString(3),
                            DeliveryPC = reader.GetInt32(4),
                            SId = reader.GetInt32(5),
                            CId = reader.GetInt32(6),
                            IId = reader.GetInt32(7)
                        };
                    }
                }
            }

            return order;
        }

        public override IEnumerable<OrderInfo> ReadAll()
        {
            List<OrderInfo> result = new List<OrderInfo>();
            using (var cmd = _conn.CreateCommand())
            {
                cmd.CommandText = "SELECT * FROM orderinfo;";
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(new OrderInfo
                        {
                            Id = reader.GetInt32(0),
                            DateOfPurchase = reader.GetDateTime(1),
                            DeliveryCity = reader.GetString(2),
                            DeliveryStreet = reader.GetString(3),
                            DeliveryPC = reader.GetInt32(4),
                            SId = reader.GetInt32(5),
                            CId = reader.GetInt32(6),
                            IId = reader.GetInt32(7)
                        });
                    }
                }
            }
            return result;
        }

        public override void Update(int id, OrderInfo user)
        {
            throw new NotImplementedException();
        }

        public override bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Dictionary<string, int> StatisticsByMonth()
        {
            Dictionary<string, int> results = new Dictionary<string, int>();

            using (var cmd = _conn.CreateCommand())
            {
                cmd.CommandText = $"SELECT MONTHNAME(dateOfPurchase) as months, Count(*) FROM orderinfo GROUP BY months;";
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        results.Add(reader.GetString(0), reader.GetInt32(1));
                    }
                }
            }



            return results;
        }
    }
}
