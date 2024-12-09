using System.ComponentModel.DataAnnotations.Schema;

namespace Onnes.DTO
{

    public class AddAdvisory
    {
        public string name { get; set; }
        public string designation { get; set; }
        public string about { get; set; }
        public string link { get; set; }
        [NotMapped]
        public IFormFile? imageFile { get; set; }
    }
    public class EditAdvisory
    {
        public int Id { get; set; }
        [NotMapped]
        public IFormFile? imageFile { get; set; }
        public string name { get; set; }
        public string designation { get; set; }
        public string about { get; set; }
        public string link { get; set; }
    }
}
