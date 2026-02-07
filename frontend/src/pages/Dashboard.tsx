import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h2>Welcome to Employee Management System</h2>

        <p style={{ marginTop: "10px", fontSize: "18px" }}>
          Manage Employees, Attendance, and Reports from one place.
        </p>

        {/* Cards Section */}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "20px",
          }}
        >
          {/* Employees Card */}
          <div
            style={cardStyle}
            onClick={() => navigate("/employees")}
          >
            <h3>👨‍💼 Employees</h3>
            <p>Add / Edit / Delete employee records</p>
          </div>

          {/* Attendance Card */}
          <div
            style={cardStyle}
            onClick={() => navigate("/attendance")}
          >
            <h3>📅 Attendance</h3>
            <p>Track daily attendance status</p>
          </div>

          {/* Reports Card */}
          <div
            style={cardStyle}
            onClick={() => navigate("/reports")}
          >
            <h3>📊 Reports</h3>
            <p>Download Excel/PDF reports</p>
          </div>
        </div>
      </div>
    </>
  );
}

const cardStyle = {
  border: "1px solid gray",
  borderRadius: "12px",
  padding: "20px",
  width: "250px",
  cursor: "pointer",
  transition: "0.2s",
};
