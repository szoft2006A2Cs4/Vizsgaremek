using HH_Api.Controllers;
using HH_Api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;
using System.Linq;
using System.Threading.Tasks;
using HH_Api.DTOs;

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
            Assert.IsTrue(_db?.userList!.Any(u => u.Id == user.Id));
        }
        Assert.AreEqual(userList.Count(), _db?.userList?.Count());
    }

    [TestMethod]
    public async Task GetEmptyUserList_ReturnWrong()
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
        Assert.AreEqual("TestUser0@gmail.com", user!.Email);
    }
    [TestMethod]
    public async Task GetUser_ReturnWrong()
    {
        var result = await _sut!.GetUser("asufdoasfasof") as NotFoundObjectResult;
        Assert.IsNotNull(result);
        Assert.AreEqual("A megadott azonosítóval felhasználó nem található!", result!.Value);
    }
    #endregion

    #region Update
    [TestMethod]
    public async Task UpdateUser_ReturnOk()
    {
        var result = await _sut!.GetUser("TestUser0@gmail.com") as OkObjectResult;
        Assert.IsNotNull(result);

        var user = result.Value as User;

        user!.Name = "NameTest3";
        user.Review = 5;

        var updated = await _sut!.UpdateUser(user.Id, user) as OkObjectResult;
        Assert.IsNotNull(updated);

        var userCheck = await _db!.Context!.Users.FindAsync(user.Id);
        Assert.AreEqual(user.Name, userCheck!.Name);
    }

    [TestMethod]
    public async Task UpdateUser_ReturnWrong()
    {
        var resultNotFound = await _sut!.UpdateUser(999, new User() { Name = "asd"}) as NotFoundObjectResult;
        Assert.IsNotNull(resultNotFound);
        Assert.AreEqual("A keresett felhasználó nem található!", resultNotFound.Value);


    }
    #endregion

    #region ResetPassword

    [TestMethod]
    public async Task ResetPassword_ReturnOk()
    {
        var result = await _sut!.ResetPassword(_db!.userList![0].Id, new InProfilePWDResetDTO { Pswd = "EgyFrissitettErosJelszo1!"}) as OkObjectResult;
        Assert.IsNotNull(result);
        Assert.AreEqual("A jelszó frissítése sikeres!", result.Value);
    }
    [TestMethod]
    public async Task ResetPassword_ReturnWrong()
    {
        var resultNotFound = await _sut!.ResetPassword(999, new InProfilePWDResetDTO { Pswd = "EgyFrissitettErosJelszo1!" }) as NotFoundObjectResult;
        Assert.IsNotNull(resultNotFound);
        Assert.AreEqual("Ilyen azonosítóval felhasználó nem található!", resultNotFound.Value);

        var resultBadReq = await _sut!.ResetPassword(_db!.userList![0].Id, new InProfilePWDResetDTO { Pswd = "" }) as BadRequestObjectResult;
        Assert.IsNotNull(resultBadReq);
        Assert.AreEqual("Hibás adatok!", resultBadReq.Value);
    }
    #endregion

    #region Create
    [TestMethod]
    public async Task CreateUser_ReturnOk()
    {
        var newUser = new User
        {
            Name = "TestUser4",
            Email = "TestUser4@gmail.com",
            City = "Szombathely",
            PostalCode = 9700,
            StreetHouseNumber = "Bogati ut 70",
            PhoneNumber = 123456789,
            Review = 0,
            ImageId = "",
            Password = "abrakadabrimaaunana",
            Role = "User",
            Token = ""
        };

        var result = await _sut!.CreateUser(newUser) as CreatedResult;
        Assert.IsNotNull(result);

        var createdUser = result.Value as User;
        Assert.AreEqual("TestUser4", createdUser!.Name);
    }
    [TestMethod]
    public async Task CreateUser_ReturnWrong()
    {
        var emptyUser = new User
        {
            Name = "",
            Email = "",
            City = "Szombathely",
            PostalCode = 9700,
            StreetHouseNumber = "Bog�ti �t 70",
            PhoneNumber = 123456789,
            Review = 0,
            ImageId = "",
            Password = "",
            Role = "User",
            Token = ""
        };

        var resultEmpty = await _sut!.CreateUser(emptyUser) as BadRequestObjectResult;
        Assert.IsNotNull(resultEmpty);
        Assert.AreEqual("Hibás vagy hiányzó adatok!", resultEmpty.Value);


        emptyUser.Name = "TestUser4";
        emptyUser.Email = "TestUser0@gmail.com";
        emptyUser.Password = "EzegyErosTestjelszo1!";
        var conflictUser = emptyUser;

        var resultConflict = await _sut!.CreateUser(conflictUser) as ConflictObjectResult;
        Assert.IsNotNull(resultConflict);
        Assert.AreEqual("Ezzel az email-címmel már létezik felhasználó!", resultConflict.Value);
    }
    #endregion

    #region Delete
    [TestMethod]
    public async Task DeleteUser_ReturnOk()
    {
        var deleted = await _sut!.DeleteUser(_db!.userList![0].Id) as NoContentResult;
        Assert.IsNotNull(deleted);
    }
    [TestMethod]
    public async Task DeleteUser_ReturnWrong()
    {
        var result = await _sut!.DeleteUser(999) as NotFoundObjectResult;
        Assert.IsNotNull(result);   
        Assert.AreEqual("A megadott azonosítóval felhasználó nem található!", result!.Value);
    }
    #endregion
}