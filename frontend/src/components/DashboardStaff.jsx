import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function DashboardStaff() {
  const emailLocal = localStorage.getItem('email');
  const [skripsis, setSkripsis] = useState([]);
  const [staffID, setStaffID] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function formatDate(dateString) {
    if (!dateString) return 'Not Scheduled Yet';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
}    

  useEffect(() => {
    const emailLocal = localStorage.getItem("email");
    if (!emailLocal) {
      window.location.href = "/"; 
      return;
    }

   
    const fetchStaffID = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/staffs/staff-id", {
          params: { email: emailLocal },
        });
        setStaffID(response.data.StaffID);
        console.log(staffID);
      } catch (error) {
        console.error("Error fetching StaffID:", error);
        alert("Failed to fetch StaffID. Please re-login.");
        window.location.href = "/";
      }
    };

    
    const fetchSkripsi = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/skripsis/skripsi");
        setSkripsis(response.data);
      } catch (error) {
        console.error("Error fetching skripsi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffID().then(fetchSkripsi);
  }, []);

  
  const openUpdateSkripsi = (skripsi) => {
    navigate("/updateskripsi", { state: { skripsi, staffID } }); 
  };

  useEffect(() => {
    const emailLocal = localStorage.getItem('email');
    const roleLocal = localStorage.getItem('role');
    if (emailLocal == null || emailLocal === ''){
      window.location.href = "/";
    }
    if (roleLocal == null || roleLocal !== 'Staff'){
      window.location.href = "/";
    }
    }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className="container mt-5">
      <p>Account: {emailLocal}</p>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to="/" className='btn btn-primary d-md-flex justify-content-md-end' type='button'>LOGOUT</Link>
      </div>
      <h1 className="text-center mb-4">Skripsi Dashboard</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Judul</th>
              <th>Status</th>
              <th>StaffID</th>
              <th>Tanggal Sidang</th>
              <th>Tempat Sidang</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skripsis.map((skripsi) => (
              <tr key={skripsi.ID}>
                <td>{skripsi.ID}</td>
                <td>{skripsi.JudulSkripsi}</td>
                <td>{skripsi.StatusSkripsi}</td>
                <td>{skripsi.staffID}</td>
                <td>{formatDate(skripsi.TanggalSidang) || "N/A"}</td>
                <td>{skripsi.TempatSidang || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => openUpdateSkripsi(skripsi)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardStaff;
