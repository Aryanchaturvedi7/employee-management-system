import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AttendancePage from "./pages/Attendance";
import Reports from "./pages/Reports";

// ✅ Simple Auth Check Function
const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route
          path="/"
          element={
            isLoggedIn() ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          }
        />

       
        <Route
          path="/dashboard"
          element={
            isLoggedIn() ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        
        <Route
          path="/employees"
          element={
            isLoggedIn() ? (
              <Employees />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        
        <Route
          path="/attendance"
          element={
            isLoggedIn() ? (
              <AttendancePage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        
        <Route
          path="/reports"
          element={
            isLoggedIn() ? (
              <Reports />
            ) : (
              <Navigate to="/" />
            )
          }
        />

       
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
