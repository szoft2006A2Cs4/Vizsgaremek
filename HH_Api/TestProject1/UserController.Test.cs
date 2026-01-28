using HH_Api.Controllers;
using Microsoft.EntityFrameworkCore;

namespace TestProject1;

[TestClass]
public class UserController_Test
{
    UserController? _sut;

    [TestInitialize]
    public void Initialize()
    {
        _sut = new UserController(DbContextHelper.CreateDbContext());
    }

    [TestMethod]
    public void GetUserList_ReturnOkPlayerList()
    {
        
    }
}