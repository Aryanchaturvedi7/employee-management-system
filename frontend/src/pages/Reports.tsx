import api from "../api/api";
import Navbar from "../components/Navbar";

export default function Reports() {
  // ✅ Download Employee Report
  const downloadEmployees = async () => {
    try {
      const res = await api.get("/report/employees/excel", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");
      link.href = url;
      link.download = "EmployeeReport.xlsx";

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("Failed to download Employee Report ❌");
    }
  };

  // ✅ Download Attendance Report
  const downloadAttendance = async () => {
    try {
      const res = await api.get("/report/attendance/excel", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");
      link.href = url;
      link.download = "AttendanceReport.xlsx";

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("Failed to download Attendance Report ❌");
    }
  };

 const downloadEmployeePDF = async () => {
  const res = await api.get("/report/employees/pdf", {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.download = "EmployeeReport.pdf";
  link.click();
};

 return (
  <>
    <Navbar />

    <div style={{ padding: "40px" }}>
      <h2>Reports Export</h2>

      <button
        onClick={downloadEmployees}
        style={{
          padding: "10px",
          background: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Download Employee Excel Report
      </button>

      <br />
      <br />

      <button
        onClick={downloadAttendance}
        style={{
          padding: "10px",
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Download Attendance Excel Report
      </button>

      <br />
      <br />


      <button onClick={downloadEmployeePDF}
        style={{
          padding: "10px",
          background: "Red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        >
  Download Employee PDF Report
</button>
    </div>
  </>
);
}