namespace MomonaApi.Model
{
    public class MenuItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public string Image { get; set; } = "";
        public string Category { get; set; } = "";
        public int Price { get; set; }
        public bool IsHidden { get; set; } = false; 
    }
}
