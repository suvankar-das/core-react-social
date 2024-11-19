using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence.UnitOfWorks;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly IUnitOfWork _unitOfWork;
            private readonly IMapper _mapper;

            public Handler(IUnitOfWork unitOfWork,IMapper mapper)
            {
                _unitOfWork = unitOfWork;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activityFromDb =
                    await _unitOfWork.ActivityRepository.GetFirstOrDefaultAsync(x => x.Id == request.Activity.Id);

                //activityFromDb.Title = request.Activity.Title ?? activityFromDb.Title;
                // Use Auto Mapper
                _mapper.Map(request.Activity, activityFromDb);

                await _unitOfWork.ActivityRepository.Update(activityFromDb);
                await _unitOfWork.Save();
            }
        }
    }
}
