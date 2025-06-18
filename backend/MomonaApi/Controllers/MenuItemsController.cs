using Microsoft.AspNetCore.Mvc;
using MomonaApi.Model;

namespace MomonaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuItemsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<MenuItem>> Get()
        {
            var items = new List<MenuItem>
            {
                new MenuItem { Id = 1, Name = "Pizza", Price = 129 },
                new MenuItem { Id = 2, Name = "Burger", Price = 99 },
                new MenuItem { Id = 3, Name = "Pasta", Price = 115 }
            };

            return Ok(items);
        }
    }
}
