# 💬 ChatterBox — Real-Time Chat Application

A full-stack real-time chat application built with the **MERN stack** (MongoDB, Express.js, React, Node.js) and **Socket.IO** for instant messaging with live online/offline presence tracking.

---

## ✨ Features

- **🔐 Authentication** — Secure signup, login & logout using JWT tokens with HTTP-only cookies and bcrypt password hashing.
- **👤 Profile Management** — Update display name and upload a profile picture.
- **💬 Real-Time Messaging** — Instant message delivery using WebSockets (Socket.IO).
- **🟢 Online Status** — Live online/offline presence indicators for all users.
- **🖼️ Image Sharing** — Send images alongside text messages in conversations.
- **📱 Responsive UI** — Fully responsive design that works on desktop and mobile devices.

---

## 🛠️ Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| **Frontend** | React, Redux Toolkit, Tailwind CSS, Vite        |
| **Backend**  | Node.js, Express.js                             |
| **Database** | MongoDB, Mongoose                               |
| **Realtime** | Socket.IO                                       |
| **Auth**     | JSON Web Tokens (JWT), bcryptjs, cookie-parser   |

---

## 📁 Project Structure

```
chatterbox/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Request handlers (auth, messages)
│   ├── middlewares/      # JWT auth middleware
│   ├── models/           # Mongoose schemas (User, Message, Conversation)
│   ├── routes/           # API route definitions
│   ├── socket/           # Socket.IO server setup
│   ├── utils/            # JWT token generation utility
│   ├── .env              # Environment variables
│   ├── index.js          # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components (Sidebar, ChatBox)
│   │   ├── pages/        # Page components (Home, Login, Signup, Profile)
│   │   ├── redux/        # Redux store & slices (auth, chat, socket)
│   │   ├── App.jsx       # Root component with routing
│   │   ├── main.jsx      # Entry point with Provider & Router
│   │   └── index.css     # Tailwind CSS imports
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chatterbox.git
cd chatterbox
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/chatterbox
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Open in Browser

Navigate to `http://localhost:5173` and start chatting!

---

## 📡 API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint  | Description          | Auth Required |
| ------ | --------- | -------------------- | ------------- |
| POST   | `/signup` | Register a new user  | No            |
| POST   | `/login`  | Login existing user  | No            |
| POST   | `/logout` | Logout current user  | No            |
| PUT    | `/update` | Update user profile  | Yes           |

### Message Routes (`/api/messages`)

| Method | Endpoint     | Description                    | Auth Required |
| ------ | ------------ | ------------------------------ | ------------- |
| GET    | `/users`     | Get all users for sidebar      | Yes           |
| GET    | `/:id`       | Get messages with a user       | Yes           |
| POST   | `/send/:id`  | Send a message to a user       | Yes           |

---

## 🔌 Socket.IO Events

| Event             | Direction       | Description                          |
| ----------------- | --------------- | ------------------------------------ |
| `getOnlineUsers`  | Server → Client | Broadcasts list of online user IDs   |
| `newMessage`      | Server → Client | Sends new message to the receiver    |

---

## 📸 Screenshots

> _Add screenshots of your Login, Signup, Chat, and Profile pages here._

---

## 🙏 Acknowledgements

- [Socket.IO](https://socket.io/) for real-time communication
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Mongoose](https://mongoosejs.com/) for MongoDB object modeling

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
# ChatterBox
# ChatterBox
