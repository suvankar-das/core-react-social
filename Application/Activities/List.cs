using Domain;
using MediatR;
using Persistence.UnitOfWorks;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>>
        {

        }


        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly IUnitOfWork _unitOfWork;

            public Handler(IUnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _unitOfWork.ActivityRepository.GetAllAsync("");

            }
        }
    }
}
