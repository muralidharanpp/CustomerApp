using CustomerApp.Domain.Entities;
using CustomerApp.Domain.Entities.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomerApp.Application.Queries
{
    public record GetAllCustomerQuery() : IRequest<List<CustomerDto>>;
}
