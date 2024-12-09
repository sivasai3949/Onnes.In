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
    public class NavItemController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public NavItemController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NavItem>>> GetNavItem()
        {
            if (_dbContext.NavItem == null)
            {
                return NotFound();
            }
            return await _dbContext.NavItem.ToListAsync();
        }

        [HttpPost] 
        public async Task<ActionResult> AddNavItem(AddNavItem NI)
        {
            try
            {
                NavItem N = new NavItem();
                N.navbarName = NI.navbarName;
                N.navbarSubName = NI.navbarSubName;
                N.routerLink = NI.routerLink;
                await _dbContext.NavItem.AddAsync(N);
                await _dbContext.SaveChangesAsync();
                return Ok(N);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteNavItem(int Id)
        {
            if (_dbContext.NavItem == null)
            {
                return NotFound();
            }

            var N = _dbContext.NavItem.SingleOrDefault(NI => NI.Id == Id);
            if (N == null)
            {
                return NotFound();
            }

            _dbContext.NavItem.Remove(N);
            await _dbContext.SaveChangesAsync();

            return Ok(N);
        }

        [HttpPut("{Id}")]
        public ActionResult EditNavItem(NavItem NI)
        {
            try
            {
                var N = _dbContext.NavItem.SingleOrDefault(opt => opt.Id == NI.Id);
                if (N != null)
                {
                    N.navbarName = NI.navbarName;
                    N.navbarSubName = NI.navbarSubName;
                    N.routerLink = NI.routerLink;
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

