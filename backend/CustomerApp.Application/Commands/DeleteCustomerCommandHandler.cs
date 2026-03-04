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
    

    public class DeleteCustomerCommandHandler
    : IRequestHandler<DeleteCustomerCommand, bool>
    {
        private readonly ICustomerRepository _repo;

        public DeleteCustomerCommandHandler(ICustomerRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(
            DeleteCustomerCommand request,
            CancellationToken cancellationToken)
        {
            return await _repo.DeactivateCustomerAsync(request.customerId);
        }
    }
}