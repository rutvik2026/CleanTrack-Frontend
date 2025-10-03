
import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.sucess) {
        setMessage("✅ Login successful!");

        // Store in sessionStorage
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.cust.role);
        sessionStorage.setItem("userId", data.cust.id);
        sessionStorage.setItem("email", data.cust.email);

        // Redirect based on role
        if (data.cust.role === "admin") {
          window.location.href = "/home";
        } else {
          window.location.href = "/home";
        }
      } else {
        setMessage("❌ " + (data.message || "Login failed"));
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error connecting to server");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", fontWeight: "bold", color: "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Login;
