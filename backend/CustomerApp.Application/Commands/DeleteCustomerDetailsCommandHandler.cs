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
    public class DeleteCustomerDetailsCommandHandler
    : IRequestHandler<DeleteCustomerDetailsCommand, bool>
    {
        private readonly ICustomerRepository _repo;

        public DeleteCustomerDetailsCommandHandler(ICustomerRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(
            DeleteCustomerDetailsCommand request,
            CancellationToken cancellationToken)
        {
            return await _repo.DeactivateCustomerDetailsAsync(request.Ids);
        }
    }
}