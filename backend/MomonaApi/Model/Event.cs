public class Event
{
    public int      Id          { get; set; }
    public string   Title       { get; set; } = "";
    public DateTime StartsAt    { get; set; }
    public string   Description { get; set; } = "";
    public string   ImageUrl    { get; set; } = "";
    public bool     IsHidden    { get; set; } 
}
