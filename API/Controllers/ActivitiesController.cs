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
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {

            var activities = await Mediator.Send(new List.Query());
            return Ok(activities);
        }


        [HttpGet("{Id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid Id)
        {
            return Ok(await Mediator.Send(new Details.Query
            {
                Id = Id
            }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            await Mediator.Send(new Create.Command()
            {
                Activity = activity
            });

            return Ok();
        }


        [HttpPut("{Id}")]

        public async Task<IActionResult> EditActivity(Guid id,Activity activity)
        {
            activity.Id = id;

            await Mediator.Send(new Edit.Command()
            {
                Activity = activity
            });

            return Ok();
        }

        [HttpDelete("{Id}")]

        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            await Mediator.Send(new Delete.Command()
            {
                Id = id
            });

            return Ok();
        }
    }
}
