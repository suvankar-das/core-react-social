using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _db;

        public IActivityRepository ActivityRepository { get; }

        public UnitOfWork(ApplicationDbContext context)
        {
            _db = context;
            ActivityRepository = new ActivityRepository(_db);
        }

        public async Task Save()
        {
            await _db.SaveChangesAsync(); 
        }
    }

}
