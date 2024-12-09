using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Onnes.DTO;
using Onnes.Model;

namespace Onnes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Offoring_CFRPController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public Offoring_CFRPController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Offoring_CFRP>>> GetOfforing_CFRP()
        {
            if (_dbContext.Offoring_CFRP == null)
            {
                return NotFound();
            }
            return await _dbContext.Offoring_CFRP.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult> AddOfforing_CFRP(AddOfforing_CFRP NI)
        {
            try
            {
                Offoring_CFRP N = new Offoring_CFRP();
                N.content = NI.content;
                N.name = NI.name;
                await _dbContext.Offoring_CFRP.AddAsync(N);
                await _dbContext.SaveChangesAsync();
                return Ok(N);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteOfforing_CFRP(int Id)
        {
            if (_dbContext.Offoring_CFRP == null)
            {
                return NotFound();
            }

            var N = _dbContext.Offoring_CFRP.SingleOrDefault(NI => NI.Id == Id);
            if (N == null)
            {
                return NotFound();
            }

            _dbContext.Offoring_CFRP.Remove(N);
            await _dbContext.SaveChangesAsync();

            return Ok(N);
        }

        [HttpPut("{Id}")]
        public ActionResult EditJoinUsOfforing_CFRP(Offoring_CFRP NI)
        {
            try
            {
                var N = _dbContext.Offoring_CFRP.SingleOrDefault(opt => opt.Id == NI.Id);
                if (N != null)
                {
                    N.name = NI.name;
                    N.content = NI.content;
                    _dbContext.SaveChanges();
                }
                return Ok(N);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

