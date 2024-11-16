using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.UnitOfWorks
{
    public interface IUnitOfWork 
    {
        IActivityRepository ActivityRepository { get; }

        Task Save();
    }
}
