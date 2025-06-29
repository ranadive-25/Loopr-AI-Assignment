import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './Message.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/messages');
        const json = await res.json();
        const data = json.data || [];
        console.log('✅ Messages fetched:', data);
        setMessages(data);
        if (data.length > 0) {
          setSelectedType(data[0].type);
        }
      } catch (err) {
        console.error('❌ Error fetching messages:', err);
      }
    };

    fetchMessages();
  }, []);

  const groupedTypes = [...new Set(messages.map(msg => msg.type))];

  const filteredMessages = messages
    .filter(msg => msg.type === selectedType)
    .filter(msg =>
      msg.title.toLowerCase().includes(search.toLowerCase()) ||
      msg.content.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar />

        <div className="messages-container">
          <div className="message-sidebar">
            <h3>Inboxes</h3>
            {groupedTypes.map(type => (
              <div
                key={type}
                className={`message-type ${type === selectedType ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </div>
            ))}
          </div>

          <div className="message-list">
            <div className="message-controls">
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>

            <h3>{selectedType || 'Messages'}</h3>
            {filteredMessages.length === 0 ? (
              <p>No messages in this category.</p>
            ) : (
              filteredMessages.map(msg => (
                <div key={msg._id} className={`message-card ${msg.isRead ? '' : 'unread'}`}>
                  <div className="message-header">
                    <h4>{msg.title}</h4>
                    <span className="date">{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="message-content">{msg.content}</p>
                  {!msg.isRead && <span className="unread-dot" />}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
