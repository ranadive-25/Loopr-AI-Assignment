import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Wallet from './pages/wallet';
import Message from './pages/Message';
import Personal from './pages/Personal';

import { AppProvider } from './pages/AppContext'; // ✅ Adjust path if needed

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/Personal" element={<Personal />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
