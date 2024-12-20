using FastEndpoints;
using Microsoft.Extensions.AI;
using OllamaSharp;
using OllamaSharp.Models.Chat;
using static System.String;
using Message = API.Entities.Message;

namespace API.Features;

public record SendMessageReq
{ 
    public string Content { get; init; } = null!;
    public Guid ChatId { get; init; }
    public Guid UserId { get; init; }
}

public record SendMessageRes
{
    public string Message { get; init; } = null!;
}


sealed class SendMessage(DataContext db, HttpClient httpClient) : Endpoint<SendMessageReq, SendMessageRes>
{
    public override void Configure()
    {
        Post("/chat/send-message");
        AllowAnonymous();
    }

    public override async Task HandleAsync(SendMessageReq req, CancellationToken ct)
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

        await SendAsync(new SendMessageRes()
        {
            Message = response
        }, cancellation: ct);
        
    }
}