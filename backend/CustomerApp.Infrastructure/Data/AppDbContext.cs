using CustomerApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace CustomerApp.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<CustomerDetail> CustomerDetails => Set<CustomerDetail>();

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<Customer>()
                    .HasQueryFilter(c => c.isActive);

            builder.Entity<CustomerDetail>()
                .HasQueryFilter(d => d.isActive);

            builder.Entity<Customer>()
                .HasMany(c => c.Details)
                .WithOne(d => d.Customer!)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);
        }


    }
}