using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Persistence.UnitOfWorks
{
    using Microsoft.EntityFrameworkCore;
    using System.Linq.Expressions;

    public class RepositoryData<T> : IRepository<T> where T : class
    {
        private readonly ApplicationDbContext _db;
        private readonly DbSet<T> _dbSet;

        public RepositoryData(ApplicationDbContext context)
        {
            _db = context;
            _dbSet = _db.Set<T>();
        }

        public async Task AddEntityAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public async Task DeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
            await Task.CompletedTask;
        }

        public async Task RemoveRangeAsync(IEnumerable<T> entities)
        {
            _dbSet.RemoveRange(entities);
            await Task.CompletedTask;
        }

        public async Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>> filterExpression, string includeProperties = null)
        {
            IQueryable<T> query = _dbSet;

            query = query.Where(filterExpression);

            if (!string.IsNullOrEmpty(includeProperties))
            {
                foreach (var includeNavigationProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeNavigationProperty);
                }
            }

            return await query.FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync(string includeProperties = null)
        {
            IQueryable<T> query = _dbSet;

            if (!string.IsNullOrEmpty(includeProperties))
            {
                foreach (var includeNavigationProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeNavigationProperty);
                }
            }

            return await query.ToListAsync();
        }
    }

}
