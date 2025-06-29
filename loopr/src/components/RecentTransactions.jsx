import React, { useEffect, useState } from 'react';
import './RecentTransactions.css';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/transactions');
        const json = await res.json();
        const dataArray = json.data?.data || []; // ✅ navigate deeper safely
        console.log("Recent transactions:", dataArray);
        setTransactions(dataArray.slice(0, 5));
      } catch (err) {
        console.error('❌ Failed to fetch transactions:', err);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="recent-container">
      <div className="recent-header">
        <h3>Recent Transactions</h3>
        <a href="/transactions" className="see-all">See all</a>
      </div>
      <div className="recent-list">
        {transactions.map((tx, index) => (
          <div className="recent-item" key={index}>
            <div className="recent-info">
              <img src={`https://i.pravatar.cc/40?img=${index + 1}`} alt="avatar" className="avatar" />
              <div>
                <p className="recent-label">
                  {tx.amount > 0 ? 'Received from' : 'Paid to'}
                </p>
                <p className="recent-name">{tx.description || 'N/A'}</p>
              </div>
            </div>
            <div className={`recent-amount ${tx.amount > 0 ? 'green' : 'red'}`}>
              {tx.amount > 0 ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
