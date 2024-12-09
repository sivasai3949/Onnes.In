using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Onnes.Model
{
    public class Offering
    {
        [Key]
        public int Id { get; set; }
        public string? title { get; set; }
        public string content { get; set; }
        [NotMapped]
        public IFormFile imageFile { get; set; }
        public string? image { get; set; }

    }
}
