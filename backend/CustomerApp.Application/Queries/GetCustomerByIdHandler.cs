using CustomerApp.Application.Interfaces;
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
    public class GetCustomerByIdHandler : IRequestHandler<GetCustomerByIdQuery, CustomerDto?>
    {
        private readonly ICustomerRepository _repo;

        public GetCustomerByIdHandler(ICustomerRepository repo)
        {
            _repo = repo;
        }

        public async Task<CustomerDto?> Handle(GetCustomerByIdQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetByIdAsync(request.Id,request.opt);
        }
    }
}