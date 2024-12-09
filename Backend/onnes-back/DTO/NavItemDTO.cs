using System.ComponentModel.DataAnnotations;

namespace Onnes.DTO
{
    public class AddNavItem
    {
        public string navbarName { get; set; }
        public string navbarSubName { get; set; }
        public string routerLink { get; set; }
    }
    public class DeleteNavItem
    {
        public int Id { get;set; }
    }

}
