using HH_Api.Controllers;
using HH_Api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mysqlx.Crud;
using System.Security.Cryptography;

namespace TestProject1;

[TestClass]
public sealed class OrderInfoController_Test
{
    OrderInfoController? _sut;
    DbContextHelper? _db;

    [TestInitialize]
    public void Initialize()
    {
        _db = new DbContextHelper();

        var httpContext = new DefaultHttpContext();

        _sut = new OrderInfoController(_db.CreateDbContext());
        _sut.ControllerContext = new ControllerContext()
        {
            HttpContext = httpContext
        };
    }

    [TestMethod]
    public async Task ChainTest_ReturnOk()
    {
        #region Get
        var result = await _sut!.GetOrderInfo(1) as OkObjectResult;
        Assert.IsNotNull(result);
        var orderInf = result.Value as OrderInfo;
        Assert.IsTrue(_db?.orderInfoList!.Contains(orderInf!));
        #endregion

        #region Create
        var newOInfo = new OrderInfo
        {
            DateOfPurchase = DateTime.Now,
            DeliveryCity = "Szombathely",
            DeliveryStreet = "Bogáti út 70",
            DeliveryPC = 9700,
            IId = 0,
            Instrument = _db!.instrumentList![1]
        };


        var created = await _sut!.CreateOrderInfo(newOInfo) as CreatedResult;
        Assert.IsNotNull(created);

        var orderI = created.Value as OrderInfo;
        Assert.IsNotNull(orderI);
        #endregion
    }

    #region GetList
    [TestMethod]
    public async Task GetOrderInfoList_ReturnOk()
    {
        var result = await _sut!.GetOrderInfoList() as OkObjectResult;
        Assert.IsNotNull(result);

        var orderInfList = result.Value as IEnumerable<OrderInfo>;
        Assert.IsNotNull(orderInfList);

        foreach (var orderInf in orderInfList)
        {
            Assert.IsTrue(_db?.orderInfoList!.Contains(orderInf));
        }
        Assert.AreEqual(orderInfList.Count(), _db?.orderInfoList?.Count());
    }
    [TestMethod]
    public async Task GetEmptyOrderInfoList_ReturnWrong()
    {
        _db?.ClearAll();

        var result = await _sut!.GetOrderInfoList() as OkObjectResult;
        Assert.IsNotNull(result);

        var orderInfList = result.Value as IEnumerable<OrderInfo>;
        Assert.IsNotNull(orderInfList);

        Assert.AreEqual(0, orderInfList.Count());
    }
    #endregion

    #region Get
    //[TestMethod]
    //public void GetOrderInfo_ReturnOk()
    //{

    //}
    [TestMethod]
    public async Task GetOrderInfo_ReturnWrong()
    {
        var result = await _sut!.GetOrderInfo(999) as OkObjectResult;
        Assert.IsNull(result);
        var orderInf = result?.Value as OrderInfo;
        Assert.IsFalse(_db?.orderInfoList!.Contains(orderInf!));
    }
    #endregion
}
