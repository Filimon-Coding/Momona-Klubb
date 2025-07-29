// backend/MomonaApi/Interfaces/IMatchService.cs
using MomonaApi.Model;

namespace MomonaApi.Interfaces
{
    public interface IMatchService
    {
        Task<IEnumerable<SportsMatchDto>> GetUpcomingAsync(string league, bool includeHidden);
        Task<SportsMatchDto> CreateAsync(SportsMatchDto dto);
        Task UpdateAsync(int id, SportsMatchDto dto);
        Task DeleteAsync(int id);
    }
}
