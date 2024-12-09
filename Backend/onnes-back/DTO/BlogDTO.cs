using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Onnes.DTO
{
    public class AddBlog
    {
        [NotMapped]
        public IFormFile? imageFile { get; set; }
        public string content { get; set; }
        public string link { get; set; }
    }
    //public class DeleteBlog
    //{
    //    public int Id { get; set; }
    //}
    public class EditBlog
    {
        public int Id { get; set; }
        [NotMapped]
        public IFormFile? imageFile { get; set; }
        public string content { get; set; }
        public string link { get; set; }
    }
}
