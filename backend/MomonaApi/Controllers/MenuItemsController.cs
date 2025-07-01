using Microsoft.AspNetCore.Mvc;
using MomonaApi.DAL;
using MomonaApi.Model;

namespace MomonaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MenuItemsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.MenuItems.ToList());
        }

        [HttpPost]
        public IActionResult Create(MenuItem item)
        {
            _context.MenuItems.Add(item);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetAll), new { id = item.Id }, item);
        }
    }
}
