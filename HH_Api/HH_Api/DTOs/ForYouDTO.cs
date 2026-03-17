using HH_Api.Model;
using System.ComponentModel.DataAnnotations.Schema;

namespace HH_Api.DTOs
{
    public class ForYouDTO
    {
        public int Id { get; set; }
        public int UId { get; set; }
        public UserDTO? User { get; set; }
        public string? CName { get; set; }
        public Category? Category { get; set; }
    }
}
