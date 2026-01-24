using HH_Api.Model;
using System;
using System.Configuration;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
    

namespace HH_Api.Auth
{
    public class TokenManager
    {
        private string _secretKey = string.Empty;
        private string _issuer = string.Empty;
        private string _audience = string.Empty;
        
        private Dictionary<string, List<string>> _rolesPermissions = [];

        public List<string> Permissions
        {
            get
            {
                var permissions = new List<string>();
                foreach (var values in _rolesPermissions.Values)
                {
                    permissions.AddRange(values);
                }
                return permissions;
            }
        }

        public TokenManager(Configuration configuration)
        {
            
        }
    }
}
