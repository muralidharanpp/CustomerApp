using Azure.Core;
using CustomerApp.Application.Interfaces;
using CustomerApp.Domain.Entities;
using CustomerApp.Domain.Entities.Dtos;
using CustomerApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CustomerApp.Infrastructure.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly AppDbContext _context;

        public CustomerRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> AddAsync(Customer customer)
        {

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return customer.Id;
        }

        public async Task<int> UpdateAsync(Customer updatedCustomer)
        {
            var existingCustomer = await _context.Customers
                .Include(c => c.Details)
                .FirstOrDefaultAsync(c => c.Id == updatedCustomer.Id);

            if (existingCustomer == null)
                throw new Exception("Customer not found");

            // Update scalar fields
            existingCustomer.Name = updatedCustomer.Name;
            existingCustomer.Email = updatedCustomer.Email;

            // Replace details safely
            _context.CustomerDetails.RemoveRange(existingCustomer.Details);

            existingCustomer.Details = updatedCustomer.Details;

            await _context.SaveChangesAsync();

            return existingCustomer.Id;
        }

        public async Task<CustomerDto?> GetByIdAsync(int detailId, string? opt)
        {
            // Get the detail first (includes parent customer)
            var detail = await _context.CustomerDetails
                .Include(d => d.Customer)       // include parent customer
                .Where(d => d.Id == detailId && d.isActive)
                .FirstOrDefaultAsync();

            if (detail == null || detail.Customer == null)
                return null;

            // Get all customer details if you want, optionally filter by category
            var filteredDetails = detail.Customer.Details
                .Where(d => d.isActive)                // only active
                .Where(d => string.IsNullOrEmpty(opt) || d.Category == opt)
                .ToList();

            // Map to DTO
            var result = new CustomerDto
            {
                Id = detail.Customer.Id,
                Name = detail.Customer.Name,
                Email = detail.Customer.Email,
                Details = filteredDetails.Select(d => new CustomerDetailDto
                {
                    Id = d.Id,
                    Code = d.Code,
                    Category = d.Category,
                    Description = d.Description
                }).ToList()
            };

            return result;
        }

        public async Task<List<Customer>> GetAllAsync(CancellationToken ctx)
        {
            return await _context.Customers
                .Include(x => x.Details).ToListAsync(ctx);
        }

        public async Task<bool> DeactivateCustomerAsync(int customerId)
        {
            var customer = await _context.Customers
                .Include(c => c.Details)
                .FirstOrDefaultAsync(c => c.Id == customerId);

            if (customer == null)
                return false;

            // Deactivate customer
            customer.isActive = false;

            // Deactivate all related details
            foreach (var detail in customer.Details)
            {
                detail.isActive = false;
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeactivateCustomerDetailsAsync(List<int> detailIds)
        {
            var details = await _context.CustomerDetails
                .Where(d => detailIds.Contains(d.Id))
                .ToListAsync();

            if (!details.Any())
                return false;

            foreach (var detail in details)
            {
                detail.isActive = false;
            }

            await _context.SaveChangesAsync();
            return true;
        }



        public async Task<List<Customer>> GetByCategoryAsync(string category)
        {
            return await _context.Customers
                //.Where(x => x.Category == category)
                .ToListAsync();
        }
    }
}