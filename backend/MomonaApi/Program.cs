using MomonaApi.Model;
using Microsoft.EntityFrameworkCore;
using MomonaApi.DAL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MomonaApi.Services;
using MomonaApi.Interfaces;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthorization();


// Registrer nødvendige tjenester
builder.Services.AddEndpointsApiExplorer();       // Swagger support
builder.Services.AddSwaggerGen();                 // Swagger UI
builder.Services.AddControllers();                // Aktiver API-kontrollere

// CORS-policy for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader());
});

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes("dsfkjdkjfDSDDsxkcxnc zmxSADASDajhk!!%#ldfjdfjkjdfSdfsQQWeqwexczcQQQAsdpn!#"))
        };
    });

    const string SPORTSDB_KEY = "123";                    // ← din nye nøkkel

builder.Services.AddHttpClient<IFootballDataClient, SportsDbClient>(c =>
{
    // NB! nøkkelen står rett etter /json/
    c.BaseAddress = new Uri($"https://www.thesportsdb.com/api/v1/json/{SPORTSDB_KEY}/");
});

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite("Data Source=menu.db"));

builder.Services.AddScoped<IMatchService, MatchService>();

builder.Services.AddHttpClient<IFootballDataClient, SportsDbClient>(c =>
{
    const string SPORTSDB_KEY = "123";
    c.BaseAddress = new Uri($"https://www.thesportsdb.com/api/v1/json/{SPORTSDB_KEY}/");
});




builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=momona.db"));



var app = builder.Build();

// Bruk Swagger i utviklingsmiljø
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();  // slik at bilder i wwwroot/images/ kan vises i frontend
// Aktiver CORS før kontrollerendepunkter
app.UseCors("AllowFrontend");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
    
    
    if (!db.MenuItems.Any())
    {
db.MenuItems.AddRange(
    new MenuItem { Name = "Injerito", Description = "A portion of selected house vegetables specially wrapped with injera.", Category = "Main", Image = "http://localhost:5272/images/seededImages/Injerito.jpeg", Price = 70 },
    new MenuItem { Name = "Samosa", Description = "Vegetarian: 4 pieces—triangle wrap deep-fried till golden crispy. Stuffed with onions, lentils, and pepper.", Category = "Main", Image = "http://localhost:5272/images/seededImages/Samosa.jpeg", Price = 100 },
    new MenuItem { Name = "Shiro", Description = "Vegetarian: A delicious puree made from garbanzo beans (chickpeas) seasoned to perfection.", Category = "Main", Image = "http://localhost:5272/images/seededImages/Shiro.jpeg", Price = 210 },
    new MenuItem { Name = "Birsin (Spicy / Mid)", Description = "Vegetarian: Split lentil stew prepared with homemade spices and seasoned to perfection.", Category = "Main", Image = "http://localhost:5272/images/seededImages/Birsin.jpeg", Price = 190 },
    new MenuItem { Name = "Green Beans & Cabbage", Description = "Vegetarian: Green beans & cabbage cooked with special house seasoning.", Category = "Main", Image = "http://localhost:5272/images/seededImages/GreenBeansCabbage.jpeg", Price = 190 },
    new MenuItem { Name = "Vegetarian Combination", Description = "Vegetarian: Combination of gourmet vegetarian dishes: Shiro, Birsin, potatoes & salad.", Category = "Main", Image = "http://localhost:5272/images/seededImages/VegetarianCombo.jpeg", Price = 210 },
    new MenuItem { Name = "Kitfo", Description = "Finely chopped lean flank steak, seasoned butter, spices, served with homemade cottage cheese.", Category = "Main", Image = "http://localhost:5272/images/seededImages/Kitfo.jpeg", Price = 230 },

    new MenuItem { Name = "Baklava", Description = "Layered pastry with nuts and honey.", Category = "Desserts", Image = "http://localhost:5272/images/seededImages/EasyBaklava-BLOG1.jpg", Price = 40 },
    new MenuItem { Name = "Chocolate Mousse Cake", Description = "Rich chocolate mousse cake.", Category = "Desserts", Image = "http://localhost:5272/images/seededImages/easy-chocolate-mousse-cake-featured.jpg", Price = 60 },

    new MenuItem { Name = "Berry Mix Smoothie", Description = "Made with refreshing milk and honey: Berry Mix.", Category = "Drinks", Image = "http://localhost:5272/images/seededImages/mixed-berry-smoothie-08.jpg", Price = 50 },
    new MenuItem { Name = "Mango Smoothie", Description = "Made with refreshing milk and honey: Mango.", Category = "Drinks", Image = "http://localhost:5272/images/seededImages/glass-of-mango-juice-and-fruits_10777862.png", Price = 70 },
    new MenuItem { Name = "Espresso", Description = "Strong espresso shot.", Category = "Drinks", Image = "http://localhost:5272/images/seededImages/Espresso.png", Price = 40 },
    new MenuItem { Name = "Cappuccino", Description = "Espresso with steamed milk foam.", Category = "Drinks", Image = "http://localhost:5272/images/seededImages/Cappuccino-exc.jpg", Price = 40 },
    new MenuItem { Name = "Apple Juice", Description = "Chilled apple juice.", Category = "Drinks", Image = "http://localhost:5272/images/seededImages/Apple Juice.jpg", Price = 30 },
    new MenuItem { Name = "Coke in a Bottle", Description = "Bottle of Coke.", Category = "Drinks", Image = "http://localhost:5272/images/seededImages/coke-de-mexico.png", Price = 40 },
    new MenuItem { Name = "Sparkling Mineral Water", Description = "Sparkling mineral water.", Category = "Drinks", Image = "http://localhost:5272/images/seededImages/Sparkling Mineral Water.jpeg", Price = 30 },
    new MenuItem { Name = "Ethiopian Sparkling Water (Ambo)", Description = "Ethiopian sparkling water.", Category = "Drinks", Image = "http://localhost:5272/images/seededImages/Ethiopian Sparkling Water (Ambo).jpeg", Price = 50 },
    new MenuItem { Name = "Soda Can (Coke/Sprite/Diet Coke)", Description = "Soda in a can: Coke, Sprite, or Diet Coke.", Category = "Drinks", Image = "http://localhost:5272/images/seededImages/SodaCanMix.jpg", Price = 30 }
);
db.SaveChanges();



    }
}


app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();


// ✅ Aktiver kontrollerbaserte endepunkter som /api/menuitems
app.MapControllers();

// Dummy test-endepunkt (kan beholdes for værdata)
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild",
    "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();

    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

// Start applikasjonen
app.Run();

// Record-type for værdata
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
