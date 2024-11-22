import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function DashboardDosen() {
  const [skripsis, setSkripsis] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem('email');

  
  const fetchSkripsi = async () => {
    try {
      const emailLocal = localStorage.getItem('email');
      const response = await axios.get(`http://localhost:3000/api/dosens/dosen-by-email?email=${emailLocal}`);
      const dosenID = response.data.DosenID;

      const skripsiResponse = await axios.get(`http://localhost:3000/api/skripsis/skripsi-by-dosen/${dosenID}`);
      setSkripsis(skripsiResponse.data);
    } catch (error) {
      console.error('Error fetching skripsi:', error);
      setSkripsis([]);
    } finally {
      setLoading(false);
    }
  };

  
  const approveSkripsi = async (skripsiID) => {
    console.log('Approving Skripsi with ID:', skripsiID); 
    try {
      await axios.put(`http://localhost:3000/api/skripsis/approve-skripsi/${skripsiID}`);
      alert('Skripsi approved successfully');
      fetchSkripsi(); 
    } catch (error) {
      console.error('Error approving skripsi:', error);
      alert('Failed to approve skripsi');
    }
  };

  
  const denySkripsi = async (skripsiID) => {
    console.log('Denying Skripsi with ID:', skripsiID); 
    try {
      await axios.delete(`http://localhost:3000/api/skripsis/delete-skripsi/${skripsiID}`);
      alert('Skripsi denied and deleted successfully');
      fetchSkripsi(); 
    } catch (error) {
      console.error('Error denying skripsi:', error);
      alert('Failed to deny skripsi');
    }
  };

  useEffect(() => {
    const emailLocal = localStorage.getItem('email');
    const roleLocal = localStorage.getItem('role')
    if (!emailLocal) {
      window.location.href = '/'; 
    }
    else if (roleLocal == null || roleLocal !== 'Dosen'){
      window.location.href = "/";
    }
     else {
      fetchSkripsi();
    }
  }, []);

  if (loading) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <p>Account: {userEmail}</p>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to="/" className='btn btn-primary d-md-flex justify-content-md-end' type='button'>LOGOUT</Link>
      </div>
      <h1 className="text-center mb-4">Dashboard Dosen</h1>
      <div className="row">
        <h2 className="col-12 mb-4">Skripsi Proposals</h2>
        {skripsis.length === 0 ? (
          <p>No proposals available.</p>
        ) : (
          skripsis.map((skripsi) => (
            <div key={skripsi.ID} className="col-12 col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                <p><strong>NIM Mahasiswa:</strong> {skripsi.nim}</p>
                <p><strong>Judul Skripsi:</strong> {skripsi.JudulSkripsi}</p>
                <p><strong>Link File:</strong> {skripsi.LinkFile}</p>
                <p><strong>Status:</strong> {skripsi.StatusSkripsi}</p>

                  {}
                  {skripsi.StatusSkripsi !== 'Pending' ? (
                    <p className="text-success">Skripsi Approved</p>
                  ) : (
                    <div>
                      <button
                        className="btn btn-success me-2"
                        onClick={() => approveSkripsi(skripsi.ID)}
                        disabled={skripsi.StatusSkripsi === 'Accepted'}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => denySkripsi(skripsi.ID)}
                        disabled={skripsi.StatusSkripsi === 'Accepted'}
                      >
                        Deny
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DashboardDosen;
