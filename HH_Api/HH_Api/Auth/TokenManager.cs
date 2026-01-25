using HH_Api.Model;
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

        public TokenManager(ConfigurationManager configuration)
        {
            _secretKey = configuration["Auth:JWT:Key"]!;
            _issuer = configuration["Auth:JWT:Issuer"]!;
            _audience = configuration["Auth:JWT:Audience"]!;
            
            foreach (var role in configuration.GetSection("Auth:Roles")?.GetChildren() ?? [])
            {
                foreach (var permission in role.GetChildren())
                {
                    if (!string.IsNullOrEmpty(permission.Value))
                    {
                        if (!_rolesPermissions.TryGetValue(role.Key, out var permissionList))
                        {
                            permissionList = [];
                            _rolesPermissions.Add(role.Key, permissionList);
                        }
                        permissionList.Add(permission.Value);
                    }
                }
            }  
            
        }
        public string GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                // Az email címet mint a felhasználó "nevét" tároljuk el.
                new (ClaimTypes.Name, user.Email)
            };
            foreach (var permission in _rolesPermissions[user.Role!])
            {
                // A felhasználó szerepköréhez tartozó jogosultságokat mint "engedélyeket"
                // tároljuk el.
                claims.Add(new Claim("permission", permission));
            }

            // A token aláírása a titkos kulcsból létrehozott "credentials" adatokkal történik.
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            // A token tartalmazza
            var token = new JwtSecurityToken(
                // a kibocsátót,
                issuer: _issuer,
                // a célközönséget,
                audience: _audience,
                // a fent összegyűjtött állításokat,
                claims: claims,
                // a lejárat időpontját,
                expires: DateTime.Now.AddHours(1),
                // és az aláíráshoz szükséges hitelesítési adatokat.
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
