using PortfolioApi.Models;

namespace PortfolioApi.DTOs;

public class CreateUserDto
{
    public bool Created { get; set; }
    public required User User { get; set; }
}