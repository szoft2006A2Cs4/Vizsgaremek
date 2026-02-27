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

    [TestInitialize]
    public void Initialize()
    {
        //_db = new DbContextHelper();

        //var httpContext = new DefaultHttpContext();

        //_sut = new LoginController(_db.CreateDbContext());
        //_sut.ControllerContext = new ControllerContext()
        //{
        //    HttpContext = httpContext
        //};
    }

    #region Login
    [TestMethod]
    public void Login_ReturnOk()
    {

    }
    [TestMethod]
    public void Login_ReturnWrong()
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
