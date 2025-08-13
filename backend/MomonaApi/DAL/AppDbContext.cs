using Microsoft.EntityFrameworkCore;
using MomonaApi.Model;

namespace MomonaApi.DAL
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<MenuItem>    MenuItems    { get; set; }
        public DbSet<Admin>       Admins       { get; set; }
        public DbSet<GameStatus>  GameStatuses { get; set; }
        public DbSet<Event>       Events       { get; set; }
        public DbSet<SportsMatch> SportsMatches => Set<SportsMatch>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Ingen HasData her – vi seeder i Program.cs
            // (her kan du ev. legge konfig/keys/relations om du trenger)
        }
    }
}
