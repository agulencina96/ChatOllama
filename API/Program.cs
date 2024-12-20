using API;
using Microsoft.EntityFrameworkCore;

DotNetEnv.Env.Load();
var builder = WebApplication.CreateBuilder(args);

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


app.MapGet("/ping", () => "pong");

app.Run();
