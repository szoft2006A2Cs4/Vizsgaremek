using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WpfApp1.Model
{
    public class Instr
    {       
        public int Id { get; set; }
        public string Name { get; set; }
        public int Cost { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public string SubCategoryName { get; set; }

        public override string ToString()
        {
            return $"id: {Id}, név: {Name}, ár: {Cost}, kategória: {SubCategoryName}";
        }
    }
}
