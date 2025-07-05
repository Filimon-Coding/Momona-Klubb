using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MomonaApi.DAL;
using MomonaApi.Model;

namespace MomonaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameStatusController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GameStatusController(AppDbContext context)
        {
            _context = context;
        }

        // Alle kan se spillstatus
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.GameStatuses.ToList());
        }

        // Kun admin kan oppdatere tilgjengelighet og kø
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, GameStatus updated)
        {
            var game = _context.GameStatuses.Find(id);
            if (game == null) return NotFound();

            game.AvailableCount = updated.AvailableCount;
            game.Queue = updated.Queue;

            _context.SaveChanges();
            return Ok(game);
        }

        // Bruker legger seg i kø
            [HttpPost("{id}/join")]
            public IActionResult JoinQueue(int id, [FromBody] JoinRequest req)
            {
                var game = _context.GameStatuses.Find(id);
                if (game == null) return NotFound();

                string entry = $"{req.Name}::{req.UserId}";

                // Prevent duplicates
                if (!game.Queue.Contains(entry))
                {
                    game.Queue.Add(entry);
                    _context.SaveChanges();
                }

                return Ok(game);
            }


            [Authorize(Roles = "Admin")]
            [HttpPost("{id}/activate")]
            public IActionResult Activate(int id)
            {
                var game = _context.GameStatuses.Find(id);
                if (game == null || game.Queue.Count == 0) return NotFound();

                game.CurrentPlayer = game.Queue[0];
                game.TakenAt = DateTime.UtcNow;
                game.Queue.RemoveAt(0);
                _context.SaveChanges();

                return Ok(game);
            }


                // [POST] /api/gamestatus/{id}/remove
            [Authorize(Roles = "Admin")]
            [HttpPost("{id}/remove")]
                public IActionResult RemoveFromQueue(int id, [FromBody] string qId)
                {
                    var game = _context.GameStatuses.Find(id);
                    if (game == null) return NotFound();

                    var updatedQueue = game.Queue.Where(entry => {
                        var parts = entry.Split("::");
                        return parts.Length != 2 || parts[1] != qId;
                    }).ToList();

                    if (updatedQueue.Count == game.Queue.Count)
                        return BadRequest("User not found in queue");

                    game.Queue = updatedQueue;
                    _context.SaveChanges();
                    return Ok(game);
                }




        // Admin fjerner neste person fra kø (valgfritt)
        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/dequeue")]
        public IActionResult Dequeue(int id)
        {
            var game = _context.GameStatuses.Find(id);
            if (game == null) return NotFound();

            if (game.Queue.Count > 0)
                game.Queue.RemoveAt(0);

            _context.SaveChanges();
            return Ok(game);
        }

        public class JoinRequest
            {
                public string Name { get; set; } = "";
                public string UserId { get; set; } = "";
            }

    }
}
