using HH_Api.Controllers;
using HH_Api.Auth;
using Microsoft.Extensions.Configuration;

namespace TestProject1;

[TestClass]
public class LoginController_Test
{
    LoginController? _sut;

    [TestInitialize]
    public void Initialize()
    {
        _sut = new LoginController(DbContextHelper.CreateDbContext(), new TokenManager(new ConfigurationManager()));
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
