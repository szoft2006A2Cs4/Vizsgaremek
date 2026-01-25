using HH_Api.Model;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace HH_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubcategoryController : ControllerBase
    {
        private readonly Context _context;

        public SubcategoryController(Context context)
        {
            _context = context;
        }

        // GET: api/Subcategory
        [Authorize(Policy = "SubCategory.Create")]
        [HttpGet]
        public async Task<IActionResult> GetSubCategoryList()
        {
            return Ok(await _context.SubCategories.ToListAsync());
        }

        // GET: api/Subcategory/5
        [Authorize(Policy = "SubCategory.Create")]
        [HttpGet("{name}")]
        public async Task<IActionResult> GetSubCategory(string name)
        {
            var subcategory = await _context.SubCategories
                .Include(c => c.Category)
                .FirstOrDefaultAsync(sc => sc.Name == name);


            if (subcategory != null) return Ok(subcategory);
            else return NotFound();
        }
    }
}
