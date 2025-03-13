namespace API.Entities;

public class Message : Base
{
    public required string Content { get; set; }
    public Guid ChatId { get; set; }
    public Chat Chat { get; set; } = null!;
    public string? Response { get; set; }
    public required string ModelName { get; set; }

}