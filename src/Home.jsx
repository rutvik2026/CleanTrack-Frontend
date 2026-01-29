import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [toilets, setToilets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const role = sessionStorage.getItem("role");
  const id = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!id || !role) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/getData?Id=${id}&role=${role}`
        );
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

  if (loading) {
    return (
      <div className="home-page">
        <p className="loading">Loading...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="home-box">
        <h1>Toilets Dashboard</h1>

        {toilets.length === 0 ? (
          <p className="empty">No toilets assigned.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cleaner Email</th>
                  <th>Admin Email</th>
                  <th>Gas Value</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {toilets.map((t) => (
                  <tr key={t._id}>
                    <td>{t._id}</td>
                    <td>{t.cleanerEmail}</td>
                    <td>{t.adminEmail}</td>
                    <td>{t.gasValue}</td>
                    <td className={`status ${t.status?.toLowerCase()}`}>
                      {t.status}
                    </td>
                    <td>{new Date(t.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {role === "admin" && (
          <button className="primary-btn" onClick={handleNewToilet}>
            + New Toilet
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
