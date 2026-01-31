using HH_Api.Controllers;

namespace TestProject1;

[TestClass]
public class SubCategoryController_Test
{
    SubcategoryController? _sut;

    [TestInitialize]
    public void Initialize()
    {
        _sut = new SubcategoryController(DbContextHelper.CreateDbContext());
    }

    #region GetList
    [TestMethod]
    public void GetSubCategoryList_ReturnOk()
    {

    }
    [TestMethod]
    public void GetSubCategoryList_ReturnWrong()
    {

    }
    #endregion

    #region Get
    [TestMethod]
    public void GetSubCategory_ReturnOk()
    {

    }
    [TestMethod]
    public void GetSubCategory_ReturnWrong()
    {

    }
    #endregion
}
