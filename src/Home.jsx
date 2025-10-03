
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [toilets, setToilets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const role = sessionStorage.getItem("role"); // "admin" or "user"
  const id = sessionStorage.getItem("userId"); // user/admin id
   console.log("role",role);
  useEffect(() => {
    if (!id || !role) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getData?Id=${id}&role=${role}`);
        const data = await res.json();

        if (res.ok) {
          setToilets(data);
        } else {
          alert(data.message || "Failed to fetch data");
        }
      } catch (err) {
        console.error(err);
        alert("Error connecting to server");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, role, navigate]);

  const handleNewToilet = () => {
    navigate("/newtoilet");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Toilets Dashboard</h2>

      {toilets.length === 0 ? (
        <p>No toilets assigned.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Cleaner Email
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Admin Email
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Gas Value
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Status
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {toilets.map((t) => (
              <tr key={t._id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {t._id}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {t.cleanerEmail}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {t.adminEmail}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {t.gasValue}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {t.status}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {new Date(t.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {role === "admin" && (
        <button
          onClick={handleNewToilet}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          New Toilet
        </button>
      )}
    </div>
  );
};

export default Home;
