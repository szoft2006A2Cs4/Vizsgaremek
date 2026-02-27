using HH_Api.Model;
using System.Diagnostics.CodeAnalysis;

namespace TestProject1
{
    internal class UserComparer : IEqualityComparer<User>
    {
        public bool Equals(User x, User y) 
        {
            return x == null && y == null ||
                x?.Id == y?.Id &&
                x?.Email == y?.Email &&
                x?.PhoneNumber == y?.PhoneNumber; 
        }
        public int GetHashCode([DisallowNull] User obj) => obj.Id;
    }
}
