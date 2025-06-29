import React, { useEffect, useState } from 'react';
import './Wallet.css';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Wallet = () => {
  const [wallets, setWallets] = useState([]);
  const [form, setForm] = useState({
    _id: '',
    name: '',
    balance: '',
    currency: '',
    type: '',
  });
  const [showForm, setShowForm] = useState(false);

  const fetchWallets = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/wallets');
      const json = await res.json();
      const data = json.data?.data || [];
      setWallets(data);
    } catch (err) {
      console.error('❌ Error fetching wallets:', err);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload
    const payload = {
      name: form.name,
      balance: Number(form.balance),
      currency: form.currency,
      type: form.type,
    };

    // Set a hardcoded user_id if adding new wallet
    if (!form._id) {
      payload.user_id = '685ff35f9ce35c5b403f427d'; // 💡 Your valid user ID
    }

    try {
      const method = form._id ? 'PUT' : 'POST';
      const url = form._id
        ? `http://localhost:5000/api/wallets/${form._id}`
        : `http://localhost:5000/api/wallets`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || 'Failed to save wallet');

      console.log('✅ Wallet saved:', result);

      // Reset
      setShowForm(false);
      setForm({ _id: '', name: '', balance: '', currency: '', type: '' });
      fetchWallets();
    } catch (err) {
      console.error('❌ Wallet save error:', err);
      alert('Error saving wallet. Please check console.');
    }
  };

  const handleEdit = (wallet) => {
    setForm(wallet);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this wallet?')) return;
    await fetch(`http://localhost:5000/api/wallets/${id}`, { method: 'DELETE' });
    fetchWallets();
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar />

        <div className="wallet-header">
          <h2>Wallets</h2>
          <button onClick={() => setShowForm(true)}>+ Add Wallet</button>
        </div>

        {showForm && (
          <form className="wallet-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Wallet Name"
              value={form.name}
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Balance"
              value={form.balance}
              required
              onChange={(e) => setForm({ ...form, balance: e.target.value })}
            />
            <input
              type="text"
              placeholder="Currency (e.g., USD)"
              value={form.currency}
              required
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
            />
            <select
              value={form.type}
              required
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="">Select Type</option>
              <option value="Credit">Credit</option>
              {/* <option value="Debit">Bank</option> */}
            </select>
            <button type="submit">{form._id ? 'Update Wallet' : 'Create Wallet'}</button>
          </form>
        )}

        <div className="wallet-grid">
          {wallets.map((wallet) => (
            <div className="wallet-card" key={wallet._id}>
              <h3>{wallet.name}</h3>
              <p>💰 {wallet.balance} {wallet.currency}</p>
              <p>Type: {wallet.type}</p>
              <div className="wallet-actions">
                <button onClick={() => handleEdit(wallet)}>Edit</button>
                <button onClick={() => handleDelete(wallet._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
