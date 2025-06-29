import React, { useEffect, useState } from 'react';
import './TransactionTable.css';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const params = new URLSearchParams({
          search,
          type: type === 'all' ? '' : type,
          sortBy: 'date',
          order: sortOrder,
        });

        const res = await fetch(`http://localhost:5000/api/transactions?${params.toString()}`);
        const json = await res.json();
        const data = Array.isArray(json.data?.data) ? json.data.data : [];

        console.log('✅ Transactions fetched:', data);
        setTransactions(data);
      } catch (error) {
        console.error('❌ Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [search, type, sortOrder]);

  // ✅ CSV export logic
  const exportCSV = () => {
    if (!transactions.length) return;

    const headers = ['Date', 'Description', 'Category', 'Amount'];
    const rows = transactions.map(tx => [
      tx.date ? new Date(tx.date).toLocaleDateString() : '',
      tx.description || '',
      tx.category || '',
      typeof tx.amount === 'number' ? `${tx.amount > 0 ? '+' : '-'}$${Math.abs(tx.amount).toFixed(2)}` : '0.00'
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `transactions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="table-container">
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
        <button onClick={exportCSV} className="export-btn">Export CSV</button>
      </div>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <tr key={tx._id || index}>
                <td>{tx.date ? new Date(tx.date).toLocaleDateString() : 'N/A'}</td>
                <td>{tx.description || 'N/A'}</td>
                <td>{tx.category || 'N/A'}</td>
                <td className={tx.amount > 0 ? 'green' : 'red'}>
                  {typeof tx.amount === 'number'
                    ? `${tx.amount > 0 ? '+' : '-'}$${Math.abs(tx.amount).toFixed(2)}`
                    : '$0.00'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
