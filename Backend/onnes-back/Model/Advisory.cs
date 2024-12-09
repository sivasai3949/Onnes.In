using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Onnes.Model
{
    public class Advisory
    {
        [Key]
        public int Id { get; set; }
        public string name { get; set; }
        public string designation { get; set; }
        public string about { get; set; }
        public string link { get; set; }
        [NotMapped]
        public IFormFile imageFile { get; set; }
        public string? image { get; set; }
    }
}
