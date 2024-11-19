namespace API.ExtensionMethods
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,IConfiguration configuration)
        {

            services.AddEndpointsApiExplorer();
        }
    }
}
