using HH_Api.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Options;

namespace TestProject1;

internal class DbContextHelper
{
    private Context? _context = null;
    public Context? Context => _context;

    public List<User>? userList;
    public List<Category>? categoryList;
    public List<Subcategory>? subcategoryList;
    public List<OrderInfo>? orderInfoList;
    public List<Instrument>? instrumentList;


    public DbContextHelper()
    {
        userList = [
            new User
            {
                Name = "TestUser0",
                Email = "TestUser0@gmail.com",
                Password = "TestUser0",
                City = "TestCity",
                PostalCode = 0000,
                PhoneNumber = 123456789,
                Review = 5,
                Role ="Guest",
                StreetHouseNumber = "TestStreetHouseNumber",
                Token = ""
            },
            new User
            {
                Name = "TestUser01",
                Email = "TestUser01@gmail.com",
                Password = "TestUser01",
                City = "TestCity",
                PostalCode = 0000,
                PhoneNumber = 123456789,
                Review = 5,
                Role ="Guest",
                StreetHouseNumber = "TestStreetHouseNumber",
                Token = ""
            },
            new User
            {
                Name = "TestUser02",
                Email = "TestUser02@gmail.com",
                Password = "TestUser02",
                City = "TestCity",
                PostalCode = 0000,
                PhoneNumber = 123456789,
                Review = 5,
                Role ="Guest",
                StreetHouseNumber = "TestStreetHouseNumber",
                Token = ""
            }];
        categoryList = [
                new Category
                {
                    Name = "test1"
                },
                new Category
                {
                    Name = "test2"
                },
                new Category
                {
                    Name = "test3"
                }];
        subcategoryList = [
                new Subcategory
                {
                    Name= "test0",
                    Category = categoryList![0],
                    CName = "0"
                },
                new Subcategory
                {
                    Name = "test1",
                    Category = categoryList[1],
                    CName = "1"
                },
                new Subcategory
                {
                    Name = "test2",
                    Category = categoryList[2],
                    CName = "2"
                }];
        instrumentList = [
    new Instrument
            {
                Name = "hangszernev0",
                Cost = 1200,
                Description = "testLeiras",
                Sold = false,
                UId = 0,
                SCName = "test0",
                IsPremium = false,
                Condition = "Jó",
                Seller = userList[0],
                SubCategory = subcategoryList[0]
            },

            new Instrument
            {
                Name = "hangszernev1",
                Cost = 1200,
                Description = "testLeiras",
                Sold = false,
                UId = 0,
                SCName = "test1",
                IsPremium = false,
                Condition = "Jó",
                Seller = userList[1],
                SubCategory =subcategoryList[1]
            },

            new Instrument
            {
                Name = "hangszernev2",
                Cost = 1200,
                Description = "testLeiras",
                Sold = false,
                UId = 0,
                SCName = "test2",
                IsPremium = false,
                Condition = "Jó",
                Seller = userList[2],
                SubCategory = subcategoryList[2]
            }];
        orderInfoList = [
            new OrderInfo
            {
                DateOfPurchase = DateTime.Now,
                DeliveryCity = "Szombathely",
                DeliveryStreet = "Bogáti út 70",
                DeliveryPC = 9700,
                IId = 0,
                Instrument = instrumentList![0]
            },
            new OrderInfo
            {
                DateOfPurchase = DateTime.Now,
                DeliveryCity = "Szombathely",
                DeliveryStreet = "Bogáti út 70",
                DeliveryPC = 9700,
                IId = 1,
                Instrument = instrumentList![1]
            },
            new OrderInfo
            {
                DateOfPurchase = DateTime.Now,
                DeliveryCity = "Szombathely",
                DeliveryStreet = "Bogáti út 70",
                DeliveryPC = 9700,
                IId = 2,
                Instrument = instrumentList![2]
            }];

    }

    public Context CreateDbContext()
    {
        var connection = new SqliteConnection("DataSource=:memory:");
        connection.Open();

        var options = new DbContextOptionsBuilder<Context>()
                .UseSqlite(connection)
                .Options;

        _context = new Context(options);
        _context.Database.EnsureCreated();

        _context.Users.AddRange(userList!);
        _context.Categories.AddRange(categoryList!);
        _context.SubCategories.AddRange(subcategoryList!);
        _context.OrderInfos.AddRange(orderInfoList!);
        _context.Instruments.AddRange(instrumentList!);

        _context.SaveChanges();

        return _context;
    }

    internal void ClearAll()
    {
        foreach(var user in _context!.Users)
        {
            _context.Users.Remove(user);
        }

        foreach (var category in _context!.Categories)
        {
            _context.Categories.Remove(category);
        }

        foreach (var subCategory in _context!.SubCategories)
        {
            _context.SubCategories.Remove(subCategory);
        }

        foreach (var orderinfo in _context!.OrderInfos)
        {
            _context.OrderInfos.Remove(orderinfo);
        }

        foreach (var instrument in _context!.Instruments)
        {
            _context.Instruments.Remove(instrument);
        }
        _context.SaveChanges();
    }
}