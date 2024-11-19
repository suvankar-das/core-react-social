using Application.Activities;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.UnitOfWorks;

namespace API.ExtensionMethods
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,IConfiguration configuration,string CORS_NAME,string ALLOWED_HOST)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

           

            services.AddDbContext<ApplicationDbContext>(option =>
            {
                option.UseSqlServer(configuration.GetConnectionString("DefaultConnectionString"));
            });


            services.AddCors(option =>
            {
                option.AddPolicy(CORS_NAME, policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins(ALLOWED_HOST);
                });
            });

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            // mediatr
            services.AddMediatR(config => config.RegisterServicesFromAssemblies(typeof(List.Handler).Assembly));
            // add auto mapper service
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}
