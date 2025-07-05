public class GameStatus
{
    public int Id { get; set; }
    public string GameType { get; set; } = "";
    public int AvailableCount { get; set; }
    public List<string> Queue { get; set; } = new();
    public string? CurrentPlayer { get; set; }
    public DateTime? TakenAt { get; set; }
}
