// backend/MomonaApi/Services/SportsDbClient.cs
using System.Globalization;
using System.Net.Http.Json;
using Microsoft.Extensions.Logging;
using MomonaApi.Model;

namespace MomonaApi.Services;

public class SportsDbClient : IFootballDataClient
{
    private readonly HttpClient              _http;
    private readonly ILogger<SportsDbClient> _log;

    private const int PL = 4328;
    private const int LL = 4335;
    private const string SEASON = "2025-2026";

    public SportsDbClient(HttpClient http, ILogger<SportsDbClient> log)
        => (_http, _log) = (http, log);

    public async Task<IEnumerable<SportsMatchDto>> GetUpcomingAsync(string league)
    {
        int id = league switch { "PL" => PL, "PD" => LL, _ => PL };

        // 1) prøv nest-kamper-endepunktet
        var events = await GetEvents($"eventsnextleague.php?id={id}");
        if (!events.Any())
        {
            // 2) fallback – hele sesongen
            events = await GetEvents($"eventsseason.php?id={id}&s={SEASON}");
        }

        return events.Select(e => Map(e, league))
                     .OrderBy(e => e.UtcDate);
    }

    /* ---------- helpers ---------- */

    private async Task<List<Event>> GetEvents(string relativeUrl)
    {
        var url = new Uri(_http.BaseAddress!, relativeUrl);

        _log.LogInformation("Calling {Url}", url);

        using var res = await _http.GetAsync(relativeUrl);
        if (!res.IsSuccessStatusCode)
        {
            _log.LogWarning("TheSportsDB returned {Code} for {Url}",
                            res.StatusCode, url);
            return new();
        }

        var root = await res.Content.ReadFromJsonAsync<Root>();
        return root?.Events ?? new();
    }

    private static SportsMatchDto Map(Event e, string league) => new(
        0,
        league,
        e.strHomeTeam,
        e.strAwayTeam,
        DateTime.Parse($"{e.dateEvent}T{e.strTime}Z",
                       null, DateTimeStyles.AdjustToUniversal),
        e.strVenue,
        null,
        false);

    private record Root(List<Event> Events);

    private record Event(
        string idEvent,
        string strHomeTeam,
        string strAwayTeam,
        string dateEvent,
        string strTime,
        string strVenue);
}
