using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CustomerApp.Domain.Entities.Dtos;
using MediatR;

namespace CustomerApp.Application.Commands
{
  
    public record DeleteCustomerDetailsCommand(List<int> Ids) : IRequest<bool>;

}
