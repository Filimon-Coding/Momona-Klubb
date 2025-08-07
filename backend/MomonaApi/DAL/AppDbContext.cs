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

            /* Event seeds */
            modelBuilder.Entity<Event>().HasData(
                new Event
                {
                    Id = 1,
                    Title = "Clasic Music - Yemane Baria ",
                    StartsAt = new DateTime(2025, 8, 17, 18, 0, 0, DateTimeKind.Utc),
                    Description = "Enjoy a smooth evening of classic music from the one and only Yemane Barya",
                    ImageUrl = "http://localhost:5272/images/1a31f790-e047-4f92-847e-1e45b5295898.jpeg",
                    IsHidden = false
                },
                new Event
                {
                    Id = 2,
                    Title = "Tour de France Live : Biniam Girmay",
                    StartsAt = new DateTime(2025, 8, 20, 20, 0, 0, DateTimeKind.Utc),
                    Description = "Sing your heart out and enjoy snacks with friends!",
                    ImageUrl = "http://localhost:5272/images/troy-oldham-UWw9OD3pIMo-unsplash.jpg",
                    IsHidden = false
                },
                new Event
                {
                    Id = 3,
                    Title = "Traditional Coffee Ceremony",
                    StartsAt = new DateTime(2025, 8, 25, 16, 0, 0, DateTimeKind.Utc),
                    Description = "Experience the beauty of our coffee tradition.",
                    ImageUrl = "http://localhost:5272/images/jalo-hotel-0fV_upUSaTs-unsplas.jpg",
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
