using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Onnes.DTO;
using Onnes.Model;

namespace Onnes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public FormController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet] 
        public async Task<ActionResult<IEnumerable<Form>>> GetForm()
        {
            if (_dbContext.Form == null)
            {
                return NotFound();
                return BadRequest();
            }
            return await _dbContext.Form.ToListAsync();
        }

        [HttpPost] /*Add Counselor*/
        public async Task<ActionResult> AddForm(AddFrom form)
        {
            try
            {
                    Form f = new Form();
                    f.name = form.name;
                    f.comment = form.comment;
                    f.email = form.email;
                f.date = DateTime.Now;
                await _dbContext.Form.AddAsync(f);
                    await _dbContext.SaveChangesAsync();
                return Ok(f);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
