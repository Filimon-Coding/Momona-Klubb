using Microsoft.EntityFrameworkCore;
using MomonaApi.Model;

namespace MomonaApi.DAL
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<MenuItem> MenuItems { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Admin> Admins { get; set; }

        public DbSet<GameStatus> GameStatuses { get; set; }
        
        public DbSet<Event>      Events       { get; set; } 

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
                    IsHidden    = false
                }
            );
        }

    }
}
