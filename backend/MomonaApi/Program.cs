// Program.cs
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using MomonaApi.DAL;
using MomonaApi.Interfaces;
using MomonaApi.Model;
using MomonaApi.Services;

var builder = WebApplication.CreateBuilder(args);

// ------------------------------
// 1) Configuration (env vars or appsettings.json)
// ------------------------------
// On Render, set these in the Dashboard → Environment:
// AllowedOrigins = https://momona.netlify.app, https://momona-klubb.onrender.com, http://localhost:3000
// ASPNETCORE_URLS = http://0.0.0.0:${PORT}
// JWT__Secret = <long random secret>
// SPORTSDB__Key = 123
// ConnectionStrings__Default = Data Source=/app/momona.db
// Uploads__Dir = /app/wwwroot/images/uploads (if you use it)
var config          = builder.Configuration;
var allowedOrigins  = config["AllowedOrigins"] ?? "http://localhost:3000";
var jwtSecret       = config["JWT:Secret"]      ?? "dev-only-change-me";
var sportsDbKey     = config["SPORTSDB:Key"]    ?? "123";
var connectionStr   = config.GetConnectionString("Default") ?? "Data Source=momona.db";

// ------------------------------
// 2) Services
// ------------------------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();

builder.Services.AddCors(opts =>
{
    opts.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins(
                allowedOrigins
                    .Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(o => o.Trim())
                    .ToArray()
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
        // .AllowCredentials() // enable only if you actually use cookies/credentials
    );
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer           = false,
            ValidateAudience         = false,
            ValidateLifetime         = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey         = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret))
        };
    });

builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlite(connectionStr));

builder.Services.AddScoped<IMatchService, MatchService>();

builder.Services.AddHttpClient<IFootballDataClient, SportsDbClient>(c =>
{
    // NOTE: key is directly after /json/
    c.BaseAddress = new Uri($"https://www.thesportsdb.com/api/v1/json/{sportsDbKey}/");
});

// ------------------------------
// 3) App pipeline
// ------------------------------
var app = builder.Build();

// Forwarded headers MUST be first (Render sits behind a proxy)
var fwd = new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
};
fwd.KnownNetworks.Clear(); // allow any proxy (Render)
fwd.KnownProxies.Clear();
app.UseForwardedHeaders(fwd);

// Swagger in Development only
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHttpsRedirection(); // local dev only; Render already handles TLS
}

app.UseStaticFiles();          // serve wwwroot/ (e.g., /images/*)
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

// ------------------------------
// 4) Init DB + seed (relative image paths!)
// ------------------------------
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    // --- Admins ---
    if (!db.Admins.Any())
    {
        db.Admins.AddRange(
            new Admin
            {
                Id = 1,
                Email = "super@momona.no",
                FirstName = "Super",
                LastName = "Admin",
                PasswordHash = PasswordHelper.HashPassword("SuperSecret123!"),
                IsAdmin = true
            },
            new Admin
            {
                Id = 2,
                Email = "manager@momona.no",
                FirstName = "Site",
                LastName = "Manager",
                PasswordHash = PasswordHelper.HashPassword("ManagerSecret456!"),
                IsAdmin = true
            }
        );
        db.SaveChanges();
    }

    // --- GameStatuses ---
    if (!db.GameStatuses.Any())
    {
        db.GameStatuses.AddRange(
            new GameStatus { Id = 1, GameType = "Pool",     AvailableCount = 1 },
            new GameStatus { Id = 2, GameType = "Foosball", AvailableCount = 1 },
            new GameStatus { Id = 3, GameType = "Cards",    AvailableCount = 1 }
        );
        db.SaveChanges();
    }

    // --- Events (relative images) ---
    if (!db.Events.Any())
    {
        db.Events.AddRange(
            new Event
            {
                Id          = 1,
                Title       = "Clasic Music - Yemane Baria ",
                StartsAt    = DateTime.SpecifyKind(new DateTime(2025, 8, 17, 18, 0, 0), DateTimeKind.Utc),
                Description = "Enjoy a smooth evening of classic music from the one and only Yemane Barya",
                ImageUrl    = "/images/1a31f790-e047-4f92-847e-1e45b5295898.jpeg",
                IsHidden    = false
            },
            new Event
            {
                Id          = 2,
                Title       = "Tour de France Live : Biniam Girmay",
                StartsAt    = DateTime.SpecifyKind(new DateTime(2025, 8, 20, 20, 0, 0), DateTimeKind.Utc),
                Description = "Sing your heart out and enjoy snacks with friends!",
                ImageUrl    = "/images/troy-oldham-UWw9OD3pIMo-unsplash.jpg",
                IsHidden    = false
            },
            new Event
            {
                Id          = 3,
                Title       = "Traditional Coffee Ceremony",
                StartsAt    = DateTime.SpecifyKind(new DateTime(2025, 8, 25, 16, 0, 0), DateTimeKind.Utc),
                Description = "Experience the beauty of our coffee tradition.",
                ImageUrl    = "/images/jalo-hotel-0fV_upUSaTs-unsplash.jpg",
                IsHidden    = false
            }
        );
        db.SaveChanges();
    }

    // --- MenuItems (relative images) ---
    if (!db.MenuItems.Any())
    {
        db.MenuItems.AddRange(
            new MenuItem { Name = "Injerito", Description = "A portion of selected house vegetables specially wrapped with injera.", Category = "Main",     Image = "/images/seededImages/Injerito.jpeg",                       Price = 70  },
            new MenuItem { Name = "Samosa",   Description = "Vegetarian: 4 pieces—triangle wrap deep-fried till golden crispy. Stuffed with onions, lentils, and pepper.", Category = "Main", Image = "/images/seededImages/Samosa.jpeg", Price = 100 },
            new MenuItem { Name = "Shiro",    Description = "Vegetarian: A delicious puree made from garbanzo beans (chickpeas) seasoned to perfection.", Category = "Main", Image = "/images/seededImages/Shiro.jpeg",          Price = 210 },
            new MenuItem { Name = "Birsin (Spicy / Mid)", Description = "Vegetarian: Split lentil stew prepared with homemade spices and seasoned to perfection.", Category = "Main", Image = "/images/seededImages/Birsin.jpeg", Price = 190 },
            new MenuItem { Name = "Green Beans & Cabbage", Description = "Vegetarian: Green beans & cabbage cooked with special house seasoning.", Category = "Main", Image = "/images/seededImages/GreenBeansCabbage.jpeg", Price = 190 },
            new MenuItem { Name = "Vegetarian Combination", Description = "Vegetarian: Combination of gourmet vegetarian dishes: Shiro, Birsin, potatoes & salad.", Category = "Main", Image = "/images/seededImages/VegetarianCombo.jpeg", Price = 210 },
            new MenuItem { Name = "Kitfo", Description = "Finely chopped lean flank steak, seasoned butter, spices, served with homemade cottage cheese.", Category = "Main", Image = "/images/seededImages/Kitfo.jpeg", Price = 230 },

            new MenuItem { Name = "Baklava",                Description = "Layered pastry with nuts and honey.",                   Category = "Desserts", Image = "/images/seededImages/EasyBaklava-BLOG1.jpg",              Price = 40 },
            new MenuItem { Name = "Chocolate Mousse Cake",  Description = "Rich chocolate mousse cake.",                           Category = "Desserts", Image = "/images/seededImages/easy-chocolate-mousse-cake-featured.jpg", Price = 60 },

            new MenuItem { Name = "Berry Mix Smoothie",     Description = "Made with refreshing milk and honey: Berry Mix.",       Category = "Drinks",   Image = "/images/seededImages/mixed-berry-smoothie-08.jpg",   Price = 50 },
            new MenuItem { Name = "Mango Smoothie",         Description = "Made with refreshing milk and honey: Mango.",           Category = "Drinks",   Image = "/images/seededImages/glass-of-mango-juice-and-fruits_10777862.png", Price = 70 },
            new MenuItem { Name = "Espresso",               Description = "Strong espresso shot.",                                 Category = "Drinks",   Image = "/images/seededImages/Espresso.png",                   Price = 40 },
            new MenuItem { Name = "Cappuccino",             Description = "Espresso with steamed milk foam.",                      Category = "Drinks",   Image = "/images/seededImages/Cappuccino-exc.jpg",            Price = 40 },
            new MenuItem { Name = "Apple Juice",            Description = "Chilled apple juice.",                                  Category = "Drinks",   Image = "/images/seededImages/Apple Juice.jpg",               Price = 30 },
            new MenuItem { Name = "Coke in a Bottle",       Description = "Bottle of Coke.",                                       Category = "Drinks",   Image = "/images/seededImages/coke-de-mexico.png",            Price = 40 },
            new MenuItem { Name = "Sparkling Mineral Water", Description = "Sparkling mineral water.",                             Category = "Drinks",   Image = "/images/seededImages/Sparkling Mineral Water.jpeg",  Price = 30 },
            new MenuItem { Name = "Ethiopian Sparkling Water (Ambo)", Description = "Ethiopian sparkling water.",                  Category = "Drinks",   Image = "/images/seededImages/Ethiopian Sparkling Water (Ambo).jpeg", Price = 50 },
            new MenuItem { Name = "Soda Can (Coke/Sprite/Diet Coke)", Description = "Soda in a can: Coke, Sprite, or Diet Coke.",  Category = "Drinks",   Image = "/images/seededImages/SodaCanMix.jpg",               Price = 30 }
        );
        db.SaveChanges();
    }
}

// ------------------------------
// 5) Endpoints
// ------------------------------
app.MapControllers();

app.MapGet("/healthz", () => Results.Ok("ok"));

// A simple root that works in prod too (no /swagger redirect)
app.MapGet("/", () => Results.Ok("Momona API is running. Try /api/menuitems, /api/events."));

app.Run();

// Helper record (used by the sample weather endpoint if you restore it)
public record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
