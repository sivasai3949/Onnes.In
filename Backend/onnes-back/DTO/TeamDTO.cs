using System.ComponentModel.DataAnnotations.Schema;

namespace Onnes.DTO
{
   
    public class AddTeam
    {
        public string name { get; set; }
        public string designation { get; set; }
        public string about { get; set; }
        public string? link1 { get; set; }
        public string? link2 { get; set; }
        public string? link3 { get; set; }
        public string? link4 { get; set; }
        [NotMapped]
        public IFormFile? imageFile { get; set; }
    }
    public class EditTeam
    {
        public int Id { get; set; }
        [NotMapped]
        public IFormFile? imageFile { get; set; }
        public string name { get; set; }
        public string designation { get; set; }
        public string about { get; set; }
        public string? link1 { get; set; }
        public string? link2 { get; set; }
        public string? link3 { get; set; }
        public string? link4 { get; set; }
    }
}
