import React from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import './Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <h2>Dashboard</h2>
      <div className="topbar-right">
        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search..." />
        </div>
        <FaBell className="topbar-icon" />
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="topbar-avatar"
        />
      </div>
    </div>
  );
};

export default Topbar;
