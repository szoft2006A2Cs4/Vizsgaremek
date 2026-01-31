using HH_Api.Controllers;

namespace TestProject1;

[TestClass]
public sealed class OrderInfoController_Test
{
    OrderInfoController? _sut;

    [TestInitialize]
    public void Initialize()
    {
        _sut = new OrderInfoController(DbContextHelper.CreateDbContext());
    }

    #region GetList
    [TestMethod]
    public void GetOrderInfoList_ReturnOk()
    {

    }
    [TestMethod]
    public void GetOrderInfoList_ReturnWrong()
    {

    }
    #endregion

    #region Get
    [TestMethod]
    public void GetOrderInfo_ReturnOk()
    {

    }
    [TestMethod]
    public void GetOrderInfo_ReturnWrong()
    {

    }
    #endregion

    #region Create
    [TestMethod]
    public void CreateOrderInfo_ReturnOk()
    {

    }
    [TestMethod]
    public void CreateOrderInfo_ReturnWrong()
    {

    }
    #endregion
}
