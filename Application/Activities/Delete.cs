using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence.UnitOfWorks;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
    }

    public class Handler : IRequestHandler<Delete.Command,Result<Unit>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public Handler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<Result<Unit>> Handle(Delete.Command request, CancellationToken cancellationToken)
        {
            var itemToBeDeleted = await  _unitOfWork.ActivityRepository.GetFirstOrDefaultAsync(d => d.Id == request.Id);
            if (itemToBeDeleted == null)
            {
                return null;
            }

            await _unitOfWork.ActivityRepository.DeleteAsync(itemToBeDeleted);
            var result = await _unitOfWork.Save() > 0;

            if (!result)
            {
                return Result<Unit>.Failure("Failed to delete the activity");
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
