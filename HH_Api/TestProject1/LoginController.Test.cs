using HH_Api.Auth;
using HH_Api.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace TestProject1;

[TestClass]
public class LoginController_Test
{
    LoginController? _sut;
    DbContextHelper? _db;
    TokenManager? _tknMan;
    ConfigurationManager? _config;

    [TestInitialize]
    public void Initialize()
    {
        _config = new ConfigurationManager();
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

    }

    [TestMethod]
    public async Task Login_ReturnWrong()
    {

    }
    #endregion

    #region Logout
    [TestMethod]
    public void Logout_ReturnOk()
    {

    }
    [TestMethod]
    public void Logout_ReturnWrong()
    {

    }
    #endregion
}
