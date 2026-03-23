using HH_Api.Controllers;
using HH_Api.DTOs;
using HH_Api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mysqlx.Crud;
using System.Security.Cryptography;

namespace TestProject1;

[TestClass]
public class ForYouController_Test
{
    ForYouController? _sut;
        DbContextHelper? _db;

        [TestInitialize]
        public void Initialize()
        {
            _db = new DbContextHelper();

            var httpContext = new DefaultHttpContext();

            _sut = new ForYouController(_db.CreateDbContext());
            _sut.ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            };
        }

    #region GetList

    [TestMethod]
    public async Task GetForYouList_ReturnOk()
    {
        var result = await _sut!.GetForYouList() as OkObjectResult;
        Assert.IsNotNull(result);

        var list = result.Value as IEnumerable<ForYouDTO>;
        Assert.IsNotNull(list);

        var fyIds = _db?.forYouList!.Select(f => f.Id).ToList();
        foreach (var fy in list)
        {
            Assert.IsTrue(fyIds!.Contains(fy.Id));
        }
        Assert.AreEqual(_db?.forYouList?.Count, list.Count());
    }

    [TestMethod]
    public async Task GetForYouListByUser_ReturnOk()
    {
        var result = await _sut!.GetForYouListByUser(_db!.userList![0].Email) as OkObjectResult;
        Assert.IsNotNull(result);

        var list = result.Value as IEnumerable<ForYouDTO>;
        Assert.IsNotNull(list);
        Assert.IsTrue(list.Any());
    }

    [TestMethod]
    public async Task GetForYouListByUser_ReturnWrong()
    {
        var result = await _sut!.GetForYouListByUser("asfaspfjasagsiop") as OkObjectResult;
        Assert.IsNotNull(result);

        var list = result.Value as IEnumerable<ForYouDTO>;
        Assert.IsNotNull(list);
        Assert.IsFalse(list.Any());
    }

    #endregion

    #region Create
    [TestMethod]
    public async Task CreateForYou_ReturnOk()
    {
        var dto = new ForYouCreateDTO
        {
            UId = _db!.userList![0].Id,
            CName = "test1"
        };

        var result = await _sut!.CreateForYou(dto) as CreatedResult;
        Assert.IsNotNull(result);
    }
    #endregion

    #region Delete
    [TestMethod]
    public async Task DeleteForYou_ReturnOk()
    {
        var result = await _sut!.DeleteForYou(_db!.forYouList![0].Id) as OkResult;
        Assert.IsNotNull(result);
    }

    [TestMethod]
    public async Task DeleteForYou_ReturnWrong()
    {
        var result = await _sut!.DeleteForYou(999) as OkResult;
        Assert.IsNull(result);
    }
    #endregion

}
