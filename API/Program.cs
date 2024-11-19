using API.ExtensionMethods;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

string CORS_NAME = "CorsPolicy";
string ALLOWED_HOST = "http://localhost:3000";


// using extension method
builder.Services.AddApplicationServices(builder.Configuration, CORS_NAME,ALLOWED_HOST);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseCors(CORS_NAME);

app.UseAuthorization();

// In Persistence project , We could use update-database command , but here I am doing it programmatically.
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

// try to create db
try
{
    var context = services.GetRequiredService<ApplicationDbContext>();
    await context.Database.MigrateAsync();
    // seed
    await Seed.SeedData(context);
}
catch (Exception e)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(e,"An error occured during migration");
}

app.MapControllers();

app.Run();
