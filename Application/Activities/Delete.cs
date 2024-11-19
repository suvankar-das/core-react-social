using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Persistence.UnitOfWorks;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
    }

    public class Handler : IRequestHandler<Delete.Command>
    {
        private readonly IUnitOfWork _unitOfWork;

        public Handler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task Handle(Delete.Command request, CancellationToken cancellationToken)
        {
            var itemToBeDeleted = await  _unitOfWork.ActivityRepository.GetFirstOrDefaultAsync(d => d.Id == request.Id);
            await _unitOfWork.ActivityRepository.DeleteAsync(itemToBeDeleted);
            await _unitOfWork.Save();
        }
    }
}
