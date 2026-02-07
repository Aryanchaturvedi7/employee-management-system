using EMS.Application.DTOs;

namespace EMS.Application.Interfaces;

public interface IAttendanceService
{
    Task<List<AttendanceDto>> GetAllAsync();
    Task<AttendanceDto> MarkAsync(AttendanceDto dto);
}
