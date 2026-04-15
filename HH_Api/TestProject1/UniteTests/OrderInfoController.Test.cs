using HH_Api.Controllers;
using HH_Api.DTOs;
using HH_Api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mysqlx.Crud;
using System.Security.Cryptography;

namespace TestProject1.UniteTests;

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

    #region GetList
    [TestMethod]
    public async Task GetOrderInfoList_ReturnOk()
    {
        var result = await _sut!.GetOrderInfoList() as OkObjectResult;
        Assert.IsNotNull(result);

        var list = result.Value as IEnumerable<OrderInfo>;
        Assert.IsNotNull(list);

        var ids = _db?.orderInfoList!.Select(f => f.Id).ToList();
        foreach (var order in list)
        {
            Assert.IsTrue(ids!.Contains(order.Id));
        }
        Assert.AreEqual(_db?.orderInfoList?.Count, list.Count());
    }
    [TestMethod]
    public async Task GetOrderInfoList_ReturnWrong()
    {
        _db?.ClearAll();

        var result = await _sut!.GetOrderInfoList() as OkObjectResult;
        Assert.IsNotNull(result);

        var list = result.Value as IEnumerable<OrderInfo>;
        Assert.IsNotNull(list);

        Assert.AreEqual(0, list.Count());
    }

    #endregion

    #region Get
    [TestMethod]
    public async Task GetOrderInfoListByInstrument_ReturnOk()
    {
        var result = await _sut!.GetOrderInfoListByInstrument(_db!.orderInfoList![0].IId) as OkObjectResult;
        Assert.IsNotNull(result);

        var order = result.Value as OrderInfo;
        Assert.IsNotNull(order);

        var ids = _db?.orderInfoList!.Select(o => o.Id).ToList();
        Assert.IsTrue(ids!.Contains(order.Id));
    }

    [TestMethod]
    public async Task GetOrderInfoListByInstrument_ReturnWrong()
    {
        var result = await _sut!.GetOrderInfoListByInstrument(999) as NotFoundResult;
        Assert.IsNotNull(result);
    }
    #endregion

    #region Create
    [TestMethod]
    public async Task CreateOrderInfo_ReturnOk()
    {
        var newOrder = new OrderInfo
        {
            status = "shipped",
            DateOfPurchase = DateTime.Now,
            DateOfShipArrive = DateTime.Now,
            DateOfShipStart = DateTime.Now,
            CId = _db!.userList![0].Id,
            IId = _db!.instrumentList![0].Id
        };

        var result = await _sut!.CreateOrderInfo(newOrder) as CreatedResult;
        Assert.IsNotNull(result);

        var created = result.Value as OrderInfo;
        Assert.IsNotNull(created);
        Assert.AreEqual(newOrder.status, created.status);
        Assert.AreEqual(newOrder.CId, created.CId);
        Assert.AreEqual(newOrder.IId, created.IId);
    }

    [TestMethod]
    public async Task CreateOrderInfo_ReturnWrong()
    {
        var newOrder = new OrderInfo
        {
            status = "shipped",
            DateOfPurchase = DateTime.Now,
            DateOfShipArrive = DateTime.Now,
            DateOfShipStart = DateTime.Now,
            CId = 999,  
            IId = 999   
        };

        var result = await _sut!.CreateOrderInfo(newOrder) as CreatedResult;
        Assert.IsNull(result); 
    }
    #endregion
}
