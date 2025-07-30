using Microsoft.EntityFrameworkCore;
using MomonaApi.Model;

namespace MomonaApi.DAL
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<MenuItem> MenuItems { get; set; }


        public DbSet<Admin> Admins { get; set; }

        public DbSet<GameStatus> GameStatuses { get; set; }
        
        public DbSet<Event>      Events       { get; set; }

        public DbSet<SportsMatch> SportsMatches => Set<SportsMatch>();


        /* ------------ seed data (ONE override only!) ------------ */
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            /* GameStatus seeds */
            modelBuilder.Entity<GameStatus>().HasData(
                new GameStatus { Id = 1, GameType = "Pool", AvailableCount = 1 },
                new GameStatus { Id = 2, GameType = "Foosball", AvailableCount = 1 },
                new GameStatus { Id = 3, GameType = "Cards", AvailableCount = 1 }
            );

            /* Event seeds (optional – remove if you don’t want a default row) */
            modelBuilder.Entity<Event>().HasData(
                new Event
                {
                    Id = 1,
                    Title = "Live Jazz Night",
                    StartsAt = new DateTime(2025, 8, 17, 18, 0, 0, DateTimeKind.Utc),
                    Description = "Enjoy a smooth evening of live jazz…",
                    ImageUrl = "/images/jazz.jpg",
                    IsHidden = false
                }
            );

            modelBuilder.Entity<Admin>().HasData(
                new Admin
                {
                    Id = 1,
                    Email = "super@momona.no",
                    FirstName = "Super",
                    LastName = "Admin", // Må finn noe form autmatiske hashing metoder! som ikke medfører til til 
                   // PasswordHash = "AQAAAAEAACcQAAAAENvI2r2qg2cKq1g8m0gqgC3m7yqQyqvCwq2pK0qg1g==" // fikse this later !! På grunn has lagt på forhånd !!! 
                    PasswordHash = PasswordHelper.HashPassword("SuperSecret123!")

                    
                },
                
                
                new Admin
                {
                    Id           = 2,
                    Email        = "manager@momona.no",
                    FirstName    = "Site",
                    LastName     = "Manager",
                    PasswordHash = PasswordHelper.HashPassword("ManagerSecret456!")
                }
            );

        }

    }
}
