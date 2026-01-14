using HH_Api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HH_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderInfoController : ControllerBase
    {
        private readonly Context _context;

        public OrderInfoController(Context context)
        {
            _context = context;
        }

        // GET: api/OrderInfo
        [HttpGet]
        public async Task<IActionResult> GetOrderInfoList()
        {
            return Ok(await _context.OrderInfos.ToListAsync());
        }

        // GET: api/OrderInfo/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderInfo(int id)
        {
            var instrument = await _context.OrderInfos
                .Include(i => i.Instrument)
                .ThenInclude(u => u!.Seller)
                .Include(sc => sc.Instrument!.SubCategory)
                .ThenInclude(c => c!.Category)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (instrument != null) return Ok(instrument);
            else return NotFound();
        }

        // TODO
        // PATCH (?)
        // POST: CreateOrder
    }
}
