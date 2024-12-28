using Microsoft.AspNetCore.Mvc;

namespace API.Features;

[ApiController]
[Route("api/[controller]")]
public class Ping : ControllerBase
{
    public interface IPingResponse
    {
        string Message { get; set; }
    }
    [HttpGet]
    public ActionResult<IPingResponse> Get()
    {
        return Ok(new { Message = "Pong" });
    }
}