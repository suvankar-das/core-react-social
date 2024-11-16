using System.Linq.Expressions;

namespace Persistence.UnitOfWorks
{
    public interface IRepository<T> where T : class
    {
        Task AddEntityAsync(T entity);
        Task DeleteAsync(T entity);
        Task RemoveRangeAsync(IEnumerable<T> entities);

        Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>> filterExpression, string includeProperties = null);

        Task<IEnumerable<T>> GetAllAsync(string includeProperties = null);
    }
}