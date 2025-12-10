using System.ComponentModel.DataAnnotations;
namespace PortfolioApi.Models;

public class Stock
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Symbol { get; set; }
    [Required]
    public string CompanyName { get; set; }

}