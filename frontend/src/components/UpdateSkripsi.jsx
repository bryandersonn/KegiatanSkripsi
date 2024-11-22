import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateSkripsi() {
  const navigate = useNavigate();
  const location = useLocation();
  const { skripsi, staffID } = location.state; 

  const [formData, setFormData] = useState({
    TanggalSidang: skripsi.TanggalSidang || "",
    TempatSidang: skripsi.TempatSidang || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!skripsi) {
      navigate("/dashboardstaff");
    }
  }, [skripsi, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:3000/api/skripsis/${skripsi.ID}`, {
        ...formData,
        CurrStaffID: staffID
      });

      
      navigate("/dashboardstaff");
    } catch (error) {
      console.error("Error updating skripsi:", error);
      alert("Failed to update Skripsi. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const emailLocal = localStorage.getItem('email');
    const roleLocal = localStorage.getItem('role')
    if (emailLocal == null || emailLocal === ''){
      window.location.href = "/";
    }
    else if (roleLocal == null || roleLocal !== 'Staff'){
        window.location.href = "/";
    }
    }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update Skripsi</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="TanggalSidang" className="form-label">
            Tanggal Sidang:
          </label>
          <input
            type="date"
            id="TanggalSidang"
            className="form-control"
            value={formData.TanggalSidang}
            onChange={(e) => setFormData({ ...formData, TanggalSidang: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="TempatSidang" className="form-label">
            Tempat Sidang:
          </label>
          <input
            type="text"
            id="TempatSidang"
            className="form-control"
            value={formData.TempatSidang}
            onChange={(e) => setFormData({ ...formData, TempatSidang: e.target.value })}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Saving...
              </span>
            ) : (
              "Save"
            )}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/dashboardstaff")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateSkripsi;
