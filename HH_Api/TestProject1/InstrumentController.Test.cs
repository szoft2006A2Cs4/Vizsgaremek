using HH_Api.Controllers;

namespace TestProject1;

[TestClass]
public class InstrumentController_Test
{
    InstrumentController? _sut;

    [TestInitialize]
    public void Initialize()
    {
        _sut = new InstrumentController(DbContextHelper.CreateDbContext());
    }

    #region GetList
    [TestMethod]
    public void GetInstrumentList_ReturnOk()
    {

    }
    [TestMethod]
    public void GetInstrumentList_ReturnWrong()
    {

    }
    #endregion

    #region Get
    [TestMethod]
    public void GetInstrument_ReturnOk()
    {

    }
    [TestMethod]
    public void GetInstrument_ReturnWrong()
    {

    }
    #endregion

    #region Create
    [TestMethod]
    public void CreateInstrument_ReturnOk()
    {

    }
    [TestMethod]
    public void CreateInstrument_ReturnWrong()
    {

    }
    #endregion
}
