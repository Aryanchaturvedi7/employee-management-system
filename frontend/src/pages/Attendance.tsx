import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";



// ✅ Attendance Interface
interface Attendance {
  id: number;
  employeeId: number;
  date: string;
  status: string;
}

export default function AttendancePage() {
  const [records, setRecords] = useState<Attendance[]>([]);

  // Form Fields
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  // ============================
  // ✅ Load Attendance Records
  // ============================
  const loadAttendance = async () => {
    try {
      const res = await api.get("/attendance");
      setRecords(res.data);
    } catch {
      alert("Error loading attendance ❌");
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  // ============================
  // ✅ Mark Attendance
  // ============================
  const handleMarkAttendance = async () => {
    if (!employeeId || !date) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      await api.post("/attendance", {
        employeeId: Number(employeeId),
        date,
        status,
      });

      alert("Attendance Marked Successfully ✅");

      // Reset form
      setEmployeeId("");
      setDate("");
      setStatus("Present");

      // Reload table
      loadAttendance();
    } catch {
      alert("Error marking attendance ❌");
    }
  };

  return (
  <>
    
    <Navbar />

    <div style={{ padding: "40px" }}>
      <h2>Attendance Management</h2>

      {/* ============================= */}
      {/* ✅ Attendance Form */}
      {/* ============================= */}
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid gray",
          borderRadius: "10px",
          width: "450px",
        }}
      >
        <h3>Mark Attendance</h3>

        <input
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />

        <br />
        <br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />

        <br />
        <br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <br />
        <br />

        <button
          onClick={handleMarkAttendance}
          style={{
            padding: "10px",
            width: "100%",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Mark Attendance
        </button>
      </div>

      {/* ============================= */}
      {/* ✅ Attendance Table */}
      {/* ============================= */}
      <table
        border={1}
        cellPadding={10}
        style={{
          marginTop: "30px",
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead style={{ background: "#f2f2f2" }}>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No Attendance Records Found
              </td>
            </tr>
          ) : (
            records.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.id}</td>
                <td>{rec.employeeId}</td>
                <td>{rec.date.split("T")[0]}</td>
                <td>{rec.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </>
);
}