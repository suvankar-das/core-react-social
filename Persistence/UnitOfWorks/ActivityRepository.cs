using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Persistence.UnitOfWorks
{
    public class ActivityRepository : RepositoryData<Activity>, IActivityRepository
    {
        private readonly ApplicationDbContext _db;

        public ActivityRepository(ApplicationDbContext context) : base(context)
        {
            _db = context;
        }

        public async Task<int> Update(Activity activity)
        {
            _db.TblActivity.Update(activity);
            return await _db.SaveChangesAsync(); 
        }
    }

}
