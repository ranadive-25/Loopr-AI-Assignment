import React, { useEffect, useState } from 'react';
import './ChartOverview.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const ChartOverview = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/chart-data');
        const data = await res.json();
        setChartData(data);
      } catch (err) {
        console.error('Error fetching chart data:', err);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Overview</h3>
        <div className="chart-legend">
          <span className="dot income-dot" /> Income
          <span className="dot expenses-dot" /> Expenses
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="month" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#4CAF50" strokeWidth={2} />
          <Line type="monotone" dataKey="expenses" stroke="#FFC107" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartOverview;
