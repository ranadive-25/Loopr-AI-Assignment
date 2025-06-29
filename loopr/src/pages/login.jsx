import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      console.log('Login successful:', response.data);

      // Optionally store token or user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(response.data));

      // Redirect to dashboard (adjust based on your routing)
      window.location.href = '/dashboard';

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="login-container">
      {/* LEFT SIDE */}
      <div className="login-left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/8879/8879509.png"
          alt="Logo"
          className="login-logo"
        />

        <h1 className="login-heading">Login to Your Account</h1>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-submit" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <button className="close-btn">×</button>
        <h2 className="signup-heading">Loopr AI Assignment</h2>
        <p className="signup-text">Name : Sahil Ranadive</p>
        <p className="signup-text">Use Login ID : Sahil@example.com</p>

        <p className="signup-text">Use password : pass1234</p>

        <p className="signup-btn">PRN : 22320078</p>
      </div>
    </div>
  );
};

export default Login;
