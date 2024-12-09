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
    public class BlogController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public BlogController(AppDbContext dbContext,
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
        public async Task<ActionResult> AddBlog([FromForm] AddBlog blog)
        {
            try
            {
                Blog B = new Blog();
                B.content = blog.content;
                B.link = blog.link;
                if (blog.imageFile != null)
                {
                    B.image = await UploadImage(blog.imageFile);
                }
                else
                {
                    B.image = null;
                }

                _dbContext.Blog.Add(B);
                await _dbContext.SaveChangesAsync();
                return Ok(B);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Blog>>> GetBlog()
        {
            if (_dbContext.AboutUs == null)
            {
                return NotFound();
            }
            return await _dbContext.Blog.ToListAsync();
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> EditBlog([FromForm] EditBlog blog)
        {
            try
            {
                var B = _dbContext.Blog.SingleOrDefault(opt => opt.Id == blog.Id);

                B.content = blog.content;
                B.link = blog.link;
                if (blog.imageFile != null)
                {
                    B.image = await UploadImage(blog.imageFile);
                }
                await _dbContext.SaveChangesAsync();
                return Ok(B);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteBlog(int Id)
        {
            if (_dbContext.Blog == null)
            {
                return NotFound();
            }

            var B = _dbContext.Blog.SingleOrDefault(blog => blog.Id == Id);
            if (B == null)
            {
                return NotFound();
            }

            _dbContext.Blog.Remove(B);
            await _dbContext.SaveChangesAsync();

            return Ok(B);
        }
    }
}
