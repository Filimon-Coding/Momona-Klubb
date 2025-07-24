// backend/MomonaApi/Services/MatchService.cs
using Microsoft.EntityFrameworkCore;
using MomonaApi.DAL;
using MomonaApi.Model;

namespace MomonaApi.Services;

public interface IMatchService
{
    Task<IEnumerable<SportsMatchDto>> GetUpcomingAsync(string league, bool includeHidden);
    Task<SportsMatchDto> CreateAsync(SportsMatchDto dto);
    Task UpdateAsync(int id, SportsMatchDto dto);
    Task DeleteAsync(int id);
}

public class MatchService : IMatchService
{
    private readonly AppDbContext        _db;
    private readonly IFootballDataClient _ext;

    public MatchService(AppDbContext db, IFootballDataClient ext)
        => (_db, _ext) = (db, ext);

    public async Task<IEnumerable<SportsMatchDto>> GetUpcomingAsync(string league, bool includeHidden)
    {
        var manual = await _db.SportsMatches
            .Where(m => m.LeagueCode == league && (includeHidden || !m.IsHidden))
            .AsNoTracking()
            .Select(m => new SportsMatchDto(
                m.Id, m.LeagueCode, m.HomeTeam, m.AwayTeam,
                m.UtcDate, m.Venue, m.ImageUrl, m.IsHidden))
            .ToListAsync();                   // ← materialiser query her!

        var external = await _ext.GetUpcomingAsync(league);

        return manual.Concat(external).OrderBy(m => m.UtcDate);
    }

    public async Task<SportsMatchDto> CreateAsync(SportsMatchDto dto)
    {
        var ent = new SportsMatch
        {
            LeagueCode = dto.LeagueCode,
            HomeTeam   = dto.HomeTeam,
            AwayTeam   = dto.AwayTeam,
            UtcDate    = dto.UtcDate,
            Venue      = dto.Venue,
            ImageUrl   = dto.ImageUrl,
            IsHidden   = dto.IsHidden,
            IsExternal = false
        };
        _db.SportsMatches.Add(ent);
        await _db.SaveChangesAsync();
        return dto with { Id = ent.Id };
    }

    public async Task UpdateAsync(int id, SportsMatchDto dto)
    {
        var ent = await _db.SportsMatches.FindAsync(id)
                  ?? throw new KeyNotFoundException();

        ent.HomeTeam = dto.HomeTeam;
        ent.AwayTeam = dto.AwayTeam;
        ent.UtcDate  = dto.UtcDate;
        ent.Venue    = dto.Venue;
        ent.ImageUrl = dto.ImageUrl;
        ent.IsHidden = dto.IsHidden;

        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var ent = await _db.SportsMatches.FindAsync(id);
        if (ent is null) return;
        _db.SportsMatches.Remove(ent);
        await _db.SaveChangesAsync();
    }
}
