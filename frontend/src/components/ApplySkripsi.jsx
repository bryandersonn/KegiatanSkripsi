import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ApplySkripsi() {
    const [judulSkripsi, setJudulSkripsi] = useState('');
    const [linkFile, setLinkFile] = useState('');
    const [availableDosen, setAvailableDosen] = useState([]);
    const [selectedDosen, setSelectedDosen] = useState('');
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('email');

    useEffect(() => {
        async function fetchDosenAndStaff() {
            try {
                const response = await axios.get('http://localhost:3000/api/skripsis/available-dosen');
                setAvailableDosen(response.data.availableDosen);
            } catch (error) {
                console.error('Error fetching dosen:', error);
            }
        }

        fetchDosenAndStaff();
    }, []);

    
    const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        const userResponse = await axios.get(`http://localhost:3000/api/users/get-nim?email=${userEmail}`);
        const nim = userResponse.data.nim;

        const data = {
            nim,
            dosenID: selectedDosen,
            judulSkripsi,
            linkFile,
        };

        await axios.post('http://localhost:3000/api/skripsis/apply-skripsi', data);
        alert('Skripsi application successful');
        navigate('/dashboard');
    } catch (error) {
        console.error('Error applying skripsi:', error);
        alert(error.response?.data || 'Failed to apply for skripsi');
    }
};

    useEffect(() => {
        const emailLocal = localStorage.getItem('email');
        if (emailLocal == null || emailLocal === ''){
        window.location.href = "/";
        }
    }, []);

    return (
        <div className="container mx-auto p-4">
            <p>Account: {userEmail}</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to="/" className='btn btn-primary d-md-flex justify-content-md-end' type='button'>LOGOUT</Link>
            </div>
            <h1 className="text-2xl font-bold mb-4">Apply Skripsi</h1>
            <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-gray-700">Judul Skripsi:</label>
                    <input
                        type="text"
                        value={judulSkripsi}
                        onChange={(e) => setJudulSkripsi(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Link File Proposal:</label>
                    <input
                        type="text"
                        value={linkFile}
                        onChange={(e) => setLinkFile(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Dosen Pembimbing:</label>
                    <select
                        value={selectedDosen}
                        onChange={(e) => setSelectedDosen(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="">Select Dosen</option>
                        {availableDosen.map((dosen) => (
                            <option key={dosen.DosenID} value={dosen.DosenID}>
                                {dosen.Nama}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ApplySkripsi;
