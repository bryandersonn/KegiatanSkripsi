import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
    const [skripsi, setSkripsi] = useState(null);
    const [loading, setLoading] = useState(true);
    const userEmail = localStorage.getItem('email');
    const navigate = useNavigate();

    function formatDate(dateString) {
        if (!dateString) return 'Not Scheduled Yet';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
    }    

    useEffect(() => {
        async function fetchSkripsi() {
            try {
                const response = await axios.get(`http://localhost:3000/api/skripsis/check-skripsi-by-email?email=${userEmail}`);
                setSkripsi(response.data.skripsi || null);
            } catch (error) {
                console.error('Error fetching skripsi:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchSkripsi();
    }, [userEmail]);

    const handleAddSkripsi = () => {
        if (skripsi) {
            alert('You already have a skripsi proposal. Only one skripsi is allowed.');
        } else {
            navigate('/apply-skripsi');
        }
    };

    useEffect(() => {
        const emailLocal = localStorage.getItem('email');
        const roleLocal = localStorage.getItem('role')
        if (emailLocal == null || emailLocal === ''){
          window.location.href = "/";
        }
        else if (roleLocal == null || roleLocal !== 'Mahasiswa'){
            window.location.href = "/";
        }
        }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <p>Account: {userEmail}</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to="/" className='btn btn-primary d-md-flex justify-content-md-end' type='button'>LOGOUT</Link>
            </div>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {skripsi ? (
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    
                    <h2 className="text-lg font-bold mb-2">Proposal Skripsi</h2>
                    <p><strong>Judul:</strong> {skripsi.JudulSkripsi}</p>
                    <p><strong>Status:</strong> {skripsi.StatusSkripsi}</p>
                    <p><strong>Kode Dosen Pembimbing:</strong> {skripsi.dosenID}</p>
                    <p><strong>Tanggal Sidang:</strong> {formatDate(skripsi.TanggalSidang)}</p>
                    <p><strong>Tempat Sidang:</strong> {skripsi.TempatSidang || 'Not Scheduled Yet'}</p>
                    <button
                        onClick={handleAddSkripsi}
                        className="bg-warning text-white px-4 py-2 rounded mt-4"
                        disabled
                    >
                        Can't Add Skripsi (You already have an ongoing proposal)
                    </button>
                </div>
            ) : (
                <div className="bg-red-100 p-4 rounded-lg shadow">
                    <p>You don't have a Proposal Skripsi yet.</p>
                    <button
                        onClick={handleAddSkripsi}
                        className="bg-primary text-white px-4 py-2 rounded mt-4"
                    >
                        Apply Skripsi
                    </button>
                </div>
            )}
        </div>
    );
}
export default Dashboard;
