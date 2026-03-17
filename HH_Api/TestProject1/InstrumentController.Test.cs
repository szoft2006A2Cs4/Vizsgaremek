//using HH_Api.Controllers;
//using HH_Api.Model;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace TestProject1;

//[TestClass]
//public class InstrumentController_Test
//{
//    InstrumentController? _sut;
//    DbContextHelper? _db;

//    [TestInitialize]
//    public void Initialize()
//    {
//        _db = new DbContextHelper();

//        var httpContext = new DefaultHttpContext();

//        _sut = new InstrumentController(_db.CreateDbContext());
//        _sut.ControllerContext = new ControllerContext()
//        {
//            HttpContext = httpContext
//        };
//    }

//    [TestMethod]
//    public async Task ChainTest_ReturnOk()
//    {
//        #region Create
//        var newIns = new Instrument
//        {
//            Name = "hangszernev5",
//            Cost = 1200,
//            Description = "testLeiras",
//            Sold = false,
//            UId = 0,
//            SCName = "test0",
//            IsPremium = false,
//            Condition = "J�",
//            Seller = _db!.userList![0],
//            SubCategory = _db!.subcategoryList![0]
//        };

//        var created = await _sut!.CreateInstrument(newIns) as CreatedResult;
//        Assert.IsNotNull(created);

//        var ins = created.Value as Instrument;
//        Assert.IsNotNull(ins);
//        #endregion

//        #region Update
//        ins.Name = "NameTest3";
//        ins.Cost = 1205;

//        var updated = await _sut!.UpdateInstrument(ins.Id, ins) as OkObjectResult;
//        Assert.IsNotNull(updated);
//        var insCheck = await _db!.Context!.Instruments.FindAsync(ins.Id);
//        Assert.AreEqual(ins.Name, insCheck!.Name);
//        #endregion

//        #region Delete
//        var deleted = await _sut!.DeleteInstrument(ins.Id) as NoContentResult;
//        Assert.IsNotNull(deleted);
//        #endregion
//    }

//    #region GetList
//    [TestMethod]
//    public async Task GetInstrumentList_ReturnOk()
//    {
//        var result = await _sut!.GetInstrumentList() as OkObjectResult;
//        Assert.IsNotNull(result);

//        var instrumentList = result.Value as IEnumerable<Instrument>;
//        Assert.IsNotNull(instrumentList);

//        foreach (var ins in instrumentList)
//        {
//            Assert.IsTrue(_db?.instrumentList!.Contains(ins));
//        }
//        Assert.AreEqual(instrumentList.Count(), _db?.instrumentList?.Count);
//    }
//    [TestMethod]
//    public async Task GetEmptyInstrumentList_ReturnWrong()
//    {
//        _db?.ClearAll();

//        var result = await _sut!.GetInstrumentList() as OkObjectResult;
//        Assert.IsNotNull(result);

//        var instrumentList = result.Value as IEnumerable<Instrument>;
//        Assert.IsNotNull(instrumentList);

//        Assert.AreEqual(0, instrumentList.Count());
//    }
//    #endregion

//    #region Get
//    [TestMethod]
//    public async Task GetInstrument_ReturnOk()
//    {
//        var result = await _sut!.GetInstrument(1) as OkObjectResult;
//        Assert.IsNotNull(result);
//        var ins = result.Value as Instrument;
//        Assert.IsTrue(_db?.instrumentList!.Contains(ins!));
//    }
//    [TestMethod]
//    public async Task GetInstrument_ReturnWrong()
//    {
//        var result = await _sut!.GetInstrument(999) as OkObjectResult;
//        Assert.IsNull(result);
//        var ins = result?.Value as Instrument;
//        Assert.IsFalse(_db?.instrumentList!.Contains(ins!));
//    }
//    #endregion

//    #region Delete
//    [TestMethod]
//    public async Task DeleteInstrument_ReturnWrong()
//    {
//        var result = await _sut!.GetInstrument(-1) as NotFoundObjectResult;
//        Assert.AreEqual(result!.Value,
//            "A megadott azonosítóval hangszer nem található!");
//    }
//    #endregion
//}
