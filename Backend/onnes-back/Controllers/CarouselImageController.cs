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
    public class CarouselImageController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public CarouselImageController(AppDbContext dbContext,
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
        public async Task<ActionResult> AddBlog([FromForm] AddCarouselImage CI)
        {
            try
            {
                CarouselImage C = new CarouselImage();
                C.text = CI.text;
                C.colour = CI.colour;
                C.order = CI.order;
                if (CI.imageFile != null)
                {
                    C.image = await UploadImage(CI.imageFile);
                }
                else
                {
                    C.image = null;
                }
                _dbContext.CarouselImage.Add(C);
                await _dbContext.SaveChangesAsync();
                return Ok(C);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarouselImage>>> GetCarouselImage()
        {
            if (_dbContext.CarouselImage == null)
            {
                return NotFound();
            }
            return await _dbContext.CarouselImage.ToListAsync();
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> EditCarouselImage([FromForm] EditCarouselImage CI)
        {
            try
            {
                var C = _dbContext.CarouselImage.SingleOrDefault(opt => opt.Id == CI.Id);

                C.text = CI.text;
                C.order = CI.order;
                C.colour = CI.colour;
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
        public async Task<IActionResult> DeleteCarouselImage(int Id)
        {
            if (_dbContext.CarouselImage == null)
            {
                return NotFound();
            }

            var C = _dbContext.CarouselImage.SingleOrDefault(blog => blog.Id == Id);
            if (C == null)
            {
                return NotFound();
            }

            _dbContext.CarouselImage.Remove(C);
            await _dbContext.SaveChangesAsync();

            return Ok(C);
        }
    }
}
