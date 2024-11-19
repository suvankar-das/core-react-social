using MediatR;
using Persistence.UnitOfWorks;
using Domain;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IUnitOfWork _unitOfWork;

            public Handler(IUnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _unitOfWork.ActivityRepository.AddEntity(request.Activity);
                await _unitOfWork.Save();
            }
        }
    }
}
