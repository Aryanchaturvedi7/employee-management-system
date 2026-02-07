import { Link } from "react-router-dom";

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        padding: "15px 30px",
        background: "#222",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left Side */}
      <h2 style={{ margin: 0 }}>EMS</h2>

      {/* Middle Links */}
      
      <div style={{ display: "flex", gap: "20px" }}>

          <Link style={linkStyle} to="/dashboard">
            Dashboard
        </Link>

        <Link style={linkStyle} to="/employees">
          Employees
        </Link>

        <Link style={linkStyle} to="/attendance">
          Attendance
        </Link>

        <Link style={linkStyle} to="/reports">
          Reports
        </Link>
      </div>

      {/* Right Side */}
      <button
        onClick={handleLogout}
        style={{
          padding: "8px 15px",
          background: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
};
