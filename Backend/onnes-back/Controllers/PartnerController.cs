using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Onnes.DTO;
using Onnes.Model;
using static System.Net.Mime.MediaTypeNames;

namespace Onnes.Controllers.AppDb
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartnerController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public PartnerController(AppDbContext dbContext,
        IWebHostEnvironment environment)
        {
            _dbContext = dbContext;
            _hostingEnvironment = environment;
        }

        [NonAction]
        public async Task<string> UploadImage(IFormFile imageFile)
        {
            string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var image = Path.Combine(_hostingEnvironment.WebRootPath, "images", imageName);
            using (var fileStream = new FileStream(image, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            var path = GetImageUrl(HttpContext, imageName);
            return path;
        }
        [NonAction]
        public string RemoveImage(string code)
        {
            string Imagepath = code;
            try
            {
                if (System.IO.File.Exists(Imagepath))
                {
                    System.IO.File.Delete(Imagepath);
                }
                return Imagepath;
            }
            catch (Exception ext)
            {
                throw ext;
            }
        }
        [NonAction]
        public string GetImageUrl(HttpContext context, string imageName)
        {
            return Path.Combine(GetBaseUrl(context), "images", imageName);
        }
        [NonAction]
        public string GetBaseUrl(HttpContext context)
        {
            var request = context.Request;
            var host = request.Host.ToUriComponent();
            var pathBase = request.PathBase.ToUriComponent();
            return $"{request.Scheme}://{host}{pathBase}";
        }


        [HttpPost]
        public async Task<ActionResult> AddPartner([FromForm] AddPartner CI)
        {
            try
            {
                Partner C = new Partner();
                C.title = CI.title;
                 C.link = CI.link;
                if (CI.imageFile != null)
                {
                    C.image = await UploadImage(CI.imageFile);
                }
                else
                {
                    C.image = null;
                }
                _dbContext.Partner.Add(C);
                await _dbContext.SaveChangesAsync();
                return Ok(C);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetPartner()
        {
            if (_dbContext.Partner == null)
            {
                return NotFound();
            }
            return await _dbContext.Partner.ToListAsync();
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> EditPartner([FromForm] EditPartner CI)
        {
            try
            {
                var C = _dbContext.Partner.SingleOrDefault(opt => opt.Id == CI.Id);

                C.title = CI.title;
                C.link = CI.link;
                if (CI.imageFile != null)
                {
                    C.image = await UploadImage(CI.imageFile);
                }
                await _dbContext.SaveChangesAsync();
                return Ok(C);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeletePartner(int Id)
        {
            if (_dbContext.Partner == null)
            {
                return NotFound();
            }

            var C = _dbContext.Partner.SingleOrDefault(blog => blog.Id == Id);
            if (C == null)
            {
                return NotFound();
            }

            _dbContext.Partner.Remove(C);
            await _dbContext.SaveChangesAsync();

            return Ok(C);
        }
    }
}
