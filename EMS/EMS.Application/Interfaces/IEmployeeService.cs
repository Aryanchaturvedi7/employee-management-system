using EMS.Application.DTOs;

namespace EMS.Application.Interfaces;

public interface IEmployeeService
{
    Task<List<EmployeeDto>> GetAllAsync();
    Task<EmployeeDto> CreateAsync(EmployeeDto dto);
    Task<bool> DeleteAsync(int id);
    Task<EmployeeDto?> UpdateAsync(int id, EmployeeDto dto);

}