using FastEndpoints;

namespace API.Features;

sealed class GetAllChats(DataContext db) : Endpoint<EmptyRequest,EmptyResponse>
{
    public override void Configure()
    {
        Get("/chats/");
        AllowAnonymous();
    }
    
    public override async Task HandleAsync(EmptyRequest req, CancellationToken ct)
    {
        throw new NotImplementedException();
    }
}