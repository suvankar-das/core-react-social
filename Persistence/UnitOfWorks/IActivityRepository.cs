using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Persistence.UnitOfWorks
{
    public interface IActivityRepository : IRepository<Activity>
    {
        Task<int> Update(Activity activity);
    }
}
