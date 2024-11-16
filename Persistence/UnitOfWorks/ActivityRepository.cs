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

        public async Task Update(Activity activity)
        {
            _db.TblActivity.Update(activity);
            await _db.SaveChangesAsync(); 
        }
    }

}
