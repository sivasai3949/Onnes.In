using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Onnes.DTO
{
    public class AddAbout
    {
        //[Required(ErrorMessage = "content")]
        public string content { get; set; }
        [NotMapped]
        public IFormFile? imageFile { get; set; }
    }
   
    public class EditAbout
    {
        public int Id { get; set; }
        [NotMapped]
        public IFormFile? imageFile { get; set; }
        public string content { get; set; }
    }
}
