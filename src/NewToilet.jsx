import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NewToilet.css";

const NewToilet = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cleanerEmail: "",
    adminEmail: sessionStorage.getItem("email") || "",
    gasValue: "",
    status: "new Toilet",
  });

  // Admin access check
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role !== "admin") {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

      const res = await fetch(`${BACKEND_URL}/api/newtoilet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("New toilet added successfully!");
        setFormData({
          ...formData,
          cleanerEmail: "",
          gasValue: "",
        });
      } else {
        alert(data.message || "Failed to add toilet");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="newtoilet-page">
      <div className="newtoilet-box">
        <h1>Add New Toilet</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="cleanerEmail">Cleaner Email</label>
          <input
            id="cleanerEmail"
            type="email"
            name="cleanerEmail"
            placeholder="Cleaner Email"
            value={formData.cleanerEmail}
            onChange={handleChange}
            required
          />

          <label htmlFor="gasValue">Gas Value</label>
          <input
            id="gasValue"
            type="number"
            name="gasValue"
            placeholder="Gas Value"
            value={formData.gasValue}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Toilet</button>
        </form>

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
};

export default NewToilet;
