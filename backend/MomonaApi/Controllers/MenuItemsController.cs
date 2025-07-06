// Filen er del ASP.net coreWeb API og fungere som en kontroller som håndtere 
// - Http forespørelser relatert til menyData

/*
Mvc: For å lage web-API-er.

Authorization: Brukes for å beskytte enkelte endepunkter (kun for admin).

DAL: Din database-kontekst (AppDbContext).

Model: Inneholder MenuItem-klassen.

Linq: Gjør det enkelt å søke og filtrere i databasen.

*/


using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MomonaApi.DAL;
using MomonaApi.Model;
using System.Linq;

namespace MomonaApi.Controllers
{
    [ApiController] // Gjør at detter er en HTTP API-kontroller
    [Route("api/[controller]")] // Gjør at URL-en automatisk blir api/menuitems 
    public class MenuItemsController : ControllerBase
    {
        private readonly AppDbContext _context;    

        public MenuItemsController(AppDbContext context)  // Bruker dependecy injection for å hente inn appDBcontext, som gir tilgang til sql-lite DB
        {
            _context = context;
        }

        // Åpen for alle - henter alle menyobjekter
        // Både bruker og Admin henter alle data, men kunne admin har mulight til se "sjult " produkter 
        [HttpGet]
        public IActionResult GetAll()
        {
        var isAdmin = User.IsInRole("Admin");

        var items = _context.MenuItems
        .Where(m => isAdmin || !m.IsHidden)
        .ToList();

        return Ok(items);
        }

        // Kun tilgjengelig for Admin-bruker
        // Oppretter menyrett av admin i DB, ved navn, pris, kateori...osv 
        // Så returene 201 Created med den nye ressurers ID 
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Create(MenuItem item)
        {
            _context.MenuItems.Add(item);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetAll), new { id = item.Id }, item);
        }

        // Oppdaterer et eksisterende menyobjekt (kun for Admin)
        //som tidligere men her oppdaterte en eksisterende menyrett 
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
            item.IsHidden = updatedItem.IsHidden; 

            _context.SaveChanges();
            return Ok(item);

        }

        // Skru av/på synlighet av produkter 
        // En rask endepunkt for kunne "skujle" eller vise menrett uten måtte slette den

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/visibility")]
        public IActionResult ToggleVisibility(int id)
        {
            var item = _context.MenuItems.Find(id);
            if (item == null) return NotFound();

            item.IsHidden = !item.IsHidden;
            _context.SaveChanges();
            return Ok(item);
        }

        // Henter alt for admin 
        // Den brukes for hente alle produkter til admin : Både skult og synlige 

        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
            public IActionResult GetAllForAdmin()
        {
            return Ok(_context.MenuItems.ToList()); // includes hidden
        }


        // Sletter et menyobjekt (kun for Admin)
        // returenere HTTP 204 NoContent ved suksess 
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
