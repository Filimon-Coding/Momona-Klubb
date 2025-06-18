using Microsoft.AspNetCore.Mvc;
using MomonaApi.Model;
using MomonaApi.DAL; // hvis AppDbContext ligger i DAL

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
        public ActionResult<IEnumerable<MenuItem>> Get()
        {
            return Ok(_context.MenuItems.ToList());
        }
    }
}
