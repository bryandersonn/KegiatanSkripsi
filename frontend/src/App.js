import React from 'react'
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import RegisterMahasiswa from './components/RegisterMahasiswa'
import RegisterDosen from './components/RegisterDosen'
import RegisterStaff from './components/RegisterStaff'
import DashboardStaff from './components/DashboardStaff'
import DashboardDosen from './components/DashboardDosen'
import Dashboard from './components/Dashboard'
import ApplySkripsi from './components/ApplySkripsi'
import UpdateSkripsi from './components/UpdateSkripsi'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Login></Login>}></Route>
        <Route path='/register' element = {<Register></Register>}></Route>
        <Route path='/registermahasiswa' element = {<RegisterMahasiswa></RegisterMahasiswa>}></Route>
        <Route path='/registerdosen' element = {<RegisterDosen></RegisterDosen>}></Route>
        <Route path='/registerstaff' element = {<RegisterStaff></RegisterStaff>}></Route>
        <Route path='/dashboardstaff' element = {<DashboardStaff></DashboardStaff>}></Route>
        <Route path='/dashboarddosen' element = {<DashboardDosen></DashboardDosen>}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apply-skripsi" element={<ApplySkripsi />} />
        <Route path="/updateskripsi" element={<UpdateSkripsi />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App