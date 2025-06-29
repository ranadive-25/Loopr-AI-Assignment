Finance Dashboard App - README
📁 Project Structure
/backend      - Express.js API
/frontend     - React.js UI

🚀 Features
- User authentication (login)
- Dashboard overview of financials
- Transaction management with search, filter, sort, export to CSV
- Wallets: Add, Edit, Delete
- Messages: Inbox-style grouped view with search and sort
- Personal profile with theme, currency & language preferences
- 
⚙️ Prerequisites
- Node.js (v18+)
- MongoDB (local or cloud, e.g., MongoDB Atlas)
  
🔧 Backend Setup (/backend)
1. Navigate to the backend directory
cd backend

2. Install dependencies
npm install

3. Environment variables
Create a .env file and add:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-dashboard

(Replace MONGODB_URI if using MongoDB Atlas)

4. Start the backend server
npm run dev

Backend runs at: http://localhost:5000
🌐 Frontend Setup (/frontend)
1. Navigate to the frontend directory
cd frontend

2. Install dependencies
npm install

3. Start the React app
npm run dev

Frontend runs at: http://localhost:5173
🧪 Test Login
Use a seeded user (or insert manually). Example:

{
"email": "sahil@example.com",
"password": "pass1234"
}
📦 Scripts Summary
🔙 Backend
cd backend
npm install
npm run dev

💻 Frontend
cd frontend
npm install
npm run dev
📤 Environment Notes
- Backend must be running before frontend
- MongoDB must be live and accessible via the URI
- CORS must be handled if using different ports
