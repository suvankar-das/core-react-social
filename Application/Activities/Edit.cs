using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence.UnitOfWorks;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }


        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly IUnitOfWork _unitOfWork;
            private readonly IMapper _mapper;

            public Handler(IUnitOfWork unitOfWork,IMapper mapper)
            {
                _unitOfWork = unitOfWork;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activityFromDb = await _unitOfWork.ActivityRepository.GetFirstOrDefaultAsync(x => x.Id == request.Activity.Id);

                //activityFromDb.Title = request.Activity.Title ?? activityFromDb.Title;
                // Use Auto Mapper

                if (activityFromDb == null)
                {
                    return null;
                }
                _mapper.Map(request.Activity, activityFromDb);
                var result = await _unitOfWork.ActivityRepository.Update(activityFromDb) > 0;
                
                if (!result)
                {
                    return Result<Unit>.Failure("Failed to update activity");
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
