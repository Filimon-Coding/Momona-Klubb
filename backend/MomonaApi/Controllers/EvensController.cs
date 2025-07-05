using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MomonaApi.DAL;
using MomonaApi.Model;

namespace MomonaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        public EventsController(AppDbContext ctx) => _ctx = ctx;

        /* ---------- PUBLIC ---------- */
        //  GET /api/events            → kun synlige events
        //  GET /api/events?all=true   → alle events (krever admin-token)
        [HttpGet]
        public IActionResult GetAll([FromQuery] bool all = false)
        {
            var list = _ctx.Events
                        .Where(e => all || !e.IsHidden)
                        .OrderBy(e => e.StartsAt)
                        .ToList();
            return Ok(list);
        }

        /* ---------- ADMIN ---------- */
        [Authorize(Roles="Admin")]
        [HttpPost]
        public IActionResult Create(Event e)
        {
            _ctx.Events.Add(e);
            _ctx.SaveChanges();
            return CreatedAtAction(nameof(GetAll), new { id = e.Id }, e);
        }

        [Authorize(Roles="Admin")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, Event updated)
        {
            var ev = _ctx.Events.Find(id);
            if (ev is null) return NotFound();

            ev.Title       = updated.Title;
            ev.StartsAt    = updated.StartsAt;
            ev.Description = updated.Description;
            ev.ImageUrl    = updated.ImageUrl;
            ev.IsHidden    = updated.IsHidden;

            _ctx.SaveChanges();
            return Ok(ev);
        }

        [Authorize(Roles="Admin")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var ev = _ctx.Events.Find(id);
            if (ev is null) return NotFound();
            _ctx.Events.Remove(ev);
            _ctx.SaveChanges();
            return NoContent();
        }
    }
}
