using CustomerApp.Domain.Entities;
using CustomerApp.Domain.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CustomerApp.Application.Interfaces
{
    public interface ICustomerRepository
    {
        Task<int> AddAsync(Customer customer);
        Task<int> UpdateAsync(Customer customer);
        Task<CustomerDto?> GetByIdAsync(int id,string opt);
        Task<List<Customer>> GetAllAsync(CancellationToken ctx);
        Task<List<Customer>> GetByCategoryAsync(string category);

        Task<bool> DeactivateCustomerAsync(int customerId);
        Task<bool> DeactivateCustomerDetailsAsync(List<int> detailIds);

    }
}
