using FastEndpoints;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.AI;
using OllamaSharp;
using Message = API.Entities.Message;

namespace API.Features;

public record SendMessageReq
{ 
    public string? Content { get; init; } = null!;
    public Guid ChatId { get; init; }
    public Guid UserId { get; init; }
}

public record SendMessageRes
{
    public string Message { get; init; } = null!;
}

[ApiController]
[Route("api/[controller]")]
public class SendMessageController(DataContext db, HttpClient httpClient) : ControllerBase
{
    [HttpPost("send")]
    public async Task<IActionResult> Index(SendMessageReq req, CancellationToken ct)
    {   
        
        var ollama = new OllamaApiClient(new Uri("http://localhost:11434"));
        ollama.SelectedModel = "llama3.2:1b";

        var response = (await ollama.CompleteAsync(req.Content, cancellationToken: ct)).Message.Text;
        
        var newMessage = db.Messages.Add(new Message()
        {
            Content = req.Content,
            ChatId = req.ChatId,
            UserId = req.UserId,
            Response = response,
        });

        await db.SaveChangesAsync(ct);

        return Ok(new SendMessageRes()
        {
            Message = "Message sent"
        });
        
    }
}