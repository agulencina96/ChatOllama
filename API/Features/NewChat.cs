using API.Entities;
using FastEndpoints;

namespace API.Features;

record NewChatRes
{
    public Guid ChatId { get; init; }
}


sealed class NewChat(DataContext db) : Endpoint<EmptyRequest, NewChatRes>
{
    public override void Configure()
    {
        Post("/chats/new");
        AllowAnonymous();
    }

    public override async Task HandleAsync(EmptyRequest req, CancellationToken ct)
    {

        var newChat = db.Chats.Add(new Chat()
        {
            UserId = Guid.NewGuid(),
            
        });

        await db.SaveChangesAsync(ct);

        await SendAsync(new NewChatRes()
        {
            ChatId = newChat.Entity.Id
        }, cancellation: ct);
    }
}