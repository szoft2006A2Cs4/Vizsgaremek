using HH_Api.Controllers;
using HH_Api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TestProject1;

[TestClass]
public class SubCategoryController_Test
{
    SubcategoryController? _sut;
    DbContextHelper? _db;

    [TestInitialize]
    public void Initialize()
    {
        _db = new DbContextHelper();

        var httpContext = new DefaultHttpContext();

        _sut = new SubcategoryController(_db.CreateDbContext());
        _sut.ControllerContext = new ControllerContext()
        {
            HttpContext = httpContext
        };
    }

    #region GetList
    [TestMethod]
    public async Task GetSubCategoryList_ReturnOk()
    {
        var result = await _sut!.GetSubCategoryList() as OkObjectResult;
        Assert.IsNotNull(result);

        var subCatList = result.Value as IEnumerable<Subcategory>;
        Assert.IsNotNull(subCatList);

        foreach (var subCat in subCatList)
        {
            Assert.IsTrue(_db?.subcategoryList!.Contains(subCat));
        }
        Assert.AreEqual(subCatList.Count(), _db?.subcategoryList?.Count);
    }
    [TestMethod]
    public async Task GetEmptySubCategoryList_ReturnOk()
    {
        _db?.ClearAll();

        var result = await _sut!.GetSubCategoryList() as OkObjectResult;
        Assert.IsNotNull(result);

        var subCatList = result.Value as IEnumerable<Subcategory>;
        Assert.IsNotNull(subCatList);

        Assert.AreEqual(0, subCatList.Count());
    }
    #endregion

    #region Get
    [TestMethod]
    public async Task GetSubCategory_ReturnOk()
    {
        var result = await _sut!.GetSubCategory("test1") as OkObjectResult;
        Assert.IsNotNull(result);
        var subcategory = result.Value as Subcategory;
        Assert.IsTrue(_db?.subcategoryList!.Contains(subcategory!));
    }
    [TestMethod]
    public async Task GetSubCategory_ReturnWrong()
    {
        var result = await _sut!.GetSubCategory("nemLetezoAzonosito") as OkObjectResult;
        Assert.IsNull(result);
        var subcategory = result?.Value as Subcategory;
        Assert.IsFalse(_db?.subcategoryList!.Contains(subcategory!));
    }
    #endregion
}
