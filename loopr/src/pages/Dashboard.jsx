

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatsCards from '../components/StatsCards'; 
import ChartOverview from '../components/ChartOverview';
import RecentTransactions from '../components/RecentTransactions';
import './Dashboard.css';


const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], income: [], expenses: [] });
  const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchData = async () => {
  try {
    const [statsRes, transRes, chartRes] = await Promise.all([
      fetch('/api/stats'),
      fetch('/api/transactions'),
      fetch('/api/chart-data'),
    ]);

    const statsData = await statsRes.json();
    const transData = await transRes.json();
    const chartData = await chartRes.json();

    setStats(statsData);
    setTransactions(transData.data); // only array
    setChartData(chartData);

    setLoading(false); // 👈 this must be hit
  } catch (err) {
    console.error("Failed to load dashboard data", err);
    setLoading(false); // avoid infinite spinner on error
  }
};


    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;


  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar />

        {/* Stat Cards (self-fetching) */}
        <StatsCards data="stats"/>

        {/* Overview Chart + Recent Transactions */}
        <div className="overview-row">
          <ChartOverview data={chartData} />
<RecentTransactions transactions={(transactions?.data || []).slice(0, 3)} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
