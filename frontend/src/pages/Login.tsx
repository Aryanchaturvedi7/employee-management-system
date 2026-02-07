import { useState } from "react";
import api from "../api/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Handle Login
  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        username,
        password,
      });

      // Save JWT Token
      localStorage.setItem("token", res.data.token);

      // Redirect to Dashboard
      window.location.href = "/dashboard";
    } catch {
      setError("Invalid username or password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Employee Management System</h1>
        <p style={styles.subtitle}>Login to continue</p>

        {/* Username */}
        <input
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <input
          style={styles.input}
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error Message */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Login Button */}
        <button
          style={styles.button}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p style={styles.footer}>
          HR Portal • Secure Access 🔒
        </p>
      </div>
    </div>
  );
}

/* ✅ Simple CSS-in-JS Styling */
const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #eef2f3, #d9e2ec)",
  },

  card: {
    width: "380px",
    padding: "35px",
    borderRadius: "15px",
    background: "white",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  title: {
    fontSize: "22px",
    marginBottom: "5px",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: "14px",
    marginBottom: "25px",
    color: "#555",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#007bff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },

  footer: {
    marginTop: "20px",
    fontSize: "12px",
    color: "#777",
  },
};
