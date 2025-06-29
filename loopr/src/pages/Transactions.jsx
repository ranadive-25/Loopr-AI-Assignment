// src/pages/Transactions.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import TransactionsTable from '../components/TransactionsTable';
import './Dashboard.css'; // Or create Transactions.css for page-level layout if needed

const Transactions = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <h2 style={{ color: 'white', margin: '20px 0' }}>All Transactions</h2>
        <TransactionsTable />
      </div>
    </div>
  );
};

export default Transactions;
