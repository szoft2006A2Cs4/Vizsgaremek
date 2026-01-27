using HH_Api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HH_Api.Auth;

namespace HH_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private Context _context;

        public UserController(Context context)
        {
            _context = context;
        }
        
        [Authorize(Policy = "User.Read")]
        [HttpGet]
        public async Task<IActionResult> GetUserList()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        [Authorize(Policy = "User.Read")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user != null) return Ok(user);
            else return NotFound("A megadott azonosítóval felhasználó nem található!");
        }

        [Authorize(Policy = "User.Update")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            var oldUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (oldUser == null) return NotFound("A keresett felhasználó nem található!");
            foreach (var propinfo in typeof(User).GetProperties())
            {
                propinfo.SetValue(oldUser, propinfo.GetValue(user));
            }
            await _context.SaveChangesAsync();
            return Ok("Adatok sikeres frissítése!");
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User user)
        {
            if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Name) || string.IsNullOrEmpty(user.Password)) return BadRequest("Hibás vagy hiányzó adatok!");
            if (string.IsNullOrEmpty(user.Role)) user.Role = "User";
            else user.Role = char.ToUpper(user.Role[0]) + user.Role.Substring(1).ToLower();
            var email = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (email != null) return Conflict("Ezzel az email-címmel már létezik felhasználó!");
            user.Password = PasswordHandler.HashPassword(user.Password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Created($"{Request.GetDisplayUrl()}/{user.Id}" ,user);
        }

        [Authorize(Policy = "User.Delete")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) NotFound("A megadott azonosítóval felhasználó nem található!");
            _context.Users.Remove(user!);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
