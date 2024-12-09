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
    public class AboutUsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public AboutUsController(AppDbContext dbContext,
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
        public async Task<IActionResult> AddAbout([FromForm] AddAbout about)
        {
            try
            {
                if (about == null)
                {
                    return BadRequest("Invalid input data.");
                }

                // Add input validation here for other fields, e.g., using data annotations or FluentValidation.

                AboutUs AU = new AboutUs
                {
                    content = about.content
                };

                if (about.imageFile != null)
                {
                    AU.image = await UploadImage(about.imageFile);
                }
                else
                {
                    AU.image = null;
                }

                _dbContext.AboutUs.Add(AU);
                await _dbContext.SaveChangesAsync();
                return Ok(AU);
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes.
                return StatusCode(500, "An error occurred while adding the About data.");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AboutUs>>> GetAboutUs()
        {
            var aboutUsList = await _dbContext.AboutUs.ToListAsync();

            if (aboutUsList == null || !aboutUsList.Any())
            {
                return NotFound();
            }

            return aboutUsList;
        }
        [HttpPut("{Id}")]
        public async Task<ActionResult> EditAbout([FromForm] EditAbout about)
        {
            try
            {
                var AU = _dbContext.AboutUs.SingleOrDefault(opt => opt.Id == about.Id);

                AU.content = about.content;
                // AU.image = await UploadImage(about.imageFile);

                if (about.imageFile != null)
                {
                    AU.image = await UploadImage(about.imageFile);
                }
                await _dbContext.SaveChangesAsync();
                return Ok(AU);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteAbout(int Id)
        {
            if (_dbContext.AboutUs == null)
            {
                return NotFound();
            }

            var AU = _dbContext.AboutUs.SingleOrDefault(about => about.Id == Id);
            if (AU == null)
            {
                return NotFound();
            }

            _dbContext.AboutUs.Remove(AU);
            await _dbContext.SaveChangesAsync();

            return Ok(AU);
        }
    }
}
