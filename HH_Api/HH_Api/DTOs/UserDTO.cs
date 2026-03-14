using System.ComponentModel.DataAnnotations.Schema;

namespace HH_Api.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public long PhoneNumber { get; set; }
        public float Review { get; set; }
        public int PostalCode { get; set; }
        public string? City { get; set; }
        public string? ImageId { get; set; }
    }
}
