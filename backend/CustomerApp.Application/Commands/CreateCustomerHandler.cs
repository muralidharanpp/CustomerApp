using CustomerApp.Application.Interfaces;
using CustomerApp.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomerApp.Application.Commands
{
    public class CreateCustomerHandler : IRequestHandler<CreateCustomerCommand, int>
    {
        private readonly ICustomerRepository _repo;

        public CreateCustomerHandler(ICustomerRepository repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var customer = new Customer
                {
                    Id = request.Id,
                    Name = request.Name,
                    Email = request.Email,

                    Details = request.Details.Select(d => new CustomerDetail
                    {
                        Code = d.Code,
                        Category = d.Category,
                        Description = d.Description,
                    }).ToList()
                };
                if(request.Id>0)
                     return await _repo.UpdateAsync(customer);
                else
                    return await _repo.AddAsync(customer);
            }
            catch (Exception ex)
            {

            }
            return 0;
            

        }
    }
}