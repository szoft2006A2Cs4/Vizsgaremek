using HH_Api.Controllers;
using Microsoft.EntityFrameworkCore;

namespace TestProject1;

[TestClass]
public sealed class UserController_Test
{
    UserController? _sut;

    [TestInitialize]
    public void Initialize()
    {
        _sut = new UserController(DbContextHelper.CreateDbContext());
    }

    #region GetList
    [TestMethod]
    public void GetUserList_ReturnOk()
    {
        
    }
    [TestMethod]
    public void GetUserList_ReturnWrong()
    {

    }
    #endregion

    #region Get
    [TestMethod]
    public void GetUser_ReturnOk()
    {

    }
    [TestMethod]
    public void GetUser_ReturnWrong()
    {

    }
    #endregion

    #region Update
    [TestMethod]
    public void UpdateUser_ReturnOk()
    {

    }
    [TestMethod]
    public void UpdateUser_ReturnWrong()
    {

    }
    #endregion

    #region Create
    [TestMethod]
    public void CreateUser_ReturnOk()
    {

    }
    [TestMethod]
    public void CreateUser_ReturnWrong()
    {

    }
    #endregion

    #region Delete
    [TestMethod]
    public void DeleteUser_ReturnOk()
    {

    }
    [TestMethod]
    public void DeleteUser_ReturnWrong()
    {

    }
    #endregion
}