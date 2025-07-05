using Microsoft.AspNetCore.Mvc;
using MomonaApi.Model;
using MomonaApi.DAL;
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

        [HttpPost("register")]
        public IActionResult Register(Admin admin)
        {
            // Check if admin already exists
            if (_context.Admins.Any(a => a.Email == admin.Email))
            {
                return BadRequest("Admin already exists.");
            }

            // Hash the password and save
            admin.PasswordHash = PasswordHelper.HashPassword(admin.PasswordHash);
            _context.Admins.Add(admin);
            _context.SaveChanges();

            return Ok("Admin registered successfully.");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Admin login)
        {
            var admin = _context.Admins.FirstOrDefault(a => a.Email == login.Email);
            if (admin == null)
            {
                return Unauthorized("Invalid email.");
            }

            if (!PasswordHelper.VerifyPassword(login.PasswordHash, admin.PasswordHash))
            {
                return Unauthorized("Incorrect password.");
            }

            /// Generate JWT and return with firstName
            var token = GenerateJwtToken(admin);
            return Ok(new { token, firstName = admin.FirstName });

        }

        private string GenerateJwtToken(Admin admin)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, admin.Email),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("dsfkjdkjfDSDDsxkcxnc zmxSADASDajhk!!%#ldfjdfjkjdfSdfsQQWeqwexczcQQQAsdpn!#"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(6),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
