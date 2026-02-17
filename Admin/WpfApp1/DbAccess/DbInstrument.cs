using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Common;
using System.Diagnostics.Metrics;
using WpfApp1.Model;
using System.Windows;

namespace WpfApp1.DbAccess
{
    public class DbInstrument : DbAccessor<Instr>
    {
        protected DbConnection _conn;
        public DbInstrument(DbConnection conn) : base(conn)
        {
            _conn = conn;
        }

        public override void Create(Instr item)
        {
            using (var cmd = _conn.CreateCommand())
            {
                cmd.CommandText = $"INSERT INTO instrument (uid, iname, cost, scname, description)" +
                                  $"VALUES ({item.UserId}, {item.Name}, {item.Cost}, {item.SubCategoryName}, {item.Description});";
                if (cmd.ExecuteNonQuery() == 1) { MessageBox.Show("Sikeres adatbevitel"); }
            }
        }

        public override bool Delete(int id)
        {
            using (var cmd = _conn.CreateCommand())
            {
                cmd.CommandText = $"DELETE FROM instrument WHERE iid={id};";
                return cmd.ExecuteNonQuery() == 1;
            }
        }

        public override Instr? Read(int id)
        {
            Instr? instrument = new Instr();
            using (var cmd = _conn.CreateCommand())
            {
                cmd.CommandText = $"SELECT uid, iname, cost, scname, description FROM instrument WHERE iid={id};";
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        instrument = new Instr
                        {
                            Id = id,
                            UserId = reader.GetInt32(0),
                            Name = reader.GetString(1),
                            Cost = reader.GetInt32(2),
                            SubCategoryName = reader.GetString(3),
                            Description = reader.GetString(4)
                        };
                    }
                }
            }

            return instrument;
        }

        public override IEnumerable<Instr> ReadAll()
        {
            IEnumerable<Instr> results = new List<Instr>();
            using (var cmd = _conn.CreateCommand())
            {
                cmd.CommandText = "SELECT iid, uid, iname, cost, scname, description FROM instrument;";
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var instrument = new Instr
                        {
                            Id = reader.GetInt32(0),
                            UserId = reader.GetInt32(1),
                            Name = reader.GetString(2),
                            Cost = reader.GetInt32(3),
                            SubCategoryName = reader.GetString(4),
                            Description = reader.GetString(5)
                        };
                        results.Append(instrument);
                    }
                }
            }

            return results;
        }

        public override void Update(int id, Instr item)
        {
            using (var cmd = _conn.CreateCommand())
            {
                cmd.CommandText = $"UPDATE instrument SET " +
                                  $"uid={item.UserId}, " +
                                  $"iname={item.Name}, " +
                                  $"cost={item.Cost}, " +
                                  $"scname={item.SubCategoryName}, " +
                                  $"description={item.Description} " +
                                  $"WHERE iid={id};";
                if (cmd.ExecuteNonQuery() == 1) { MessageBox.Show("Sikeres adatfrissítés!"); }
            }
        }
    }
}
