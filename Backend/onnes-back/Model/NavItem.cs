using System.ComponentModel.DataAnnotations;

namespace Onnes.Model
{
    public class NavItem
    {
        [Key]
        public int Id { get; set; }
        public string navbarName { get; set; }
        public string navbarSubName { get; set; }
        public string routerLink { get; set; }
    }
}
