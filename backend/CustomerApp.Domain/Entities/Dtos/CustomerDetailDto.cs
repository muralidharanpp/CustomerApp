using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomerApp.Domain.Entities.Dtos
{
    public class CustomerDetailDto
    {
        public int Id { get; set; }

        public string Code { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
     
    }
}
