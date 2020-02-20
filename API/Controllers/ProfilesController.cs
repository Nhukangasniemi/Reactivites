using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;
using Details = Application.Profiles.Details;

namespace API.Controllers
{
    public class ProfilesController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> Get(string username)
        {
            return await Mediator.Send(new Details.Query{Username = username});
        }
    }
}