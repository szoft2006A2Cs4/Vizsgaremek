using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore;

namespace HH_Api.Model
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Subcategory> SubCategories { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<OrderInfo> OrderInfos { get; set; }
        public DbSet<Instrument> Instruments { get; set; }

        public Context(DbContextOptions options) : base(options) { }
    }
}
