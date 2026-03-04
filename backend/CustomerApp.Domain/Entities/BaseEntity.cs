using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomerApp.Domain.Entities
{
    public abstract class BaseEntity
    {
        public bool isActive { get; set; } = true;
    }
}
