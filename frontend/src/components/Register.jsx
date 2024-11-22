import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


function Register() {

  useEffect(() => {
    localStorage.removeItem('email');
    }, []);

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
        <img className='img-thumbnail border-0' src="/assets/image.png" alt="" />
            <form >
                <div class="d-grid gap-2 col-6 mx-auto mb-2 w-100">
                    <Link to="/registermahasiswa" class="btn btn-secondary" type="button">Mahasiswa</Link>
                    <Link to="/registerdosen" class="btn btn-secondary" type="button">Dosen</Link>
                    <Link to="/registerstaff" class="btn btn-secondary" type="button">Staff</Link>
                </div>
                <Link to="/" className='btn btn-primary w-100' type='button'>LOGIN</Link>
            </form>
        </div>
    </div>
  )
}

export default Register