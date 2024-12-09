using Microsoft.EntityFrameworkCore;


namespace Onnes.Model
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Form> Form { get; set; }
        public DbSet<Admin> Admin { get; set; }
        public DbSet<NavItem> NavItem { get; set; }
        public DbSet<CarouselImage> CarouselImage { get; set; }
        public DbSet<AboutUs> AboutUs { get; set; }
        public DbSet<Team> Team { get; set; }
        public DbSet<Offering> Offering { get; set; }
        public DbSet<Blog> Blog { get; set; }
        public DbSet<JoinUs> JoinUs { get; set; }
        public DbSet<Offoring_CFRP> Offoring_CFRP { get; set; }
        public DbSet<Partner> Partner { get; set; }
        public DbSet<Advisory> Advisory { get; set; }
        public DbSet<Visitors> Visitors { get; set; }

    }
}