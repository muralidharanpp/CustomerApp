using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomerApp.Application.Commands
{
    using CustomerApp.Domain.Entities.Dtos;
    using MediatR;

    public record CreateCustomerCommand(
        int Id,
        string Name,
        string Email,
        List<CustomerDetailDto> Details
    ) : IRequest<int>;

  
}
