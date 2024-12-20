namespace API.Entities;

public class User : Base
{   
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public ICollection<Chat> Chats { get; set; } = null!;
    public ICollection<Message> Messages { get; set; } = null!;
}