


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
