using HH_Api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace HH_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstrumentController : ControllerBase
    {
        private readonly Context _context;

        public InstrumentController(Context context)
        {
            _context = context;
        }

        // GET: api/Instrument
        [Authorize(Policy = "Instrument.Read")]
        [HttpGet]
        public async Task<IActionResult> GetInstrumentList()
        {
            return Ok(await _context.Instruments.ToListAsync());
        }

        // GET: api/Instrument/5
        [Authorize(Policy = "Instrument.Read")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInstrument(int id)
        {
            var instrument = await _context.Instruments
                .Include(u => u.Seller)
                .Include(sc => sc.SubCategory)
                .ThenInclude(c => c!.Category)
                .FirstOrDefaultAsync(i => i.Id == id);
            if (instrument != null) return Ok(instrument);
            else return NotFound();
        }

        // POST: api/Instrument
        [Authorize(Policy = "Instrument.Create")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Instrument instrument)
        {
            _context.Instruments.Add(instrument);
            await _context.SaveChangesAsync();
            return Created($"{Request.GetDisplayUrl()}/{instrument.Id}", instrument);
        }

        // TODO
        // PATCH: api/Instrument
        // GET: GetBySpecifiedAttribute
    }
}
