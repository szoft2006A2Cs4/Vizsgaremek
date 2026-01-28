using HH_Api.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace TestProject1;

internal static class DbContextHelper
{
    public static Context CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<Context>().UseInMemoryDatabase("TestDb").Options;
        var context = new Context(options);
        context.Users.AddRange(
            [
            new User
            {
                Id = 0,
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
                Id = 1,
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
            },
            new User
            {
                Id = 3,
                Name = "TestUser03",
                Email = "TestUser03@gmail.com",
                Password = "TestUser03",
                City = "TestCity",
                PostalCode = 0000,
                PhoneNumber = 123456789,
                Review = 5,
                Role ="Guest",
                StreetHouseNumber = "TestStreetHouseNumber",
                Token = ""
            }
            ]);
        return context;
    }
}