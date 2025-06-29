import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaWallet, FaChartPie, FaUser, FaEnvelope, FaCog, FaHome, FaExchangeAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">Loopr</div>
      <ul className="sidebar-menu">
        <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? 'active' : '')}>
          <li><FaHome /> Dashboard</li>
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => (isActive ? 'active' : '')}>
          <li><FaExchangeAlt /> Transactions</li>
        </NavLink>
        <NavLink to="/wallet" className={({ isActive }) => (isActive ? 'active' : '')}>
          <li><FaWallet /> Wallet</li>
        </NavLink>
        <NavLink to="/Message" className={({ isActive }) => (isActive ? 'active' : '')}>
          <li><FaEnvelope /> Message</li>
        </NavLink>
        
        <NavLink to="/Personal" className={({ isActive }) => (isActive ? 'active' : '')}>
            <li><FaUser /> Personal</li>
        </NavLink>

        
      </ul>
    </div>
  );
};

export default Sidebar;
