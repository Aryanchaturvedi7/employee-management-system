using EMS.Application.DTOs;
using EMS.Application.Interfaces;
using EMS.Domain.Entities;

namespace EMS.Application.Services;

public class AttendanceService : IAttendanceService
{
    private readonly IAttendanceRepository _repo;

    public AttendanceService(IAttendanceRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<AttendanceDto>> GetAllAsync()
    {
        var records = await _repo.GetAllAsync();

        return records.Select(a => new AttendanceDto
        {
            Id = a.Id,
            EmployeeId = a.EmployeeId,
            Date = a.Date,
            Status = a.Status
        }).ToList();
    }

    public async Task<AttendanceDto> MarkAsync(AttendanceDto dto)
    {
        var attendance = new Attendance
        {
            EmployeeId = dto.EmployeeId,
            Date = dto.Date,
            Status = dto.Status
        };

        var saved = await _repo.AddAsync(attendance);

        dto.Id = saved.Id;
        return dto;
    }
}
