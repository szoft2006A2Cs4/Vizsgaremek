using HH_Api.Auth;
using HH_Api.Data;
using HH_Api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HH_Api.Controllers
{
    [ApiController]
    [Route("api/login")]
    public class LoginController : ControllerBase
    {
            private Context _context;
            private readonly TokenManager _tokenManager;

            // A tokenManager objektum azért elérhető itt, mert a program.cs-ben az AddSingleton() metódussal
            // felvettük az API szolgáltatásai közé. Az EntityFramework miatt kicsit eltérően, speciálisabban
            // kellett felvennük a Context objektumot, amely az adatbázis kontextusunkat írja le.
            public LoginController(Context context, TokenManager tokenManager)
            {
                _context = context;
                _tokenManager = tokenManager;
            }

            [AllowAnonymous]
            [HttpPost]
            public async Task<IActionResult> Login(LoginData loginData)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginData.Email);
                if (user == null || !PasswordHandler.VerifyPassword(loginData.Password, user.Password)) return Unauthorized();
                var token = _tokenManager.GenerateToken(user);
                user.Token = token;
                await _context.SaveChangesAsync();
                return Ok(token);
            }

            [Authorize]
            [HttpDelete]
            public async Task<IActionResult> Logout()
            {
                var email = User.FindFirst(ClaimTypes.Name)?.Value;
                if (string.IsNullOrEmpty(email)) return Unauthorized();
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
                if (user == null) return Unauthorized();
                user.Token = null;
                await _context.SaveChangesAsync();
                return Ok();
            }
        }
    }
