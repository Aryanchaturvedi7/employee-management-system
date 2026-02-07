using ClosedXML.Excel;
using EMS.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace EMS.API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ReportController : ControllerBase
{
    private readonly IEmployeeService _employeeService;
    private readonly IAttendanceService _attendanceService;

    public ReportController(
        IEmployeeService employeeService,
        IAttendanceService attendanceService)
    {
        _employeeService = employeeService;
        _attendanceService = attendanceService;
    }

    // ✅ Employee Excel Report
    [HttpGet("employees/excel")]
    public async Task<IActionResult> ExportEmployeesToExcel()
    {
        var employees = await _employeeService.GetAllAsync();

        using var workbook = new XLWorkbook();
        var sheet = workbook.Worksheets.Add("Employees");

        // Header Row
        sheet.Cell(1, 1).Value = "ID";
        sheet.Cell(1, 2).Value = "Full Name";
        sheet.Cell(1, 3).Value = "Email";
        sheet.Cell(1, 4).Value = "Department";
        sheet.Cell(1, 5).Value = "Salary";

        // Data Rows
        int row = 2;
        foreach (var emp in employees)
        {
            sheet.Cell(row, 1).Value = emp.Id;
            sheet.Cell(row, 2).Value = emp.FullName;
            sheet.Cell(row, 3).Value = emp.Email;
            sheet.Cell(row, 4).Value = emp.Department;
            sheet.Cell(row, 5).Value = emp.Salary;
            row++;
        }

        using var stream = new MemoryStream();
        workbook.SaveAs(stream);
        stream.Position = 0;

        return File(
            stream.ToArray(),
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "EmployeeReport.xlsx"
        );
    }

    // ✅ Attendance Excel Report
    [HttpGet("attendance/excel")]
    public async Task<IActionResult> ExportAttendanceToExcel()
    {
        var records = await _attendanceService.GetAllAsync();

        using var workbook = new XLWorkbook();
        var sheet = workbook.Worksheets.Add("Attendance");

        sheet.Cell(1, 1).Value = "ID";
        sheet.Cell(1, 2).Value = "Employee ID";
        sheet.Cell(1, 3).Value = "Date";
        sheet.Cell(1, 4).Value = "Status";

        int row = 2;
        foreach (var rec in records)
        {
            sheet.Cell(row, 1).Value = rec.Id;
            sheet.Cell(row, 2).Value = rec.EmployeeId;
            sheet.Cell(row, 3).Value = rec.Date.ToShortDateString();
            sheet.Cell(row, 4).Value = rec.Status;
            row++;
        }

        using var stream = new MemoryStream();
        workbook.SaveAs(stream);
        stream.Position = 0;

        return File(
            stream.ToArray(),
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "AttendanceReport.xlsx"
        );
    }

    [HttpGet("employees/pdf")]
    public async Task<IActionResult> ExportEmployeesToPdf()
    {
        var employees = await _employeeService.GetAllAsync();

        if (employees == null || employees.Count == 0)
            return BadRequest("No employees found");

        var pdfBytes = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(30);

                page.Header()
                    .Text("Employee Directory Report")
                    .FontSize(20)
                    .Bold()
                    .AlignCenter();

                page.Content().PaddingVertical(10).Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                    {
                        columns.ConstantColumn(40);
                        columns.RelativeColumn();
                        columns.RelativeColumn();
                        columns.RelativeColumn();
                    });

                    // Header Row
                    table.Header(header =>
                    {
                        header.Cell().Text("ID").Bold();
                        header.Cell().Text("Name").Bold();
                        header.Cell().Text("Department").Bold();
                        header.Cell().Text("Salary").Bold();
                    });

                    // Data Rows
                    foreach (var emp in employees)
                    {
                        table.Cell().Text(emp.Id.ToString());
                        table.Cell().Text(emp.FullName);
                        table.Cell().Text(emp.Department);
                        table.Cell().Text(emp.Salary.ToString());
                    }
                });

                page.Footer()
                    .AlignCenter()
                    .Text($"Generated on {DateTime.Now:dd-MMM-yyyy}");
            });
        }).GeneratePdf();

        return File(pdfBytes, "application/pdf", "EmployeeReport.pdf");
    }


}
