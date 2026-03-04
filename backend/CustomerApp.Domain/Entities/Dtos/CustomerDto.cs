using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomerApp.Domain.Entities.Dtos
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }

        public string? Category { get; set; }
        public List<CustomerDetailDto> Details { get; set; } = new();
    }
}
