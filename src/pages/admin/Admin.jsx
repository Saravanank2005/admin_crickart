import React from 'react'
import './Admin.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import {Routes,Route, Navigate} from 'react-router-dom'
import AddProduct from '../../components/AddProduct/AddProduct'
import ListProduct from '../../components/ListProduct/ListProduct'
import Navbar from '../../components/Navbar/Navbar'

const Admin = () => {
  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-container">
        <Sidebar />
        <main className="admin-main">
          <Routes>
            <Route path="/" element={<Navigate to="listproduct" />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="listproduct" element={<ListProduct />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default Admin