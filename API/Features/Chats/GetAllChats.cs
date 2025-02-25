using Microsoft.AspNetCore.Mvc;

namespace API.Features.Chats;

[Route("chats/[controller]")]
[ApiController]
public class GetAllChats(DataContext context) : ControllerBase
{
    [HttpGet]
    public ActionResult<IGetAllChatsResponse> Get(
    )
    {
        var chats = context.Chats.Select(
            c => new Chat
            {
                Id = c.Id,
                Name = c.Name
            }
        );

        return Ok(new { Chats = chats });
    }

    public interface IGetAllChatsResponse
    {
        IEnumerable<Chat> Chats { get; set; }
    }

    public class Chat
    {
        public Guid Id { set; get; }
        public required string Name { set; get; }
    }
}