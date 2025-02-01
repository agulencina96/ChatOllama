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
    public ActionResult<IPingResponse> Get() => Ok(new { Message = "Pong" });
    
    [HttpPost]
    public ActionResult<IPingResponse> Post() => Ok(new { Message = "Pong" });
}