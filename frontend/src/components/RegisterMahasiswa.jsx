import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Register.css';

function RegisterMahasiswa() {
  const [nim, setNim] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nama, setNama] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [alamat, setAlamat] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const takeRegisterMahasiswa = async (e) => {
    e.preventDefault();
    try {
      const mahasiswaData = {
        NIM: nim,
        Nama: nama,
        Email: email,
        Password: password,
        TanggalLahir: tanggalLahir,
        Alamat: alamat,
      };

      const response = await axios.post(
        'http://localhost:3000/api/mahasiswas/registermahasiswa',
        mahasiswaData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Success:', response.data);
      alert('Registration successful');
      navigate('/');
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  useEffect(() => {
    localStorage.removeItem('email');
    }, []);

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-50' id="maincontainer">
        <p className='d-flex justify-content-center'>Mahasiswa Registration</p>
        <form onSubmit={takeRegisterMahasiswa}>
          <div id="formcontainer">
            <div>
              <div className='mb-3'>
                <label>NIM</label>
                <input
                  className='form-control rounded-0'
                  placeholder='NIM'
                  type="text"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <label>Nama</label>
                <input
                  className='form-control rounded-0'
                  placeholder='Nama'
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <label>Email</label>
                <input
                  className='form-control rounded-0'
                  placeholder='Email'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <div className='mb-3'>
                <label>Alamat</label>
                <input
                  className='form-control rounded-0'
                  placeholder='Alamat'
                  type="text"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <label>Tanggal Lahir</label>
                <input
                  className='form-control rounded-0'
                  placeholder='Tanggal Lahir'
                  type="date"
                  value={tanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <label>Password</label>
                <input
                  className='form-control rounded-0'
                  placeholder='Password'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div id="buttoncontainer">
            <button type='submit' className='btn btn-secondary w-75 text-decoration-none'>REGISTER</button>
            <Link to="/" className='btn btn-primary w-75' type='button' id='buttonlogin'>LOGIN</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterMahasiswa;
