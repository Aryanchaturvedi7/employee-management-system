import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

// ✅ Employee Interface
interface Employee {
  id: number;
  fullName: string;
  email: string;
  department: string;
  salary: number;
  dateOfJoining?: string;
}

export default function Employees() {
  // ============================
  // ✅ State Variables
  // ============================

  const [employees, setEmployees] = useState<Employee[]>([]);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  // Edit Mode
  const [editingId, setEditingId] = useState<number | null>(null);

  // ============================
  // ✅ Load Employees
  // ============================
  const loadEmployees = async () => {
    try {
      const res = await api.get("/employee");
      setEmployees(res.data);
    } catch {
      alert("Unauthorized! Please login again.");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // ============================
  // ✅ Add Employee
  // ============================
  const handleAddEmployee = async () => {
    if (!fullName || !email || !department || !salary) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      await api.post("/employee", {
        fullName,
        email,
        department,
        salary: Number(salary),
      });

      alert("Employee Added Successfully ✅");

      clearForm();
      loadEmployees();
    } catch {
      alert("Error adding employee ❌");
    }
  };

  // ============================
  // ✅ Delete Employee
  // ============================
  const handleDeleteEmployee = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      await api.delete(`/employee/${id}`);
      alert("Employee Deleted Successfully ✅");
      loadEmployees();
    } catch {
      alert("Error deleting employee ❌");
    }
  };

  // ============================
  // ✅ Start Editing
  // ============================
  const handleEditEmployee = (emp: Employee) => {
    setEditingId(emp.id);

    // Fill form with existing values
    setFullName(emp.fullName);
    setEmail(emp.email);
    setDepartment(emp.department);
    setSalary(emp.salary.toString());
  };

  // ============================
  // ✅ Update Employee
  // ============================
  const handleUpdateEmployee = async () => {
    if (editingId === null) return;

    try {
      await api.put(`/employee/${editingId}`, {
        fullName,
        email,
        department,
        salary: Number(salary),
      });

      alert("Employee Updated Successfully ✅");

      clearForm();
      loadEmployees();
    } catch {
      alert("Error updating employee ❌");
    }
  };

  // ============================
  // ✅ Clear Form
  // ============================
  const clearForm = () => {
    setFullName("");
    setEmail("");
    setDepartment("");
    setSalary("");
    setEditingId(null);
  };

  // ============================
  // ✅ UI Render
  // ============================
  return (
     <>
        <Navbar />
    <div style={{ padding: "40px" }}>
      <h2>Employee Directory</h2>

      {/* ============================= */}
      {/* ✅ Add/Edit Employee Form */}
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
        <h3>
          {editingId ? "Edit Employee" : "Add New Employee"}
        </h3>

        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />

        <br />
        <br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />

        <br />
        <br />

        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />

        <br />
        <br />

        <input
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />

        <br />
        <br />

        {/* Buttons */}
        {editingId ? (
          <>
            <button
              onClick={handleUpdateEmployee}
              style={{
                padding: "10px",
                width: "100%",
                background: "blue",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Update Employee
            </button>

            <br />
            <br />

            <button
              onClick={clearForm}
              style={{
                padding: "10px",
                width: "100%",
                background: "gray",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel Edit
            </button>
          </>
        ) : (
          <button
            onClick={handleAddEmployee}
            style={{
              padding: "10px",
              width: "100%",
              background: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Employee
          </button>
        )}
      </div>

      {/* ============================= */}
      {/* ✅ Employee Table */}
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
            <th>Full Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Date Joined</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No Employees Found
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.fullName}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>

                <td>
                  {emp.dateOfJoining
                    ? emp.dateOfJoining.split("T")[0]
                    : "N/A"}
                </td>

                <td>
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEditEmployee(emp)}
                    style={{
                      background: "orange",
                      color: "white",
                      padding: "6px 10px",
                      border: "none",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteEmployee(emp.id)}
                    style={{
                      background: "red",
                      color: "white",
                      padding: "6px 10px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
           </table>
    </div>
  </>
);
}
