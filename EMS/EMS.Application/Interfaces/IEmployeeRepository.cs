using EMS.Domain.Entities;

namespace EMS.Application.Interfaces;

public interface IEmployeeRepository
{
    Task<List<Employee>> GetAllAsync();
    Task<Employee> AddAsync(Employee employee);
    Task<bool> DeleteAsync(int id);
    Task<Employee?> UpdateAsync(Employee employee);
    Task<Employee?> GetByIdAsync(int id);       
}
