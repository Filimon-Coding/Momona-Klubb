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
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);

                modelBuilder.Entity<GameStatus>().HasData(
                    new GameStatus { Id = 1, GameType = "Pool", AvailableCount = 1 },
                    new GameStatus { Id = 2, GameType = "Foosball", AvailableCount = 1 },
                    new GameStatus { Id = 3, GameType = "Cards", AvailableCount = 1 }
                );
            }

    }
}
