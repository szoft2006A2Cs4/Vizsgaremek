using HH_Api.Model;
using K4os.Compression.LZ4.Internal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HH_Api.DTOs;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;

namespace HH_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstrumentController : ControllerBase
    {
        private readonly Context _context;
        private readonly Cloudinary _cloudinary;

        const string cloudName = "dknhbvrq9";
        const string APIKey = "299914551751983";
        const string APISecret = "hm8OXqwnUdm_0Kows3OXccaOmqk";

        public InstrumentController(Context context, Cloudinary cloudinary)
        {
            _context = context;
            _cloudinary = cloudinary;
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
                        ImageId = i.Seller.ImageId,
                        StreetHouseNumber = i.Seller.StreetHouseNumber,
                        
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
                .Where(i => i.Id == id)
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
                        ImageId = i.Seller.ImageId,
                        StreetHouseNumber = i.Seller.StreetHouseNumber,
                    } : null
                    
                })
                .FirstOrDefaultAsync();
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
                        ImageId = i.Seller.ImageId,
                        StreetHouseNumber = i.Seller.StreetHouseNumber,
                    } : null
                    
                })
                .ToListAsync();
            if (instrument != null && instrument.Any()) return Ok(instrument);
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
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInstrument(int id, [FromBody] Instrument ins)
        {

            var oldIns = await _context.Instruments
                .Include(i => i.User) 
                .FirstOrDefaultAsync(i => i.Id == id);

            if (oldIns == null) return NotFound("A keresett hangszer nem található!");

            string oldNameBase = oldIns.Name; 
            string newNameBase = ins.Name;


            foreach (var propinfo in typeof(Instrument).GetProperties())
            {
                if (propinfo.Name != "Id" && (propinfo.PropertyType.IsValueType || propinfo.PropertyType == typeof(string)))
                {
                    propinfo.SetValue(oldIns, propinfo.GetValue(ins));
                }
            }

            if (oldNameBase != newNameBase)
            {

                await RenameCloudinaryImages(oldNameBase, newNameBase, oldIns.ImageCount, oldIns.User.ImageId);
            }

            await _context.SaveChangesAsync();
            return Ok("Adatok és képek sikeresen frissítve!");
        }

        [Authorize(Policy = "Instrument.Patch")]
        [HttpPut("{id}/imagecount")]
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
            var ins = await _context.Instruments.Include(i => i.Seller).FirstOrDefaultAsync(i => i.Id == id);
            if (ins == null) return NotFound("A megadott azonosítóval hangszer nem található!");

            try
            {
                if (ins.ImageCount > 0)
                {
                    string cleanName = ins.Name!.Replace(" ", "");
                    string sellerImgId = ins.Seller!.ImageId!;

                    for (var i = 0; i < ins.ImageCount; i++)
                    {
                        string publicId = $"{cleanName}_{sellerImgId}_{i}";

                        var delParams = new DeletionParams(publicId);
                        await _cloudinary.DestroyAsync(delParams);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }


            _context.Instruments.Remove(ins!);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private async Task RenameCloudinaryImages(string oldName, string newName, int count, string imageId)
        {
            var account = new Account(cloudName, APIKey, APISecret);
            var cloudinary = new Cloudinary(account);


            string cleanOldName = oldName.Replace(" ", "");
            string cleanNewName = newName.Replace(" ", "");

            for (int i = 0; i < count; i++)
            {

                string oldPublicId = $"{cleanOldName}_{imageId}_{i}";
                string newPublicId = $"{cleanNewName}_{imageId}_{i}";

                var renameParams = new RenameParams(oldPublicId, newPublicId)
                {
                    Overwrite = true
                };

                var result = await cloudinary.RenameAsync(renameParams);

                if (result.Error != null)
                {

                    Console.WriteLine($"Hiba: {result.Error.Message} | Ezt kerestem: {oldPublicId}");
                }
            }
        }
    }
}
