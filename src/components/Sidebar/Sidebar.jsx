import React from 'react'
import './Sidebar.css'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className='sidebar'>
      <div className="nav-links">
        <Link
          to="/admin/listproduct"
          className={`nav-link ${location.pathname === '/admin/listproduct' ? 'active' : ''}`}
        >
          <span className="nav-icon">📦</span>
          Products List
        </Link>
        <Link
          to="/admin/addproduct"
          className={`nav-link ${location.pathname === '/admin/addproduct' ? 'active' : ''}`}
        >
          <span className="nav-icon">➕</span>
          Add Product
        </Link>
      </div>
    </div>
  )
}

export default Sidebar