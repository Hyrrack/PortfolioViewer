using System.ComponentModel.DataAnnotations;
namespace PortfolioApi.Models;

public class Stock
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Symbol { get; set; } = string.Empty;
    [Required]
    public string CompanyName { get; set; } = string.Empty;
    public int UserId { get; set; }

}