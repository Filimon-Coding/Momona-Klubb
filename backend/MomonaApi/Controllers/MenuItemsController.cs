using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MomonaApi.DAL;
using MomonaApi.Model;
using System.Linq;

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

        // Åpen for alle - henter alle menyobjekter
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.MenuItems.ToList());
        }

        // Kun tilgjengelig for Admin-bruker
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Create(MenuItem item)
        {
            _context.MenuItems.Add(item);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetAll), new { id = item.Id }, item);
        }

        // Oppdaterer et eksisterende menyobjekt (kun for Admin)
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, MenuItem updatedItem)
        {
            var item = _context.MenuItems.Find(id);
            if (item == null)
                return NotFound();

            item.Name = updatedItem.Name;
            item.Description = updatedItem.Description;
            item.Price = updatedItem.Price;
            item.Image = updatedItem.Image;
            item.Category = updatedItem.Category;

            _context.SaveChanges();
            return NoContent();
        }

        // Sletter et menyobjekt (kun for Admin)
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = _context.MenuItems.Find(id);
            if (item == null)
                return NotFound();

            _context.MenuItems.Remove(item);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
