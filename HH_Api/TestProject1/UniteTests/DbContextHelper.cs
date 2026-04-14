using HH_Api.DTOs;
using HH_Api.Model;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestProject1.UniteTests;

internal class DbContextHelper
{
    private Context? _context = null;
    public Context? Context => _context;

    public List<User>? userList;
    public List<Category>? categoryList;
    public List<Subcategory>? subcategoryList;
    public List<OrderInfo>? orderInfoList;
    public List<Instrument>? instrumentList;
    public List<ForYou>? forYouList;


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
                Role ="User",
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
                Role ="User",
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
                Role ="User",
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
                status = "shipped",
                DateOfPurchase = DateTime.Now,
                DateOfShipArrive = DateTime.Now,
                DateOfShipStart = DateTime.Now,
                CId = 0,
                Customer = new UserDTO
                {
                    Name = userList[0].Name,
                    City = userList[0].City,
                    Id = userList[0].Id,
                    ImageId = userList[0].ImageId,
                    PhoneNumber = userList[0].PhoneNumber,
                    PostalCode = userList[0].PostalCode,
                    Review = userList[0].Review,
                    StreetHouseNumber = userList[0].StreetHouseNumber,
                },
                IId = 0,
                _Instrument = new InstrumentDTO
                {
                    Id= instrumentList[0].Id,
                    Condition = instrumentList[0].Condition,
                    Cost = instrumentList[0].Cost,
                    Description = instrumentList[0].Description,
                    ImageCount = instrumentList[0].ImageCount,
                    IsPremium= instrumentList[0].Sold,
                    Name = instrumentList[0].Name,
                    SCName = instrumentList[0].SCName,
                    Seller  = new UserDTO
                    {
                        Name = userList[1].Name,
                        City = userList[1].City,
                        Id = userList[1].Id,
                        ImageId = userList[1].ImageId,
                        PhoneNumber = userList[1].PhoneNumber,
                        PostalCode = userList[1].PostalCode,
                        Review = userList[1].Review,
                        StreetHouseNumber = userList[1].StreetHouseNumber,
                    },
                    Sold = instrumentList[0].Sold,
                    SubCategory = instrumentList[0].SubCategory,
                    UId = instrumentList[0].UId
                }
            },
            new OrderInfo
            {
                status = "shipped",
                DateOfPurchase = DateTime.Now,
                DateOfShipArrive = DateTime.Now,
                DateOfShipStart = DateTime.Now,
                CId = 1,
                Customer = new UserDTO
                {
                    Name = userList[1].Name,
                    City = userList[1].City,
                    Id = userList[1].Id,
                    ImageId = userList[1].ImageId,
                    PhoneNumber = userList[1].PhoneNumber,
                    PostalCode = userList[1].PostalCode,
                    Review = userList[1].Review,
                    StreetHouseNumber = userList[1].StreetHouseNumber,
                },
                IId = 1,
                _Instrument = new InstrumentDTO
                {
                    Id= instrumentList[1].Id,
                    Condition = instrumentList[1].Condition,
                    Cost = instrumentList[1].Cost,
                    Description = instrumentList[1].Description,
                    ImageCount = instrumentList[1].ImageCount,
                    IsPremium= instrumentList[1].Sold,
                    Name = instrumentList[1].Name,
                    SCName = instrumentList[1].SCName,
                    Seller  = new UserDTO
                    {
                        Name = userList[0].Name,
                        City = userList[0].City,
                        Id = userList[1].Id,
                        ImageId = userList[0].ImageId,
                        PhoneNumber = userList[0].PhoneNumber,
                        PostalCode = userList[0].PostalCode,
                        Review = userList[0].Review,
                        StreetHouseNumber = userList[0].StreetHouseNumber,
                    },
                    Sold = instrumentList[1].Sold,
                    SubCategory = instrumentList[1].SubCategory,
                    UId = instrumentList[1].UId
                }
            },
            new OrderInfo
            {
                status = "shipped",
                DateOfPurchase = DateTime.Now,
                DateOfShipArrive = DateTime.Now,
                DateOfShipStart = DateTime.Now,
                CId = 2,
                Customer = new UserDTO
                {
                    Name = userList[0].Name,
                    City = userList[0].City,
                    Id = userList[0].Id,
                    ImageId = userList[0].ImageId,
                    PhoneNumber = userList[0].PhoneNumber,
                    PostalCode = userList[0].PostalCode,
                    Review = userList[0].Review,
                    StreetHouseNumber = userList[0].StreetHouseNumber,
                },
                IId = 2,
                _Instrument = new InstrumentDTO
                {
                    Id= instrumentList[2].Id,
                    Condition = instrumentList[2].Condition,
                    Cost = instrumentList[0].Cost,
                    Description = instrumentList[2].Description,
                    ImageCount = instrumentList[2].ImageCount,
                    IsPremium= instrumentList[2].Sold,
                    Name = instrumentList[2].Name,
                    SCName = instrumentList[2].SCName,
                    Seller  = new UserDTO
                    {
                        Name = userList[2].Name,
                        City = userList[2].City,
                        Id = userList[2].Id,
                        ImageId = userList[2].ImageId,
                        PhoneNumber = userList[2].PhoneNumber,
                        PostalCode = userList[2].PostalCode,
                        Review = userList[2].Review,
                        StreetHouseNumber = userList[2].StreetHouseNumber,
                    },
                    Sold = instrumentList[2].Sold,
                    SubCategory = instrumentList[2].SubCategory,
                    UId = instrumentList[2].UId
                }
            }
               
           ];
        forYouList = [
            new ForYou 
            {
                UId = 0,
                User = userList[0],
                CName = "test1",
                Category = categoryList[0]
            },
            new ForYou
            {
                UId = 1,
                User = userList[1],
                CName = "test2",
                Category = categoryList[1]
            }, 
            new ForYou
            {
                UId = 2,
                User = userList[2],
                CName = "test3",
                Category = categoryList[2]
            }
            ]; 

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
        _context.ForYous.AddRange(forYouList!);

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
        foreach (var forYou in _context!.ForYous)
        {
            _context.ForYous.Remove(forYou);
        }
        _context.SaveChanges();
    }
}