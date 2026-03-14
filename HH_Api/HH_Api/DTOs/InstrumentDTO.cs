using HH_Api.Model;
using System.ComponentModel.DataAnnotations.Schema;

namespace HH_Api.DTOs
{
    public class InstrumentDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Cost { get; set; }
        public string? Description { get; set; }
        public bool Sold { get; set; }
        public int UId { get; set; }
        public string? SCName { get; set; }
        public bool IsPremium { get; set; }
        public string? Condition { get; set; }
        public UserDTO? Seller { get; set; }
        public Subcategory? SubCategory { get; set; }
    }
}
