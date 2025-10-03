import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewToilet = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cleanerEmail: "",
    adminEmail: sessionStorage.getItem("email") || "", // prefill admin email
    gasValue: "",
    status: "new Toilet",
  });

  const [message, setMessage] = useState("");

  // Check admin access
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role !== "admin") {
      navigate("/home"); // redirect non-admins
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newtoilet", {
        method: "POST",
        headers: { "Content-Type": `${import.meta.env.Backend_URL}/application/json` },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.sucess) {
        alert("New toilet added successfully!");
        setFormData({ ...formData, cleanerEmail: "", gasValue: "" });
      } else {
        alert(data.message || "Failed to add toilet");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Toilet</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="email"
          name="cleanerEmail"
          placeholder="Cleaner Email"
          value={formData.cleanerEmail}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="gasValue"
          placeholder="Gas Value"
          value={formData.gasValue}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Add Toilet</button>
      </form>

      <button onClick={() => navigate(-1)} style={backButtonStyle}>Back</button>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: "400px",
  width: "90%",
  margin: "50px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  fontFamily: "Arial, sans-serif",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
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

const backButtonStyle = {
  marginTop: "15px",
  padding: "10px",
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
};

export default NewToilet;
