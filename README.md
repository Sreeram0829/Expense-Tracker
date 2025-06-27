💸 Expense Tracker — MERN Stack Application
A full-stack Expense Tracker web application built using React + Vite, Node.js, Express, and MongoDB Atlas, designed for seamless expense management with modern UI, authentication, and role-based access control.


🚀 Live Links
Frontend: https://your-frontend-live-link.netlify.app
Backend API: https://your-backend-live-link.onrender.com


🛠️ Tech Stack
Frontend: React + Vite, React Router, Context API
Backend: Node.js, Express
Database: MongoDB Atlas
Deployment: Netlify (Frontend), Render (Backend)


📂 Project Structure
expense-tracker/
├── frontend/    # React + Vite frontend
├── backend/     # Node.js + Express backend
├── README.md
├── .gitignore   



🌐 Key Features
✅ Modern, responsive UI with dark mode support
✅ User authentication with protected routes
✅ Role-based access control for Admin features
✅ Expense dashboard with real-time listing
✅ Reports and visual charts for insights
✅ User settings and preferences management
✅ Secure connection to MongoDB Atlas database
✅ Clean routing structure with fallback handling


🗺️ Route Overview
| Route           | Access Type         | Description                      |
| --------------- | ------------------- | -------------------------------- |
| `/`             | Public              | Home page with introduction      |
| `/login`        | Public (App Layout) | Login for existing users         |
| `/register`     | Public (App Layout) | New user registration            |
| `/unauthorized` | Public (App Layout) | Unauthorized access notification |
| `/dashboard`    | Protected           | Main expense dashboard           |
| `/reports`      | Protected           | Visual reports and charts        |
| `/settings`     | Protected           | User settings and preferences    |
| `/admin`        | Admin Only          | Admin control panel              |
| `*`             | Fallback to `/`     | Handles undefined routes         |


📦 Local Setup Instructions
🔧 Backend Setup
cd backend
npm install
npm start
Create .env inside backend/:
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
💻 Frontend Setup
cd frontend
npm install
npm run dev
Create .env inside frontend/:
REACT_APP_API_URL=https://your-backend-live-link.onrender.com


🎨 Styling Highlights
Global theming with dark mode toggle
CSS-based 3D animated backgrounds
Responsive layouts for desktop & mobile
Clean UI components: buttons, forms, cards, modals, tables
Dashboard with integrated charts and analytics


☁️ Deployment Overview
Frontend deployed on Netlify
Backend deployed on Render
Database hosted on MongoDB Atlas


👨‍💻 Developed by Chapala Sriram

