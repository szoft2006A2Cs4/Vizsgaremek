using HH_Api.DTOs;
using HH_Api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using static System.Net.Mime.MediaTypeNames;

namespace HH_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForYouController : ControllerBase
    {
        private readonly Context _context;

        public ForYouController(Context context)
        {
            _context = context;
        }

        // GET: api/ForYou
        [Authorize(Policy = "ForYou.Read")]
        [HttpGet]
        public async Task<IActionResult> GetForYouList()
        {
            return Ok(await _context.ForYous
                .Include(u => u.User)
                .Include(c => c.Category)
                .Select(y => new ForYouDTO
                {
                    Id = y.Id,
                    CName = y.CName,
                    User = new UserDTO
                    {
                        Id = y.User!.Id,
                        Name = y.User!.Name,
                        PhoneNumber = y.User!.PhoneNumber,
                        Review = y.User!.Review,
                        PostalCode = y.User!.PostalCode,
                        City = y.User!.City,
                        ImageId = y.User!.ImageId

                    }
                })
                .ToListAsync());
        }

        // GET: api/ForYou/5
        [Authorize(Policy = "ForYou.Read")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetForYouListByUser(int id)
        {
            var foryou = await _context.ForYous
                .Include(u => u.User)
                .Include(c => c.Category)
                .Where(x => x.UId == id)
                .Select(y => y.User == null ? null : new ForYouDTO
                {
                    Id = y.Id,
                    CName = y.CName,
                    User = new UserDTO
                    {
                        Id = y.User!.Id,
                        Name = y.User!.Name,
                        PhoneNumber = y.User!.PhoneNumber,
                        Review = y.User!.Review,
                        PostalCode = y.User!.PostalCode,
                        City = y.User!.City,
                        ImageId = y.User!.ImageId

                    }
                })
                .ToListAsync();
            if (foryou != null) return Ok(foryou);
            else return NotFound();
        }

        // POST: api/ForYou
        [Authorize(Policy = "ForYou.Create")]
        [HttpPost]
        public async Task<IActionResult> CreateForYou([FromBody] ForYouCreateDTO dto)
        {
            var fy = new ForYou
            {
                UId = dto.UId,
                CName = dto.CName
            };
            _context.ForYous.Add(fy);
            await _context.SaveChangesAsync();
            return Created($"{Request.GetDisplayUrl()}/{fy.Id}", fy);
        }

        //DELETE: api/ForYou
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteForYou(int id)
        {
            var fy = _context.ForYous.FirstOrDefault(f => f.Id == id);
            if(fy == null) return NotFound("A megadott azonosítóval elem nem található!");
            _context.ForYous.Remove(fy!);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
