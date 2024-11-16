using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Persistence.UnitOfWorks;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public ActivitiesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            var activities = await _unitOfWork.ActivityRepository.GetAllAsync();
            return Ok(activities.ToList());
        }


        [HttpGet("{Id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid Id)
        {
            var activity = await _unitOfWork.ActivityRepository.GetFirstOrDefaultAsync(activity=>activity.Id == Id);
            return Ok(activity);
        }
    }
}
