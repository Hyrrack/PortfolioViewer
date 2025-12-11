using System.ComponentModel.DataAnnotations;
namespace PortfolioApi.Models;

public class User
{
    [Key]
    public string Id { get; set; } = string.Empty;
    [Required]
    public string Name { get; set; } = string.Empty;

    public List<Stock> UserStocks { get; set; } = [];
}