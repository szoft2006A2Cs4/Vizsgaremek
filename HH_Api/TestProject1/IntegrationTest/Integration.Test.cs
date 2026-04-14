using HH_Api;
using HH_Api.Model;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TestProject1.UniteTests;

namespace TestProject1;

[TestClass]
public class Integration_Test
{
    private WebApplicationFactory<Program> _factory;
    private HttpClient _client;

    [TestInitialize]
    public void Initialize()
    {
        _factory = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    var desc = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<Context>));

                    if(desc != null)
                    {
                        services.Remove(desc);
                    }

                    var conn = new SqliteConnection("DataSource=:memory:");
                    conn.Open();

                    services.AddDbContext<Context>(opt => opt.UseSqlite(conn));

                    var sp = services.BuildServiceProvider();
                    using var scope = sp.CreateScope();
                    var db = scope.ServiceProvider.GetRequiredService<Context>();
                    db.Database.EnsureCreated();

                    var helper = new DbContextHelper();
                    db.Users.AddRange(helper.userList!);
                    db.Categories.AddRange(helper.categoryList!);
                    db.SubCategories.AddRange(helper.subcategoryList!);
                    db.Instruments.AddRange(helper.instrumentList!);
                    db.ForYous.AddRange(helper.forYouList!);

                    db.SaveChanges();
                });
            });
        _client = _factory.CreateClient();
    }

    [TestCleanup]
    public void CleanUp()
    {
        _client.Dispose();
        _factory.Dispose();
    }
  
}
