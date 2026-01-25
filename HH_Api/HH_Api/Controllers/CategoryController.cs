using HH_Api.Model;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace HH_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly Context _context;

        public CategoryController(Context context)
        {
            _context = context;
        }

        // GET: api/Category
        [Authorize(Policy = "Category.Read")]
        [HttpGet]
        public async Task<IActionResult> GetCategoryList()
        {
            return Ok(await _context.Categories.ToListAsync());
        }

        // GET: api/Category/5
        [Authorize(Policy = "Category.Read")]
        [HttpGet("{name}")]
        public async Task<IActionResult> GetCategory(string name)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Name == name);
            if (category != null) return Ok(category);
            else return NotFound();
        }
    }
}
