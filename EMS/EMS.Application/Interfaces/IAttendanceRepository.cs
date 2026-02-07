using EMS.Domain.Entities;

namespace EMS.Application.Interfaces;

public interface IAttendanceRepository
{
    Task<List<Attendance>> GetAllAsync();
    Task<Attendance> AddAsync(Attendance attendance);
}