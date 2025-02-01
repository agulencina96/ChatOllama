using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Message : Base
{
    public string? Content { get; set; }
    public Guid ChatId { get; set; }
    public Chat Chat { get; set; } = null!;
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    
    public string Response { get; set; } = null!;

}