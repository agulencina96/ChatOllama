namespace API.Entities;

public class Chat : Base
{
    public string Name { get; set; } = null!;
    public ICollection<Message> Messages { get; init; } = null!;
}