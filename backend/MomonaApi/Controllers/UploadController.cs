using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MomonaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        public UploadController(IWebHostEnvironment env) => _env = env;

        [Authorize(Roles = "Admin")]
        [HttpPost("image")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            var folder = Path.Combine(_env.WebRootPath ?? "wwwroot", "images");
            Directory.CreateDirectory(folder); // ensure folder exists

            var filename = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var path = Path.Combine(folder, filename);

            using var stream = new FileStream(path, FileMode.Create);
            await file.CopyToAsync(stream);

            return Ok(new {
                imageUrl = $"{Request.Scheme}://{Request.Host}/images/{filename}"
            });

        }
    }
}
