using HH_Api;
using HH_Api.DTOs;
using HH_Api.Model;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Net;
using System.Net.Http.Json;
using TestProject1.IntegrationTest;
using TestProject1.UniteTests;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace TestProject1.IntegrationTest;

[TestClass]
public class Integration_Test
{
    private WebApplicationFactory<Program> _factory = null!;
    private HttpClient _client = null!;

    private static readonly JsonSerializerOptions _jsonOpt = new() { PropertyNameCaseInsensitive = true};

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

                    services.AddAuthentication("Test").AddScheme<AuthenticationSchemeOptions, TestAuthHandler>("test", opt => { });
                    services.AddAuthorization(opt =>
                    {
                        foreach(var permission in new[] { "Instrument.Read", "Instrument.Create",
                            "Instrument.Update", "Instrument.Delete", "Instrument.Patch" })
                        {
                            opt.AddPolicy(permission, policy => policy.RequireAssertion(_ => true));   
                        }
                    });                                  
                                                         
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

    #region Instrument

    #region GetInstrumentList

    [TestMethod]
    public async Task GetInstrumentList_ReturnsOk()
    {
        var response = await _client.GetAsync("/api/Instrument");
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

        var list = await response.Content.ReadFromJsonAsync<List<InstrumentDTO>>(_jsonOpt);
        Assert.IsNotNull(list);
        Assert.IsTrue(list.Count > 0);
    }

    #endregion

    #region GetInstrument

    [TestMethod]
    public async Task GetInstrument_ReturnsOk()
    {
        var listResponse = await _client.GetAsync("/api/Instrument");
        var list = await listResponse.Content.ReadFromJsonAsync<List<InstrumentDTO>>(_jsonOpt);
        var firstId = list![0].Id;

        var response = await _client.GetAsync($"/api/Instrument/{firstId}");
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

        var ins = await response.Content.ReadFromJsonAsync<InstrumentDTO>(_jsonOpt);
        Assert.IsNotNull(ins);
        Assert.AreEqual(firstId, ins.Id);
    }

    [TestMethod]
    public async Task GetInstrument_NotFound_Returns404()
    {
        var response = await _client.GetAsync("/api/Instrument/9999");
        Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
    }

    #endregion

    #region CreateInstrument

    [TestMethod]
    public async Task CreateInstrument_ReturnsCreated()
    {
        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<Context>();
        var user = db.Users.First();
        var subcat = db.SubCategories.First();

        var newIns = new Instrument
        {
            Name = "IntegrationTest hangszer",
            Cost = 9999,
            Description = "integrációs teszt leírás",
            Sold = false,
            UId = user.Id,
            SCName = subcat.Name,
            IsPremium = false,
            Condition = "Jó",
            ImageCount = 0,
            Seller = null,
            SubCategory = null
        };

        var response = await _client.PostAsJsonAsync("/api/Instrument", newIns);
        Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);

        var created = await response.Content.ReadFromJsonAsync<Instrument>(_jsonOpt);
        Assert.IsNotNull(created);
        Assert.AreEqual("IntegrationTest hangszer", created.Name);
    }

    [TestMethod]
    public async Task CreateInstrument_ThenGetIt_ReturnsOk()
    {
        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<Context>();
        var user = db.Users.First();
        var subcat = db.SubCategories.First();

        var newIns = new Instrument
        {
            Name = "CreateAndGet teszt",
            Cost = 1111,
            Description = "teszt",
            Sold = false,
            UId = user.Id,
            SCName = subcat.Name,
            IsPremium = false,
            Condition = "Jó",
            ImageCount = 0,
            Seller = null,
            SubCategory = null
        };

        var createResponse = await _client.PostAsJsonAsync("/api/Instrument", newIns);
        Assert.AreEqual(HttpStatusCode.Created, createResponse.StatusCode);

        var created = await createResponse.Content.ReadFromJsonAsync<Instrument>(_jsonOpt);
        Assert.IsNotNull(created);

        var getResponse = await _client.GetAsync($"/api/Instrument/{created.Id}");
        Assert.AreEqual(HttpStatusCode.OK, getResponse.StatusCode);
    }

    #endregion

    #region UpdateInstrument

    [TestMethod]
    public async Task UpdateInstrument_ReturnsOk()
    {
        var listResponse = await _client.GetAsync("/api/Instrument");
        var list = await listResponse.Content.ReadFromJsonAsync<List<InstrumentDTO>>(_jsonOpt);
        var firstId = list![0].Id;

        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<Context>();
        var ins = await db.Instruments.Include(i => i.Seller).Include(i => i.SubCategory).FirstAsync(i => i.Id == firstId);
        ins.Name = "Frissített név";
        ins.Cost = 5555;

        var response = await _client.PutAsJsonAsync($"/api/Instrument/{firstId}", ins);
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    }

    [TestMethod]
    public async Task UpdateInstrument_NotFound_Returns404()
    {
        var ins = new Instrument { Name = "nem létezõ", Cost = 1 };
        var response = await _client.PutAsJsonAsync("/api/Instrument/9999", ins);
        Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
    }

    #endregion

    #region PatchImageCount

    [TestMethod]
    public async Task PatchImageCount_ReturnsOk()
    {
        var listResponse = await _client.GetAsync("/api/Instrument");
        var list = await listResponse.Content.ReadFromJsonAsync<List<InstrumentDTO>>(_jsonOpt);
        var firstId = list![0].Id;

        var response = await _client.PutAsJsonAsync($"/api/Instrument/{firstId}/imagecount", 5);
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    }

    [TestMethod]
    public async Task PatchImageCount_NotFound_Returns404()
    {
        var response = await _client.PutAsJsonAsync("/api/Instrument/9999/imagecount", 3);
        Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
    }

    #endregion

    #region DeleteInstrument

    [TestMethod]
    public async Task DeleteInstrument_ReturnsNoContent()
    {
        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<Context>();
        var user = db.Users.First();
        var subcat = db.SubCategories.First();

        var newIns = new Instrument
        {
            Name = "Törlendõ hangszer",
            Cost = 100,
            Description = "törlés teszt",
            Sold = false,
            UId = user.Id,
            SCName = subcat.Name,
            IsPremium = false,
            Condition = "Jó",
            ImageCount = 0,
            Seller = null,
            SubCategory = null
        };

        var createResponse = await _client.PostAsJsonAsync("/api/Instrument", newIns);
        var created = await createResponse.Content.ReadFromJsonAsync<Instrument>(_jsonOpt);
        Assert.IsNotNull(created);

        var deleteResponse = await _client.DeleteAsync($"/api/Instrument/{created.Id}");
        Assert.AreEqual(HttpStatusCode.NoContent, deleteResponse.StatusCode);
    }

    [TestMethod]
    public async Task DeleteInstrument_NotFound_Returns404()
    {
        var response = await _client.DeleteAsync("/api/Instrument/9999");
        Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
    }

    #endregion

    #endregion
}
