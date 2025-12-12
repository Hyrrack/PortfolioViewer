using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PortfolioApi.Models;

public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public string Id { get; set; } = string.Empty;
    [Required]
    public string Name { get; set; } = string.Empty;

    public List<Stock> UserStocks { get; set; } = [];
}