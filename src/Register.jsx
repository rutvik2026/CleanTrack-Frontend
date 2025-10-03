import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "cleaner",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        alert("Registered successfully!");
        setFormData({ name: "", email: "", password: "", role: "cleaner" });
        window.location.href = "/";// navigate to login
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} style={inputStyle} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={inputStyle} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={inputStyle} required />
        <select name="role" value={formData.role} onChange={handleChange} style={{ ...inputStyle, padding: "10px" }}>
          <option value="cleaner">Cleaner</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
  );
};

const containerStyle = {
  maxWidth: "400px",
  width: "90%",
  margin: "50px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const formStyle = { display: "flex", flexDirection: "column" };

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Register;
