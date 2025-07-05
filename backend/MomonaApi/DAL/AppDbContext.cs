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


    }
}
