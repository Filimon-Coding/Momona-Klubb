using Microsoft.AspNetCore.Mvc;
using MomonaApi.Model;
using MomonaApi.DAL;

namespace MomonaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserController(AppDbContext context) => _context = context;

        [HttpPost]
        public IActionResult Post(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Post), new { id = user.Id }, user);
        }

        [HttpGet]
        public IActionResult Get() => Ok(_context.Users.ToList());
    }
}
