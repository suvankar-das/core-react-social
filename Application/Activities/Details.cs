using Application.Core;
using MediatR;
using Persistence.UnitOfWorks;
using Domain;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<Activity>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly IUnitOfWork _unitOfWork;

            public Handler(IUnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _unitOfWork.ActivityRepository.GetFirstOrDefaultAsync(x => x.Id == request.Id);
                return Result<Activity>.Success(activity);
            }
        }
    }
}
