using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomerApp.Domain.Entities
{
    public class CustomerDetail : BaseEntity
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Customer? Customer { get; set; }
    }
}
