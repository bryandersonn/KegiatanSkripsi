import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Register.css';

function RegisterStaff() {
    const [bnid, setBnid] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nama, setNama] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const takeRegisterStaff = async (e) => {
        e.preventDefault();
        try {
          const staffData = {
            BNID: bnid,
            Nama: nama,
            Email: email,
            Password: password,
          };
    
          const response = await axios.post(
            'http://localhost:3000/api/staffs/registerstaff',
            staffData,
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
        <p className='d-flex justify-content-center'>Staff Registration</p>
            <form onSubmit={takeRegisterStaff}>
                <div id="formcontainer">
                    <div>
                        <div className='mb-3'>
                            <label>BNID</label>
                            <input
                                className='form-control rounded-0'
                                placeholder='BNID'
                                type="text"
                                value={bnid}
                                onChange={(e) => setBnid(e.target.value)}
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
  )
}

export default RegisterStaff