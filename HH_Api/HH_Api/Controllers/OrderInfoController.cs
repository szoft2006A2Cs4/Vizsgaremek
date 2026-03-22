using HH_Api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;

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
        [Authorize(Policy = "OrderInfo.Read")]
        [HttpGet]
        public async Task<IActionResult> GetOrderInfoList()
        {
            return Ok(await _context.OrderInfos.ToListAsync());
        }

        // GET: api/OrderInfo/5
        [Authorize(Policy = "OrderInfo.Read")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderInfoListByInstrument(int id)
        {
            var orderInfo = await _context.OrderInfos
                .Include(i => i._Instrument)
                .Include(s => s._Instrument!.Seller)
                .Include(cu => cu.Customer)
                .Include(sc => sc._Instrument!.SubCategory)
                .ThenInclude(c => c!.Category)
                .FirstOrDefaultAsync(o => o.IId == id);
            if (orderInfo != null) return Ok(orderInfo);
            else return NotFound();
        }
        
        // POST: api/OrderIndio
        [Authorize(Policy = "OrderInfo.Create")]
        [HttpPost]
        public async Task<IActionResult> CreateOrderInfo([FromBody] OrderInfo orderinfo)
        {
            var user = await _context.Users.FindAsync(orderinfo.CId);
            if (user == null) return NotFound("A megadott felhasználó nem található!");

            var ins = await _context.Instruments.FindAsync(orderinfo.IId);
            if (ins == null) return NotFound("A megadott hangszer nem található!");

            _context.OrderInfos.Add(orderinfo);
            await _context.SaveChangesAsync();
            return Created($"{Request.GetDisplayUrl()}/{orderinfo.Id}", orderinfo);
        }
    }
}
