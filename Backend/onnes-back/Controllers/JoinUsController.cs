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
    public class JoinUsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public JoinUsController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JoinUs>>> GetJoinUs()
        {
            if (_dbContext.JoinUs == null)
            {
                return NotFound();
            }
            return await _dbContext.JoinUs.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult> AddJoinUs(AddJoinUs NI)
        {
            try
            {
                JoinUs N = new JoinUs();
                N.content = NI.content;
                await _dbContext.JoinUs.AddAsync(N);
                await _dbContext.SaveChangesAsync();
                return Ok(N);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteJoinUs(int Id)
        {
            if (_dbContext.JoinUs == null)
            {
                return NotFound();
            }

            var N = _dbContext.JoinUs.SingleOrDefault(NI => NI.Id == Id);
            if (N == null)
            {
                return NotFound();
            }

            _dbContext.JoinUs.Remove(N);
            await _dbContext.SaveChangesAsync();

            return Ok(N);
        }

        [HttpPut("{Id}")]
        public ActionResult EditJoinUs(JoinUs NI)
        {
            try
            {
                var N = _dbContext.JoinUs.SingleOrDefault(opt => opt.Id == NI.Id);
                if (N != null)
                {
  
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

