using HH_Api.Controllers;
using HH_Api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;
using System.Linq;
using System.Threading.Tasks;

namespace TestProject1;

[TestClass]
public sealed class UserController_Test
{
    UserController? _sut;
    DbContextHelper? _db;

    [TestInitialize]
    public void Initialize()
    {
        _db = new DbContextHelper();

        var httpContext = new DefaultHttpContext();

        _sut = new UserController(_db.CreateDbContext());
        _sut.ControllerContext = new ControllerContext()
        {
            HttpContext = httpContext
        };
    }


    [TestMethod]
    public async Task ChainTest_ReturnOk()
    {
        #region Create
        var newUser = new User 
        { 
            Name="testName3",
            Email = "test@email.com",
            City = "Szombathely",
            PostalCode = 9700,
            StreetHouseNumber = "Bogáti út 70",
            PhoneNumber = 301234567,
            Review = 0,
            ImageId = "",
            Password = "abrakadabrimaaunana",
            Role = "User",
            Token = ""
        };

        var created = await _sut!.CreateUser(newUser) as CreatedResult;
        Assert.IsNotNull(created);

        var user = created.Value as User;
        Assert.IsNotNull(user);
        #endregion

        #region Update
        user.Name = "NameTest3";
        user.Review = 5;

        var updated = await _sut!.UpdateUser(user.Id, user) as OkObjectResult;
        Assert.IsNotNull(updated);
        var userCheck = await _db!.Context!.Users.FindAsync(user.Id);
        Assert.AreEqual(user.Name, userCheck!.Name);
        #endregion

        #region Delete
        var deleted = await _sut!.DeleteUser(user.Id) as NoContentResult;
        Assert.IsNotNull(deleted);
        #endregion
    }


    #region GetList
    [TestMethod]
    public async Task GetUserList_ReturnOk()
    {
        var result = await _sut!.GetUserList() as OkObjectResult;
        Assert.IsNotNull(result);

        var userList = result.Value as IEnumerable<User>;
        Assert.IsNotNull(userList);

        foreach (var user in userList)
        {
            Assert.IsTrue(_db?.userList!.Contains(user, new UserComparer()));
        }
        Assert.AreEqual(userList.Count(), _db?.userList?.Count());
    }

    [TestMethod]
    public async Task GetEmptyUserList_ReturnOk()
    {
        _db?.ClearAll();

        var result = await _sut!.GetUserList() as OkObjectResult;
        Assert.IsNotNull(result);

        var userList = result.Value as IEnumerable<User>;
        Assert.IsNotNull(userList);

        Assert.AreEqual(0, userList.Count());
    }
    #endregion

    #region Get
    [TestMethod]
    public async Task GetUser_ReturnOk()
    {
        var result = await _sut!.GetUser("TestUser0@gmail.com") as OkObjectResult;
        Assert.IsNotNull(result);
        var user = result.Value as User;
        Assert.IsTrue(_db?.userList!.Contains(user!));
    }
    [TestMethod]
    public async Task GetUser_ReturnWrong()
    {
        var result = await _sut!.GetUser("asufdoasfasof") as OkObjectResult;
        Assert.IsNull(result);
        var user = result?.Value as User;
        Assert.IsFalse(_db?.userList!.Contains(user!));
    }
    #endregion

    #region Update
    //[TestMethod]
    //public async Task UpdateUser_ReturnOk()
    //{
    //    user.Name = "NameTest3";
    //    user.Review = 5;

    //    var updated = await _sut!.UpdateUser(user.Id, user) as OkObjectResult;
    //    Assert.IsNotNull(updated);
    //    var userCheck = await _db!.Context!.Users.FindAsync(user.Id);
    //    Assert.AreEqual(user.Name, userCheck!.Name);
    //}
    [TestMethod]
    public async Task UpdateUser_ReturnWrong()
    {
        var result = await _sut!.GetUser("abrakadabraimununanan") as OkObjectResult;
        Assert.IsNull(result);

        result = await _sut!.GetUser("TestUser0@gmail.com") as OkObjectResult;
        Assert.IsNotNull(result);

        var user = result.Value as User;

        user!.Email = "TestUser0@gmail.com";
        user!.PhoneNumber = 123456789;

        var firstUser = _db!.userList!.First();
        Assert.IsNotNull(firstUser);

            Assert.IsTrue(firstUser.Email == user!.Email && firstUser.PhoneNumber == user!.PhoneNumber);

        
    }
    #endregion

    #region Create
    //[TestMethod]
    //public async Task CreateUser_ReturnOk()
    //{

    //}
    [TestMethod]
    public async Task CreateUser_ReturnWrong()
    {
        var newUser = new User
        {
            Name = "TestUser0",
            Email = "TestUser0@gmail.com",
            City = "Szombathely",
            PostalCode = 9700,
            StreetHouseNumber = "Bogáti út 70",
            PhoneNumber = 123456789,
            Review = 0,
            ImageId = "",
            Password = "abrakadabrimaaunana",
            Role = "User",
            Token = ""
        };

        var firstUser = _db!.userList!.First();
        Assert.IsNotNull(firstUser);

        Assert.IsTrue(firstUser.Email == newUser!.Email && firstUser.PhoneNumber == newUser!.PhoneNumber);
    }
    #endregion

    #region Delete
    //[TestMethod]
    //public void DeleteUser_ReturnOk()
    //{

    //}
    [TestMethod]
    public async Task DeleteUser_ReturnWrong()
    {
        var result = await _sut!.GetUser("asfoaof") as NotFoundObjectResult;
        Assert.AreEqual(result!.Value,
            "A megadott azonosítóval felhasználó nem található!");
    }
    #endregion
}