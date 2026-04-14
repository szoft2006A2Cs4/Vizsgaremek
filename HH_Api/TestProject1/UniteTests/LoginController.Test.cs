using HH_Api.Auth;
using HH_Api.Controllers;
using HH_Api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace TestProject1.UniteTests;

[TestClass]
public class LoginController_Test
{
    LoginController? _sut;
    DbContextHelper? _db;
    TokenManager? _tknMan;
    ConfigurationManager? _config;


      //    "User": [
      //  "Instrument.Create",
      //  "OrderInfo.Read",
      //  "User.Read",
      //  "User.Update",
      //  "User.Delete",
      //  "Instrument.Patch",
      //  "ForYou.Read",
      //  "ForYou.Create"
      //]


    [TestInitialize]
    public void Initialize()
    {
        _config = new ConfigurationManager();

        #region Configs
        _config["Auth:Jwt:Key"] = "TesztKulcs_1234!?asdfghjkl9_1234567890yxcvbnmqwertzuiop?!!?";
        _config["Auth:Jwt:Issuer"] = "testIssuer";
        _config["Auth:Jwt:Audience"] = "testAudience";

        _config["Auth:Roles:User:0"] = "Instrument.Create";
        _config["Auth:Roles:User:1"] = "OrderInfo.Read";
        _config["Auth:Roles:User:2"] = "User.Read";
        _config["Auth:Roles:User:3"] = "User.Update";
        _config["Auth:Roles:User:4"] = "User.Delete";
        _config["Auth:Roles:User:5"] = "Instrument.Patch";
        _config["Auth:Roles:User:6"] = "ForYou.Read";
        _config["Auth:Roles:User:7"] = "ForYou.Create";
        #endregion

        _db = new DbContextHelper();
        _tknMan = new TokenManager(_config);

        var httpContext = new DefaultHttpContext();

        _sut = new LoginController(_db.CreateDbContext(), _tknMan);
        _sut.ControllerContext = new ControllerContext()
        {
            HttpContext = httpContext
        };
    }

    #region Login
    [TestMethod]
    public async Task Login_ReturnOk()
    {
        var user = _db!.userList![0];

        var dbUser = await _db.Context!.Users.FindAsync(user.Id);
        dbUser!.Password = PasswordHandler.HashPassword("TestUser0");
        await _db.Context.SaveChangesAsync();

        var loginData = new LoginData
        {
            Email = "TestUser0@gmail.com",
            Password = "TestUser0"
        };

        var result = await _sut!.Login(loginData) as OkObjectResult;
        Assert.IsNotNull(result);
    }

    [TestMethod]
    public async Task Login_ReturnWrong()
    {
        var dbUser = await _db!.Context!.Users.FindAsync(_db.userList![0].Id);
        dbUser!.Password = PasswordHandler.HashPassword("TestUser0");
        await _db.Context.SaveChangesAsync();

        var loginDataWrongEmail = new LoginData
        {
            Email = "hibasEmailCim",
            Password = "EzEgyErosTestJelszo1"
        };
        var resultNotFound = await _sut!.Login(loginDataWrongEmail) as UnauthorizedResult;
        Assert.IsNotNull(resultNotFound);

        var loginDataWrongPWD = new LoginData
        {
            Email = "TestUser0@gmail.com",
            Password = "nemLetezoRosszJelszo"
        };
        var resultWrongPass = await _sut!.Login(loginDataWrongPWD) as UnauthorizedResult;
        Assert.IsNotNull(resultWrongPass);
    }
    #endregion
}
