using System.Text;                                  // for Encoding.UTF8
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using MomonaApi.DAL;
using MomonaApi.Interfaces;
using MomonaApi.Model;
using MomonaApi.Services;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

// ------------------------------
// 1) Les konfig fra miljøvariabler / appsettings.json
// ------------------------------
var config        = builder.Configuration;

// Tillatte opprinnelser (kommaseparert liste)
var allowedOrigins = config["AllowedOrigins"] ?? "http://localhost:3000";

// JWT-hemmelighet (MÅ settes i prod)
var jwtSecret      = config["JWT:Secret"] 
                     ?? "dev-only-change-me";  // fallback for lokal kjøring

// Nøkkel til TheSportsDB (kan være tom i dev)
var sportsDbKey    = config["SPORTSDB:Key"] ?? "123";

// SQLite-tilkobling
var connectionStr  = config.GetConnectionString("Default") 
                     ?? "Data Source=momona.db";

// ------------------------------
// 2) Registrer tjenester
// ------------------------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins(
                allowedOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries)
                               .Select(o => o.Trim())
                               .ToArray()
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
        // .AllowCredentials()   // bare hvis du faktisk bruker cookies/credentials
    );
});

// JWT-auth (bruk hemmeligheten fra env)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSecret))
        };
    });

// EF Core + SQLite (én registrering)
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlite(connectionStr));

// Domene-tjenester
builder.Services.AddScoped<IMatchService, MatchService>();

// HttpClient til TheSportsDB (én registrering)
builder.Services.AddHttpClient<IFootballDataClient, SportsDbClient>(c =>
{
    // NB: nøkkelen står rett etter /json/
    c.BaseAddress = new Uri($"https://www.thesportsdb.com/api/v1/json/{sportsDbKey}/");
});

// ------------------------------
// 3) Bygg app
// ------------------------------
var app = builder.Build();

// Swagger i dev (kan skrus på i prod hvis ønskelig)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();          // eksponerer wwwroot/ (bilder osv.)
app.UseHttpsRedirection();     // ok også på Render
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

// ------------------------------
// 4) Init DB + seed (bruk RELATIVE bildeadresser)
// ------------------------------
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();


    // --- SEED: Admins ---
    if (!db.Admins.Any())
    {
        db.Admins.AddRange(
            new Admin
            {
                Id = 1,
                Email = "super@momona.no",
                FirstName = "Super",
                LastName = "Admin",
                PasswordHash = PasswordHelper.HashPassword("SuperSecret123!")
            },
            new Admin
            {
                Id = 2,
                Email = "manager@momona.no",
                FirstName = "Site",
                LastName = "Manager",
                PasswordHash = PasswordHelper.HashPassword("ManagerSecret456!")
            }
        );
        db.SaveChanges();
    }

    // --- SEED: GameStatuses ---
    if (!db.GameStatuses.Any())
    {
        db.GameStatuses.AddRange(
            new GameStatus { Id = 1, GameType = "Pool", AvailableCount = 1 },
            new GameStatus { Id = 2, GameType = "Foosball", AvailableCount = 1 },
            new GameStatus { Id = 3, GameType = "Cards", AvailableCount = 1 }
        );
        db.SaveChanges();
    }

    // --- SEED: Events (bruk RELATIVE bilder!) ---
    if (!db.Events.Any())
    {
        db.Events.AddRange(
            new Event
            {
                Id = 1,
                Title = "Clasic Music - Yemane Baria ",
                StartsAt = DateTime.SpecifyKind(new DateTime(2025, 8, 17, 18, 0, 0), DateTimeKind.Utc),
                Description = "Enjoy a smooth evening of classic music from the one and only Yemane Barya",
                ImageUrl = "/images/1a31f790-e047-4f92-847e-1e45b5295898.jpeg",
                IsHidden = false
            },
            new Event
            {
                Id = 2,
                Title = "Tour de France Live : Biniam Girmay",
                StartsAt = DateTime.SpecifyKind(new DateTime(2025, 8, 20, 20, 0, 0), DateTimeKind.Utc),
                Description = "Sing your heart out and enjoy snacks with friends!",
                ImageUrl = "/images/troy-oldham-UWw9OD3pIMo-unsplash.jpg",
                IsHidden = false
            },
            new Event
            {
                Id = 3,
                Title = "Traditional Coffee Ceremony",
                StartsAt = DateTime.SpecifyKind(new DateTime(2025, 8, 25, 16, 0, 0), DateTimeKind.Utc),
                Description = "Experience the beauty of our coffee tradition.",
                ImageUrl = "/images/jalo-hotel-0fV_upUSaTs-unsplash.jpg",
                IsHidden = false
            }
        );
        db.SaveChanges();
    }






    if (!db.MenuItems.Any())
    {
        db.MenuItems.AddRange(
            new MenuItem { Name = "Injerito", Description = "A portion of selected house vegetables specially wrapped with injera.", Category = "Main", Image = "/images/seededImages/Injerito.jpeg", Price = 70 },
            new MenuItem { Name = "Samosa", Description = "Vegetarian: 4 pieces—triangle wrap deep-fried till golden crispy. Stuffed with onions, lentils, and pepper.", Category = "Main", Image = "/images/seededImages/Samosa.jpeg", Price = 100 },
            new MenuItem { Name = "Shiro", Description = "Vegetarian: A delicious puree made from garbanzo beans (chickpeas) seasoned to perfection.", Category = "Main", Image = "/images/seededImages/Shiro.jpeg", Price = 210 },
            new MenuItem { Name = "Birsin (Spicy / Mid)", Description = "Vegetarian: Split lentil stew prepared with homemade spices and seasoned to perfection.", Category = "Main", Image = "/images/seededImages/Birsin.jpeg", Price = 190 },
            new MenuItem { Name = "Green Beans & Cabbage", Description = "Vegetarian: Green beans & cabbage cooked with special house seasoning.", Category = "Main", Image = "/images/seededImages/GreenBeansCabbage.jpeg", Price = 190 },
            new MenuItem { Name = "Vegetarian Combination", Description = "Vegetarian: Combination of gourmet vegetarian dishes: Shiro, Birsin, potatoes & salad.", Category = "Main", Image = "/images/seededImages/VegetarianCombo.jpeg", Price = 210 },
            new MenuItem { Name = "Kitfo", Description = "Finely chopped lean flank steak, seasoned butter, spices, served with homemade cottage cheese.", Category = "Main", Image = "/images/seededImages/Kitfo.jpeg", Price = 230 },

            new MenuItem { Name = "Baklava", Description = "Layered pastry with nuts and honey.", Category = "Desserts", Image = "/images/seededImages/EasyBaklava-BLOG1.jpg", Price = 40 },
            new MenuItem { Name = "Chocolate Mousse Cake", Description = "Rich chocolate mousse cake.", Category = "Desserts", Image = "/images/seededImages/easy-chocolate-mousse-cake-featured.jpg", Price = 60 },

            new MenuItem { Name = "Berry Mix Smoothie", Description = "Made with refreshing milk and honey: Berry Mix.", Category = "Drinks", Image = "/images/seededImages/mixed-berry-smoothie-08.jpg", Price = 50 },
            new MenuItem { Name = "Mango Smoothie", Description = "Made with refreshing milk and honey: Mango.", Category = "Drinks", Image = "/images/seededImages/glass-of-mango-juice-and-fruits_10777862.png", Price = 70 },
            new MenuItem { Name = "Espresso", Description = "Strong espresso shot.", Category = "Drinks", Image = "/images/seededImages/Espresso.png", Price = 40 },
            new MenuItem { Name = "Cappuccino", Description = "Espresso with steamed milk foam.", Category = "Drinks", Image = "/images/seededImages/Cappuccino-exc.jpg", Price = 40 },
            new MenuItem { Name = "Apple Juice", Description = "Chilled apple juice.", Category = "Drinks", Image = "/images/seededImages/Apple Juice.jpg", Price = 30 },
            new MenuItem { Name = "Coke in a Bottle", Description = "Bottle of Coke.", Category = "Drinks", Image = "/images/seededImages/coke-de-mexico.png", Price = 40 },
            new MenuItem { Name = "Sparkling Mineral Water", Description = "Sparkling mineral water.", Category = "Drinks", Image = "/images/seededImages/Sparkling Mineral Water.jpeg", Price = 30 },
            new MenuItem { Name = "Ethiopian Sparkling Water (Ambo)", Description = "Ethiopian sparkling water.", Category = "Drinks", Image = "/images/seededImages/Ethiopian Sparkling Water (Ambo).jpeg", Price = 50 },
            new MenuItem { Name = "Soda Can (Coke/Sprite/Diet Coke)", Description = "Soda in a can: Coke, Sprite, or Diet Coke.", Category = "Drinks", Image = "/images/seededImages/SodaCanMix.jpg", Price = 30 }
        );
        db.SaveChanges();
    }
}


// Optional: if you're behind a proxy (Render), forward proto/host
app.UseForwardedHeaders(new ForwardedHeadersOptions {
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

// ------------------------------
// 5) Endepunkter
// ------------------------------
app.MapControllers();

// Dummy weather (kan fjernes)
var summaries = new[] { "Freezing","Bracing","Chilly","Cool","Mild","Warm","Balmy","Hot","Sweltering","Scorching" };

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast(
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        )).ToArray();

    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();


// Redirect the root to Swagger
app.MapGet("/", () => Results.Redirect("/swagger"));


app.Run();

// Record-type for værdata
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
