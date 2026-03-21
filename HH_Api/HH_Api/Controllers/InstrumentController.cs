using HH_Api.Model;
using K4os.Compression.LZ4.Internal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HH_Api.DTOs;

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
            var ins = await _context.Instruments
                .Include(s => s.SubCategory)
                .Include(u => u.Seller)
                .Select(i => new InstrumentDTO
                {
                    Id = i.Id,
                    Name = i.Name,
                    Cost = i.Cost,
                    Description = i.Description,
                    Sold = i.Sold,
                    UId = i.UId,
                    SCName = i.SCName,
                    IsPremium = i.IsPremium,
                    Condition = i.Condition,
                    SubCategory = i.SubCategory,
                    ImageCount = i.ImageCount,

                    Seller = i.Seller != null ? new UserDTO
                    {
                        Id = i.Seller.Id,
                        Name = i.Seller.Name,
                        PhoneNumber = i.Seller.PhoneNumber,
                        Review = i.Seller.Review,
                        PostalCode = i.Seller.PostalCode,
                        City = i.Seller.City,
                        ImageId = i.Seller.ImageId
                    } : null
                }).ToListAsync();

            return Ok(ins);
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

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetInstrumentByUser(int id)
        {
            var instrument = await _context.Instruments
                .Include(u => u.Seller)
                .Include(sc => sc.SubCategory)
                .ThenInclude(c => c!.Category)
                .Where(i => i.UId == id)
                .Select(i => new InstrumentDTO
                {
                    Cost = i.Cost,
                    Description = i.Description,
                    Sold = i.Sold,
                    UId = i.UId,
                    SCName = i.SCName,
                    IsPremium = i.IsPremium,
                    Condition = i.Condition,
                    SubCategory = i.SubCategory,
                    Id =  i.Id,
                    ImageCount = i.ImageCount,
                    Name = i.Name,
                    Seller = i.Seller   != null ? new UserDTO
                    {
                        Id = i.Seller.Id,
                        Name = i.Seller.Name,
                        PhoneNumber = i.Seller.PhoneNumber,
                        Review = i.Seller.Review,
                        PostalCode = i.Seller.PostalCode,
                        City = i.Seller.City,
                        ImageId = i.Seller.ImageId
                    } : null
                    
                })
                .ToListAsync();
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

        // PUT: api/Instrument
        [Authorize(Policy = "Instrument.Update")]
        [HttpPut("{id}")]
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

        [Authorize(Policy = "Instrument.Patch")]
        [HttpPut]
        public async Task<IActionResult> PatchImageCount(int id, [FromBody] int count)
        {
            var ins = await _context.Instruments.FirstOrDefaultAsync(i => i.Id == id);

            if (ins == null) return NotFound("Ilyen azonosítóval hangszer nem található.");

            ins.ImageCount = count;
            await _context.SaveChangesAsync();

            return Ok("Képek száma sikeresen frissítve.");
        }


        [Authorize(Policy = "Instrument.Delete")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInstrument(int id)
        {
            var ins = await _context.Instruments.FirstOrDefaultAsync(i => i.Id == id);
            if (ins == null) return NotFound("A megadott azonosítóval hangszer nem található!");
            _context.Instruments.Remove(ins!);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
