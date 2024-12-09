using System.ComponentModel.DataAnnotations.Schema;

namespace Onnes.DTO
{
    public class AddPartner
    {
        [NotMapped]
        public IFormFile? imageFile { get; set; }
        public string? title { get; set; }
        public string? link { get; set; }
    }
    public class EditPartner
    {
        public int Id { get; set; }
        [NotMapped]
        public IFormFile? imageFile { get; set; }
        public string? title { get; set; }
        public string? link { get; set; }
    }
}
