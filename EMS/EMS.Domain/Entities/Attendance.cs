namespace EMS.Domain.Entities;

public class Attendance
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }

    public DateTime Date { get; set; }

    public string Status { get; set; } = "Present"; // Present/Absent

    // Navigation
    public Employee Employee { get; set; }
}
