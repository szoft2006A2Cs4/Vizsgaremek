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
                if (user == null || string.IsNullOrEmpty(user.Password) ||!PasswordHandler.VerifyPassword(loginData.Password, user.Password)) return Unauthorized();
                var token = _tokenManager.GenerateToken(user);
                user.Token = token;
                await _context.SaveChangesAsync();

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddHours(24)
            };

                Response.Cookies.Append("jwt", token, cookieOptions);
                return Ok(new {resp = "Sikeres Bejelentkezés"});
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
				Response.Cookies.Delete("jwt", new CookieOptions{
					HttpOnly = true,
					Secure = true,
					SameSite = SameSiteMode.None
				});
                return Ok();
            }
			
			[Authorize]
			[HttpGet("me")]
			public async Task<IActionResult> GetCurrentUser()
			{
				var email = User.FindFirst(ClaimTypes.Name)?.Value;
				
				if (string.IsNullOrEmpty(email)) return Unauthorized();

				var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
				if (user == null) return Unauthorized();

				var userRole = user.Role ?? "User"; 
				var permissions = _tokenManager.GetPermissionsForRole(userRole);


				return Ok(new { 
					email = user.Email, 
					role = userRole,
					permissions = permissions 
				});
			}
        }
    }
