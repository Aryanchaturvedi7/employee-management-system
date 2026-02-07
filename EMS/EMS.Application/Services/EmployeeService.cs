using EMS.Application.DTOs;
using EMS.Application.Interfaces;
using EMS.Domain.Entities;

namespace EMS.Application.Services;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _repo;

    public EmployeeService(IEmployeeRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<EmployeeDto>> GetAllAsync()
    {
        var employees = await _repo.GetAllAsync();

        return employees.Select(e => new EmployeeDto
        {
            Id = e.Id,
            FullName = e.FullName,
            Email = e.Email,
            Department = e.Department,
            Salary = e.Salary,
            DateOfJoining = e.DateOfJoining
        }).ToList();
    }

    public async Task<EmployeeDto> CreateAsync(EmployeeDto dto)
    {
        var employee = new Employee
        {
            FullName = dto.FullName,
            Email = dto.Email,
            Department = dto.Department,
            Salary = dto.Salary,
            DateOfJoining = DateTime.Now
        };

        var saved = await _repo.AddAsync(employee);

        dto.Id = saved.Id;
        return dto;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repo.DeleteAsync(id);
    }

    public async Task<EmployeeDto?> UpdateAsync(int id, EmployeeDto dto)
    {
        var employee = new Employee
        {
            Id = id,
            FullName = dto.FullName,
            Email = dto.Email,
            Department = dto.Department,
            Salary = dto.Salary
        };

        var updated = await _repo.UpdateAsync(employee);

        if (updated == null) return null;

        return new EmployeeDto
        {
            Id = updated.Id,
            FullName = updated.FullName,
            Email = updated.Email,
            Department = updated.Department,
            Salary = updated.Salary
        };
    }

}
