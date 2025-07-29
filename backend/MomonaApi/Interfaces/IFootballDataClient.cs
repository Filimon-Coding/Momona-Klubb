// backend/MomonaApi/Services/IFootballDataClient.cs
using MomonaApi.Model;

namespace MomonaApi.Services;

public interface IFootballDataClient
{
    Task<IEnumerable<SportsMatchDto>> GetUpcomingAsync(string leagueCode);
}
