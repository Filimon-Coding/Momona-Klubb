public class GameStatus
{
    public int Id { get; set; }
    public string GameType { get; set; } = "";  // "Pool", "Foosball", "Cards"
    public int AvailableCount { get; set; }
    public List<string> Queue { get; set; } = new();
}
