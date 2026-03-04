using CustomerApp.Application.Commands;
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
    public class GetAllCustomerHandler : IRequestHandler<GetAllCustomerQuery, List<CustomerDto>>
    {
        private readonly ICustomerRepository _repo;

        public GetAllCustomerHandler(ICustomerRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<CustomerDto>> Handle(GetAllCustomerQuery request, CancellationToken cancellationToken)
        {
            var customers = await _repo.GetAllAsync(cancellationToken);

            return customers.Select(x => new CustomerDto
            {
                Id = x.Id,
                Name = x.Name,
                Email = x.Email,
               
                Details = x.Details.Select(d => new CustomerDetailDto
                {
                    Id = d.Id,
                    Category = d.Category.ToString(),
                    Code = d.Code,
                  
                }).ToList()
            }).ToList();
        }
    }
}