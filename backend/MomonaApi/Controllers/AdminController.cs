using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MomonaApi.DAL;
using MomonaApi.Model;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MomonaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AdminController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginDto login)
        {
            if (login is null || string.IsNullOrWhiteSpace(login.Email) || string.IsNullOrWhiteSpace(login.Password))
                return BadRequest("Missing credentials.");

            var admin = _context.Admins.FirstOrDefault(a => a.Email == login.Email);
            if (admin == null) return Unauthorized("Invalid credentials.");

            // plain password vs. lagret hash
            if (!PasswordHelper.VerifyPassword(login.Password, admin.PasswordHash))
                return Unauthorized("Invalid credentials.");

            var token = GenerateJwtToken(admin);
            return Ok(new { token, firstName = admin.FirstName });
        }

        private string GenerateJwtToken(Admin admin)
        {
            var secret = _config["JWT:Secret"] ?? throw new InvalidOperationException("JWT:Secret is not configured.");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, admin.Email),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(6),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
