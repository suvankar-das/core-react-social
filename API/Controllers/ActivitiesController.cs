using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Persistence.UnitOfWorks;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            var activities = await Mediator.Send(new List.Query());
            return HandleResult(activities);
        }


        [HttpGet("{Id}")]
        public async Task<IActionResult> GetActivity(Guid Id)
        {
            var result = await Mediator.Send(new Details.Query
            {
                Id = Id
            });

            return HandleResult(result);

        }


        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command()
            {
                Activity = activity
            }));
        }


        [HttpPut("{Id}")]

        public async Task<IActionResult> EditActivity(Guid id,Activity activity)
        {
            activity.Id = id;

            return HandleResult(await Mediator.Send(new Edit.Command()
            {
                Activity = activity
            }));

        }

        [HttpDelete("{Id}")]

        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command()
            {
                Id = id
            }));
        }
    }
}
