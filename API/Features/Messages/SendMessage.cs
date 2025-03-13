using Microsoft.AspNetCore.Mvc;
using OllamaSharp;
using OllamaSharp.Models.Chat;

namespace API.Features.Messages;

[Route("messages/[controller]")]
[ApiController]
public class SendMessage(DataContext context, OllamaApiClient ollamaApiClient) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<SendMessageResponse>> Post(
        [FromBody] SendMessageRequest request
    )
    {
        var previousMessages = context.Messages
            .Where(m => m.ChatId == request.ChatId)
            .ToList();

        var ollamaPreviousMessages = previousMessages
            .Aggregate(
            new List<OllamaSharp.Models.Chat.Message>(), (acc, m) =>
            {
                acc.Add(new OllamaSharp.Models.Chat.Message(ChatRole.User, m.Content ?? ""));
                acc.Add(new OllamaSharp.Models.Chat.Message(ChatRole.Assistant, m.Response ?? ""));
                return acc;
            });

        ollamaApiClient.SelectedModel = request.ModelName;

        var chat = new Chat(ollamaApiClient);

        chat.Messages.AddRange(ollamaPreviousMessages);

        var response = "";
        await foreach (var generatedResponse in chat.SendAsync(request.Text))
        {
            response += generatedResponse;
        }

        var message = new Entities.Message
        {
            Content = request.Text,
            ChatId = request.ChatId,
            Response = response,
            ModelName = request.ModelName
        };

        previousMessages.Add(message);

        context.Messages.Add(message);
        context.SaveChanges();

        return Ok(new SendMessageResponse
        {
            Messages = previousMessages.Select(
                m => new Message
                {
                    Text = m.Content,
                    Response = m.Response
                }
            )
        });
    }

    public class SendMessageRequest
    {
        public required string Text { get; set; }
        public required Guid ChatId { get; set; }

        public required string ModelName { get; set; }
    }

    public class SendMessageResponse
    {
        public required IEnumerable<Message> Messages { get; set; }
    }


    public class Message
    {
        public string? Text { get; set; }
        public string? Response { get; set; }
    }
}