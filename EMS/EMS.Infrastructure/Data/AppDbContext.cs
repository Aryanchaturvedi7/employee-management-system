using EMS.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EMS.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Employee> Employees => Set<Employee>();

    public DbSet<Attendance> Attendances => Set<Attendance>();
}
