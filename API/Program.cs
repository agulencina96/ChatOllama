using API;
using Microsoft.EntityFrameworkCore;

DotNetEnv.Env.Load();
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddScoped(_ =>
    new HttpClient
    {
        BaseAddress = new Uri("http://localhost:11434")
    });
builder.Services.AddOpenApi();
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

if (connectionString is null)
{
    throw new Exception("DB_CONNECTION_STRING is not set");
}

builder.Services.AddDbContextPool<DataContext>(opt => 
    opt.UseNpgsql(connectionString));
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseHttpsRedirection();
app.Run();
