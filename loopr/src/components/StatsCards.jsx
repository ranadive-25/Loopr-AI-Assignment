import React, { useEffect, useState } from 'react';
import './StatsCards.css';
import { FaLock } from 'react-icons/fa';

const StatsCards = () => {
  const [stats, setStats] = useState({
    balance: 0,
    revenue: 0,
    expenses: 0,
    savings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/stats');
        const data = await res.json();
        console.log('✅ Stats data received:', data);

        setStats({
          balance: Number(data.Balance) || 0,
          revenue: Number(data.Revenue) || 0,
          expenses: Number(data.Expenses) || 0,
          savings: Number(data.Savings) || 0,
        });
      } catch (err) {
        console.error('❌ Failed to fetch stats:', err);
      }
    };

    fetchStats();
  }, []);

  const cardData = [
    { label: 'Balance', value: stats.balance },
    { label: 'Revenue', value: stats.revenue },
    { label: 'Expenses', value: stats.expenses },
    { label: 'Savings', value: stats.savings },
  ];

  return (
    <div className="stats-cards">
      {cardData.map((item, idx) => (
        <div className="stat-card" key={idx}>
          <div className="stat-icon"><FaLock /></div>
          <div>
            <p className="stat-label">{item.label}</p>
            <h3 className="stat-value">
              ${isNaN(item.value) ? '0.00' : item.value.toFixed(2)}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
