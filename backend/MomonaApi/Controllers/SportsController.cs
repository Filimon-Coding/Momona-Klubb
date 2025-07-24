// backend/MomonaApi/Controllers/SportsController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MomonaApi.Model;
using MomonaApi.Services;

namespace MomonaApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SportsController : ControllerBase
{
    private readonly IMatchService _svc;
    public SportsController(IMatchService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> Get(string league = "PL", bool all = false)
        => Ok(await _svc.GetUpcomingAsync(league, all));

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] SportsMatchDto dto)
    {
        var created = await _svc.CreateAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] SportsMatchDto dto)
    {
        await _svc.UpdateAsync(id, dto);
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _svc.DeleteAsync(id);
        return NoContent();
    }

    // Controllers/LogoProxyController.cs
    [Route("api/logo")]
    public class LogoProxyController : ControllerBase
    {
        private readonly IHttpClientFactory _fac;
        private readonly IConfiguration _cfg;
        public LogoProxyController(IHttpClientFactory fac, IConfiguration cfg) => (_fac,_cfg)=(fac,cfg);

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string team)
        {
            var key = "123";                                // ev. config
            var url = $"https://www.thesportsdb.com/api/v1/json/{key}/searchteams.php?t={Uri.EscapeDataString(team)}";
            var http = _fac.CreateClient();
            var json = await http.GetStringAsync(url);
            return Content(json, "application/json");
        }
    }

}
