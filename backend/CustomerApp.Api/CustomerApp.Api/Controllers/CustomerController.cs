using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using CustomerApp.Application.Commands;
using CustomerApp.Application.Queries;


namespace CustomerApp.Api.Controllers
{



    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CustomerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCustomerCommand model)
        {
            var id = await _mediator.Send(model);
            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id, [FromQuery] string opt)
        {
            var result = await _mediator.Send(new GetCustomerByIdQuery(id, opt));
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var customers = await _mediator.Send(new GetAllCustomerQuery());
            return Ok(customers);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _mediator.Send(new DeleteCustomerCommand(id));

            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("details")]
        public async Task<IActionResult> DeleteDetails([FromBody] List<int> ids)
        {
            var result = await _mediator.Send(new DeleteCustomerDetailsCommand(ids));

            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}