using HH_Api.Controllers;

namespace TestProject1
{
    [TestClass]
    public sealed class CategoryController_Test
    {
        CategoryController? _sut;

        [TestInitialize]
        public void Initialize()
        {
            _sut = new CategoryController(DbContextHelper.CreateDbContext());
        }

        #region GetList
        [TestMethod]
        public void GetCategoryList_ReturnOk()
        {

        }
        [TestMethod]
        public void GetCategoryList_ReturnWrong()
        {

        }
        #endregion

        #region Get
        [TestMethod]
        public void GetCategory_ReturnOk()
        {

        }
        [TestMethod]
        public void GetCategory_ReturnWrong()
        {

        }
        #endregion
    }
}
