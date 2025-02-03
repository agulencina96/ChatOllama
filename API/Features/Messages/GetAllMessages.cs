using Microsoft.AspNetCore.Mvc;

namespace API.Features.Messages;

[Route("messages/[controller]")]
[ApiController]
public class GetAllMessages(DataContext context) : ControllerBase
{
    [HttpGet]
    public ActionResult<IGetAllMessagesResponse> Get(
        [FromQuery] Guid chatId
    )
    {
        var messages = context.Messages
            .Where(m => m.ChatId == chatId).Select(
                m => new Message
                {
                    Text = m.Content,
                    Response = m.Response
                }
            );

        return Ok(new { Messages = messages });
    }

    public class Message
    {
        public string? Text { set; get; }
        public string? Response { set; get; }
    }

    public interface IGetAllMessagesResponse
    {
        IEnumerable<Message> Messages { get; set; }
    }
}