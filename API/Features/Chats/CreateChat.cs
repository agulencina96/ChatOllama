using Microsoft.AspNetCore.Mvc;

namespace API.Features.Chats;

[Route("chats/[controller]")]
[ApiController]
public class CreateChat(DataContext context) : ControllerBase
{
    [HttpPost]
    public ActionResult<CreateChatResponse> Post(
        [FromBody] CreateChatRequest request
    )
    {
        var chat = new Entities.Chat
        {
            Name = request.Name,
        };

        context.Chats.Add(chat);
        context.SaveChanges();

        return Ok(new CreateChatResponse
        {
            ChatId = chat.Id
        });
    }

    public class CreateChatRequest
    {
        public required string Name { get; set; }

    }

    public class CreateChatResponse
    {
        public required Guid ChatId { get; set; }
    }

}