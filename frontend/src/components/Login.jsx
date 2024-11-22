import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const doLogin = async (e) => {
        e.preventDefault();
        try {
          const loginData = {
            Email: email,
            Password: password,
          };
    
          const response = await axios.post(
            'http://localhost:3000/api/users/login',
            loginData,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );


          if(response.status === 200){
            localStorage.setItem('email', email);
            localStorage.setItem('role', response.data);
            if(response.data === "Mahasiswa"){
                window.location.href = '/dashboard';
            }
            else if(response.data === "Dosen"){
                window.location.href = '/dashboarddosen';
            }
            else if(response.data === "Staff"){
                window.location.href = '/dashboardstaff';
            }
          }

          console.log('Success:', response.data);
          alert('Login successful');
          
        } catch (error) {
          alert('Login failed. Please try again.');
        }
      };

      useEffect(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        }, []);

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
        <img className='img-thumbnail border-0' src="/assets/image.png" alt="" />
            <form onSubmit={doLogin}>
                <div className='mb-3'>
                            <input
                            className='form-control rounded-0'
                            placeholder='Email'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                </div>
                <div className='mb-3'>
                            <input
                            className='form-control rounded-0'
                            placeholder='Password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                </div>
                <button type='submit' className='btn btn-primary w-100'>LOGIN</button>
                <p></p>
                <Link to="/register" className='btn btn-secondary w-100 text-decoration-none'>REGISTER</Link>
            </form>
        </div>
    </div>
  )
}

export default Login