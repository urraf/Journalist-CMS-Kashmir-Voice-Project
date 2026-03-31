# Kashmir Voice Project - Journalist CMS

A full-stack, modern Content Management System (CMS) specifically designed for journalists to effortlessly manage, publish, and search news articles and blogs. It delivers an intuitive, fast reading experience for visitors alongside a secure administrative dashboard for content creators.

## 🚀 Tech Stack

### Frontend (Client)
- **Framework:** React.js (Bootstrapped with Vite)
- **Styling:** Tailwind CSS, Flowbite React
- **State Management:** Redux Toolkit, Redux-Persist
- **Routing:** React Router v6
- **Rich Text Editor:** React Quill
- **Integrations:** Firebase (Storage/Services), EmailJS (Contact forms)
- **Font:** EB Garamond

### Backend (API)
- **Environment:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **Media Handling:** Cloudinary, express-fileupload

---

## 🏗️ Project Architecture & Application Flow

### 1. Visitor / Reader Flow
- **Home (`/`)**: Landing page showcasing featured and recent articles.
- **Blogs/Article (`/blogs`, `/article`)**: Browse through all published news and stories.
- **Article Viewer (`/post/:postSlug`)**: Dynamic individual article pages with rich text rendering.
- **Search (`/search`)**: Users can perform text-based searches to find relevant posts.
- **Contact (`/contact`)**: Securely email the journalist/admin via an EmailJS-powered contact form.

### 2. Administrator / Journalist Flow
- **Authentication (`/admin`)**: Secure login and authorization workflow protecting CMS assets.
- **Dashboard (`/dashboard`)**: Protected behind (`PrivateRoute`). Provides a centralized view of user details and personal settings.
- **Content Creation (`/create-post`)**: Protected behind (`AdminPrivateRoute`). Journalists use the integrated rich-text editor (React Quill) to format content and embed media seamlessly. Media is handled on the backend via Cloudinary.
- **Content Management (`/update-post/:postId`)**: Direct access to edit, update, or unpublish existing content.

---

## 📂 File Structure

```text
Journalist-CMS-Kashmir-Voice-Project/
├── api/                  # Express/Node.js Backend
│   ├── config/           # Configurations (e.g., Environment, Services)
│   ├── controller/       # Route controllers (Auth, Users, Posts)
│   ├── models/           # Mongoose schemas (post.model.js, user.model.js)
│   ├── routes/           # Express API Endpoints
│   ├── utils/            # Helper functions / Middlewares
│   └── index.js          # API Server entry point
│
├── client/               # React/Vite Frontend
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable UI elements (Header, Contact, PrivateRoutes)
│   │   ├── pages/        # Main route endpoints (Home, Admin, CreatePost)
│   │   ├── redux/        # Global store and persistence
│   │   ├── App.jsx       # Client router and layout setup
│   │   ├── main.jsx      # React DOM entry point
│   │   ├── firebase.js   # Firebase initialization
│   │   └── index.css     # Global Tailwind directives
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── package.json          # Root package for backend dependencies and build scripts
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Database (Local or MongoDB Atlas)
- Cloudinary Account (for media uploads)
- Firebase Account
- EmailJS Account

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd Journalist-CMS-Kashmir-Voice-Project
   ```

2. **Install Backend Dependencies:**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd client
   npm install
   cd ..
   ```

### Environment Variables

You need to set up environment variables for both the backend and frontend.

**Backend (`/.env`):**
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Frontend** expects Firebase config within `client/src/firebase.js`.

### Running the Application

**Start the Backend Server:**
Ensure you are in the root directory.
```bash
npm run dev
```
*(Runs nodemon on `api/index.js`)*

**Start the Frontend App:**
Open a new terminal session.
```bash
cd client
npm run dev
```
*(Runs Vite on `localhost:5173` typically)*

## 📝 License
This project is licensed under the ISC License.
