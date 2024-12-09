using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Onnes.Model
{
    public class Team
    {
        [Key]
        public int Id { get; set; }
        public string name { get; set; }
        public string designation { get; set; }
        public string about { get; set; }
        public string? link1 { get; set; }
        public string? link2 { get; set; }
        public string? link3 { get; set; }
        public string? link4 { get; set; }
        [NotMapped]
        public IFormFile imageFile { get; set; }
        public string? image { get; set; }
    }  
}
