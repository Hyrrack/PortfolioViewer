using System.ComponentModel.DataAnnotations;
namespace PortfolioApi.Models;

public class User
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }

    public List<Stock> UserStocks { get; set; }
}