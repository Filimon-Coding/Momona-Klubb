namespace MomonaApi.Model
{
    public class User
    {
        public int Id { get; set; }  // primærnøkkel
        public string Name { get; set; } = "";
        public string Surname { get; set; } = "";
        public string Email { get; set; } = "";
        public string Phone { get; set; } = "";
    }
}
