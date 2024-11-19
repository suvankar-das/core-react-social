using MediatR;
using Persistence.UnitOfWorks;
using Domain;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly IUnitOfWork _unitOfWork;

            public Handler(IUnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<Domain.Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _unitOfWork.ActivityRepository.GetFirstOrDefaultAsync(x => x.Id == request.Id);
            }
        }
    }
}
