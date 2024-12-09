using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Onnes.Model
{
    public class JoinUs
    {
        [Key]
        public int Id { get; set; }
        public string content { get; set; }
        //public string mail { get; set; }
        //[NotMapped]
        //public IFormFile imageFile { get; set; }
        //public string? image { get; set; }

    }
}
