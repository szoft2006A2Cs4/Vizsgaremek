using HH_Api.Controllers;
using HH_Api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HH_Api.DTOs;
using System.Diagnostics;

namespace TestProject1;

[TestClass]
public class InstrumentController_Test
{
    InstrumentController? _sut;
    DbContextHelper? _db;

    [TestInitialize]
    public void Initialize()
    {
        _db = new DbContextHelper();

        var httpContext = new DefaultHttpContext();

        _sut = new InstrumentController(_db.CreateDbContext());
        _sut.ControllerContext = new ControllerContext()
        {
            HttpContext = httpContext
        };
    }

    #region GetList
    [TestMethod]
    public async Task GetInstrumentList_ReturnOk()
    {
        var result = await _sut!.GetInstrumentList() as OkObjectResult;
        Assert.IsNotNull(result);

        var instrumentList = result.Value as IEnumerable<InstrumentDTO>;
        Assert.IsNotNull(instrumentList);

        var iids = _db?.instrumentList!.Select(i => i.Id).ToList();

        foreach (var ins in instrumentList)
        {
            Assert.IsTrue(iids!.Contains(ins.Id));
        }
        Assert.AreEqual(instrumentList.Count(), _db?.instrumentList?.Count);
    }
    [TestMethod]
    public async Task GetEmptyInstrumentList_ReturnWrong()
    {
        _db?.ClearAll();

        var result = await _sut!.GetInstrumentList() as OkObjectResult;
        Assert.IsNotNull(result);

        var instrumentList = result.Value as IEnumerable<InstrumentDTO>;
        Assert.IsNotNull(instrumentList);

        Assert.AreEqual(0, instrumentList.Count());
    }
    #endregion

    #region Get
    [TestMethod]
    public async Task GetInstrument_ReturnOk()
    {
        var result = await _sut!.GetInstrument(1) as OkObjectResult;
        Assert.IsNotNull(result);
        var ins = result.Value as Instrument;
        Assert.IsTrue(_db?.instrumentList!.Contains(ins!));
    }
    [TestMethod]
    public async Task GetInstrument_ReturnWrong()
    {
        var result = await _sut!.GetInstrument(999) as NotFoundObjectResult;

        Assert.AreEqual("A megadott azonosítóval hangszer nem található!", result?.Value);
    }
    #endregion

    #region GetByUser
        [TestMethod]
        public async Task GetInstrumentByUser_ReturnOk()
        {
            var result = await _sut!.GetInstrumentByUser(1) as OkObjectResult;
            Assert.IsNotNull(result);

            var insList = result.Value as IEnumerable<InstrumentDTO>;
            Assert.IsNotNull(insList);

            var iids = _db?.instrumentList!.Select(i => i.Id).ToList();

            foreach(var ins in insList)
            {
                Assert.IsTrue(iids!.Contains(ins!.Id!));
            }
            
        }
        [TestMethod]
        public async Task GetInstrumentByUser_ReturnWrong()
        {
            var result = await _sut!.GetInstrumentByUser(999) as NotFoundObjectResult;
            Assert.AreEqual("A megadott azonosítóval hangszer nem található!", result!.Value);
        }
    #endregion

    #region PatchImageCount

    [TestMethod]
    public async Task PatchImageCount_ReturnOk()
    {
        var result = await _sut!.PatchImageCount(1, 3) as OkObjectResult;
        Assert.IsNotNull(result);

        Assert.AreEqual("Képek száma sikeresen frissítve.", result.Value);
    }

    [TestMethod]
    public async Task PatchImageCount_ReturnWrong()
    {
        var result = await _sut!.PatchImageCount(999, 3) as NotFoundObjectResult;
        Assert.IsNotNull(result);

        Assert.AreEqual("Ilyen azonosítóval hangszer nem található.", result.Value);
    }

    #endregion

    #region Delete & Create & Update
    [TestMethod]
    public async Task CreateAndUpdateThenDeleteInstrument_ReturnOk()
    {
        var newIns = new Instrument
        {
            Name = "hangszernev5",
            Cost = 1200,
            Description = "testLeiras",
            Sold = false,
            UId = 0,
            SCName = "test0",
            IsPremium = false,
            Condition = "J�",
            Seller = _db!.userList![0],
            SubCategory = _db!.subcategoryList![0]
        };

        var created = await _sut!.CreateInstrument(newIns) as CreatedResult;
        Assert.IsNotNull(created);

        var ins = created.Value as Instrument;
        Assert.IsNotNull(ins);


        ins.Name = "NameTest3";
        ins.Cost = 1205;

        var updated = await _sut!.UpdateInstrument(ins.Id, ins) as OkObjectResult;
        Assert.IsNotNull(updated);
        var insCheck = await _db!.Context!.Instruments.FindAsync(ins.Id);
        Assert.AreEqual(ins.Name, insCheck!.Name);


        var deleted = await _sut!.DeleteInstrument(ins.Id) as NoContentResult;
        Assert.IsNotNull(deleted);
    }

    [TestMethod]
    public async Task UpdateInstrument_ReturnWrong()
    {
        var result = await _sut!.UpdateInstrument(-1, new Instrument { }) as NotFoundObjectResult;
        Assert.AreEqual(result!.Value, "A keresett hangszer nem található!");

    }

    [TestMethod]
    public async Task DeleteInstrument_ReturnWrong()
    {
        var result = await _sut!.DeleteInstrument(99) as NotFoundObjectResult;
        Assert.AreEqual(result!.Value,
            "A megadott azonosítóval hangszer nem található!");
    }
    #endregion
}
