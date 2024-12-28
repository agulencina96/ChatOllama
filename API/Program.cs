using API;
using Microsoft.EntityFrameworkCore;

DotNetEnv.Env.Load();
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
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
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
