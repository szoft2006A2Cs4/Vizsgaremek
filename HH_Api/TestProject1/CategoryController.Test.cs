//using HH_Api.Controllers;
//using HH_Api.Model;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace TestProject1
//{
//    [TestClass]
//    public sealed class CategoryController_Test
//    {
//        CategoryController? _sut;
//        DbContextHelper? _db;

//        [TestInitialize]
//        public void Initialize()
//        {
//            _db = new DbContextHelper();

//            var httpContext = new DefaultHttpContext();

//            _sut = new CategoryController(_db.CreateDbContext());
//            _sut.ControllerContext = new ControllerContext()
//            {
//                HttpContext = httpContext
//            };
//        }

//        #region GetList
//        [TestMethod]
//        public async Task GetCategoryList_ReturnOk()
//        {
//            var result = await _sut!.GetCategoryList() as OkObjectResult;
//            Assert.IsNotNull(result);

//            var catList = result.Value as IEnumerable<Category>;
//            Assert.IsNotNull(catList);

//            foreach (var cat in catList)
//            {
//                Assert.IsTrue(_db?.categoryList!.Contains(cat));
//            }
//            Assert.AreEqual(catList.Count(), _db?.categoryList?.Count);
//        }
//        [TestMethod]
//        public async Task GetEmptyCategoryList_ReturnWrong()
//        {
//            _db?.ClearAll();

//            var result = await _sut!.GetCategoryList() as OkObjectResult;
//            Assert.IsNotNull(result);

//            var catList = result.Value as IEnumerable<Category>;
//            Assert.IsNotNull(catList);

//            Assert.AreEqual(0, catList.Count());
//        }
//        #endregion

//        #region Get
//        [TestMethod]
//        public async Task GetCategory_ReturnOk()
//        {
//            var result = await _sut!.GetCategory("test1") as OkObjectResult;
//            Assert.IsNotNull(result);
//            var category = result.Value as Category;
//            Assert.IsTrue(_db?.categoryList!.Contains(category!));
//        }
//        [TestMethod]
//        public async Task GetCategory_ReturnWrong()
//        {
//            var result = await _sut!.GetCategory("nemLetezoAzonosito") as OkObjectResult;
//            Assert.IsNull(result);
//            var category = result?.Value as Category;
//            Assert.IsFalse(_db?.categoryList!.Contains(category!));
//        }
//        #endregion
//    }
//}
