// Models/SportsMatch.cs
public class SportsMatch
{
    public int      Id         { get; set; }
    public string   LeagueCode { get; set; } = "";   // "PL", "PD" osv.
    public string   HomeTeam   { get; set; } = "";
    public string   AwayTeam   { get; set; } = "";
    public DateTime UtcDate    { get; set; }         // alltid UTC
    public string?  Venue      { get; set; }
    public string?  ImageUrl   { get; set; }         // manuell opplasting
    public bool     IsHidden   { get; set; }
    public bool     IsExternal { get; set; }         // true = hentet fra API
}

// DTO – hva du sender tilbake til React
public record SportsMatchDto(
    int    Id,
    string LeagueCode,
    string HomeTeam,
    string AwayTeam,
    DateTime UtcDate,
    string? Venue,
    string? ImageUrl,
    bool   IsHidden
);
