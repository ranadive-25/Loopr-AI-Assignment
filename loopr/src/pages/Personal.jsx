import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './Personal.css';
import { useAppContext } from '../pages/AppContext';

const translations = {
  en: {
    profile: 'Personal Profile',
    loading: 'Loading...',
    email: 'Email',
    name: 'Name',
    password: 'Password',
    theme: 'Theme',
    currency: 'Currency',
    language: 'Language',
    save: 'Save Settings',
  },
  hi: {
    profile: 'व्यक्तिगत प्रोफ़ाइल',
    loading: 'लोड हो रहा है...',
    email: 'ईमेल',
    name: 'नाम',
    password: 'पासवर्ड',
    theme: 'थीम',
    currency: 'मुद्रा',
    language: 'भाषा',
    save: 'सेटिंग्स सहेजें',
  },
};

const userId = '685ff35f9ce35c5b403f427e'; // Replace with dynamic logic if needed

const Personal = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { theme, setTheme, language, setLanguage, currency, setCurrency } = useAppContext();

  const t = (key) => translations[language || 'en'][key];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`);
        if (!res.ok) throw new Error('User not found');
        const json = await res.json();
        setUser(json.data);
        const userSettings = json.data.settings || {};
        setTheme(userSettings.theme || 'light');
        setCurrency(userSettings.currency || 'USD');
        setLanguage(userSettings.language || 'en');
      } catch (err) {
        console.error('❌ Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode';
  }, [theme]);

  const handleSave = async () => {
    try {
      const settings = { theme, currency, language };
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });

      const result = await res.json();
      console.log('✅ Settings updated:', result);
    } catch (err) {
      console.error('❌ Error saving settings:', err);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="personal-page">
          <h2>{t('profile')}</h2>

          {loading ? (
            <p>{t('loading')}</p>
          ) : (
            <>
              <div className="profile-info">
                <p><strong>{t('email')}:</strong> {user?.email || 'Sahil@example.com'}</p>
                <p><strong>{t('name')}:</strong> {user?.name || 'Sahil Ranadive'}</p>
                <p><strong>{t('password')}:</strong> pass1234</p>
              </div>

              <div className="settings-section">
                <h3>{t('save')}</h3>

                <label>{t('theme')}:</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>

                <label>{t('currency')}:</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                </select>

                <label>{t('language')}:</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                </select>

                <button onClick={handleSave}>{t('save')}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Personal;
