var builder = WebApplication.CreateBuilder(args);

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

var app = builder.Build();

// Bruk Swagger i utviklingsmiljø
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Aktiver CORS før kontrollerendepunkter
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

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
