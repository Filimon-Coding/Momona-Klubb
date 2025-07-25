using MomonaApi.Model;
using Microsoft.EntityFrameworkCore;
using MomonaApi.DAL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MomonaApi.Services;

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
    options.UseSqlite("Data Source=menu.db"));


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
        // Main
        new MenuItem { Name = "Injera Special", Description = "Ethiopian injera with spicy lentils and vegetables.", Category = "Main", Image = "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee", Price = 129 },
        new MenuItem { Name = "Spaghetti Bolognese", Description = "Italian pasta with meat sauce.", Category = "Main", Image = "https://images.unsplash.com/photo-1603133872878-684f208fb84b", Price = 149 },
        new MenuItem { Name = "Grilled Chicken", Description = "Juicy grilled chicken with herbs and seasonal vegetables.", Category = "Main", Image = "https://images.unsplash.com/photo-1600891964599-f61ba0e24092", Price = 169 },
        new MenuItem { Name = "Veggie Burger", Description = "Plant-based burger with lettuce, tomato, and avocado.", Category = "Main", Image = "https://images.unsplash.com/photo-1550547660-d9450f859349", Price = 139 },
        new MenuItem { Name = "Pasta Alfredo", Description = "Creamy alfredo pasta with mushrooms and parmesan.", Category = "Main", Image = "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee", Price = 159 },
        new MenuItem { Name = "Tibs (Ethiopian Stir Fry)", Description = "Tender beef cubes sautéed with onion, garlic, and pepper.", Category = "Main", Image = "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee", Price = 179 },

        // Drinks
        new MenuItem { Name = "Mango Juice", Description = "Fresh mango juice, served cold.", Category = "Drinks", Image = "https://images.unsplash.com/photo-1615485293112-1a4c8d64c1ee", Price = 49 },
        new MenuItem { Name = "Coca Cola", Description = "Chilled bottle of Coca Cola.", Category = "Drinks", Image = "https://images.unsplash.com/photo-1600891964599-f61ba0e24092", Price = 35 },
        new MenuItem { Name = "Orange Fanta", Description = "Refreshing sparkling orange soda.", Category = "Drinks", Image = "https://images.unsplash.com/photo-1615485293112-1a4c8d64c1ee", Price = 35 },
        new MenuItem { Name = "Water Bottle", Description = "Still mineral water, 0.5L.", Category = "Drinks", Image = "https://images.unsplash.com/photo-1615485293112-1a4c8d64c1ee", Price = 25 },
        new MenuItem { Name = "Cappuccino", Description = "Hot cappuccino with milk foam and cinnamon.", Category = "Drinks", Image = "https://images.unsplash.com/photo-1615485293112-1a4c8d64c1ee", Price = 42 },

        // Desserts
        new MenuItem { Name = "Tiramisu", Description = "Classic Italian dessert with coffee and mascarpone.", Category = "Desserts", Image = "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee", Price = 69 },
        new MenuItem { Name = "Baklava", Description = "Layered pastry with nuts and honey.", Category = "Desserts", Image = "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee", Price = 55 },
        new MenuItem { Name = "Fruit Salad", Description = "Seasonal fresh fruits served chilled.", Category = "Desserts", Image = "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee", Price = 45 },
        new MenuItem { Name = "Chocolate Cake", Description = "Rich chocolate cake with ganache topping.", Category = "Desserts", Image = "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee", Price = 59 }
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
