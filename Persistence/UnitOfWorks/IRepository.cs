using System.Linq.Expressions;

namespace Persistence.UnitOfWorks
{
    public interface IRepository<T> where T : class
    {
        void AddEntity(T entity);
        Task DeleteAsync(T entity);
        Task RemoveRangeAsync(List<T> entities);

        Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>> filterExpression, string includeProperties = null);

        Task<List<T>> GetAllAsync(string includeProperties = null);
    }
}