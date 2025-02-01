namespace API.Entities;

public class Chat : Base
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public ICollection<Message> Messages { get; init; } = null!;
}