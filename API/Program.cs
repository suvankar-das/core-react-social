using Application.Activities;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.UnitOfWorks;

var builder = WebApplication.CreateBuilder(args);



// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string CORS_NAME = "CorsPolicy";
string ALLOWED_HOST = "http://localhost:3000";


builder.Services.AddDbContext<ApplicationDbContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionString"));
});


builder.Services.AddCors(option =>
{
    option.AddPolicy(CORS_NAME, policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins(ALLOWED_HOST);
    });
});

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
// mediatr
builder.Services.AddMediatR(config => config.RegisterServicesFromAssemblies(typeof(List.Handler).Assembly));
// add auto mapper service
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

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
