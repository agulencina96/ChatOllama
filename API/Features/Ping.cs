using FastEndpoints;

namespace API.Features;

public record PingRes
{
    public string Message { get; init; } = null!;
}

public class Ping : Endpoint<EmptyRequest, PingRes>
{   
    public override void Configure()
    {
        Get("/ping");
        AllowAnonymous();
    }

    public override async Task HandleAsync(EmptyRequest req, CancellationToken ct)
    {

        await SendAsync(new PingRes
        {
            Message = "Pong"
        }, cancellation: ct);
    }
}