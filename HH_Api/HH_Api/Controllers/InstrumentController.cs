using HH_Api.Model;
using K4os.Compression.LZ4.Internal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        [AllowAnonymous]
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
            else return NotFound("A megadott azonosítóval hangszer nem található!");
        }

        // POST: api/Instrument
        [Authorize(Policy = "Instrument.Create")]
        [HttpPost]
        public async Task<IActionResult> CreateInstrument([FromBody] Instrument instrument)
        {
            _context.Instruments.Add(instrument);
            await _context.SaveChangesAsync();
            return Created($"{Request.GetDisplayUrl()}/{instrument.Id}", instrument);
        }


        [Authorize(Policy = "Instrument.Update")]
        [HttpPut]
        public async Task<IActionResult> UpdateInstrument(int id, [FromBody] Instrument ins)
        {
            var oldIns = await _context.Instruments.FirstOrDefaultAsync(i => i.Id == id);
            if (oldIns == null) return NotFound("A keresett hangszer nem található!");
            foreach (var propinfo in typeof(Instrument).GetProperties())
            {
                propinfo.SetValue(oldIns, propinfo.GetValue(ins));
            }
            await _context.SaveChangesAsync();
            return Ok("Adatok sikeres frissítése!");
        }

        [Authorize(Policy = "Instrument.Delete")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInstrument(int id)
        {
            var ins = await _context.Instruments.FirstOrDefaultAsync(i => i.Id == id);
            if (ins == null) NotFound("A megadott azonosítóval hangszer nem található!");
            _context.Instruments.Remove(ins!);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // TODO
        // PATCH: api/Instrument
        // GET: GetBySpecifiedAttribute
    }
}
