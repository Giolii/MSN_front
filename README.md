# MSN_front

<div align="center">
  <img src="https://i.postimg.cc/CMb0Y163/MSN.jpg" width="500" alt="MSN Clone Logo">
  <h3>A modern recreation of the classic MSN Messenger experience</h3>
</div>

## 📋 Overview

MSN_front is a nostalgic yet modern implementation of the classic MSN Messenger interface.

## ✨ Features

- **User Authentication** - Register and login functionality
- **Theme Support** - Light/dark mode and customizable themes
- **Responsive Design** - Works on desktop and mobile devices
- **Contact Management** - Add, remove, and organize contacts

## 🛠️ Tech Stack

- **React** - UI library
- **React Router** - Navigation and routing
- **Context API** - State management (Theme, Auth)
- **CSS/TAILWIND** - Styling

## 📦 Installation

### Prerequisites
- Node.js (v14.x or higher)
- npm or yarn
- Backend server running ([MSN_back](https://github.com/Giolii/MSN_back))

### Setup

1. Clone the repository
```bash
git clone https://github.com/Giolii/MSN_front.git
cd MSN_front
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
# Create a .env file in the root directory
touch .env
```

Add the required environment variables:
```
VITE_API_URL
VITE_GIPHY_API
```

4. Start the development server
```bash
npm start
# or
yarn start
```

5. Open your browser and visit `http://localhost:5173/`

## 🧩 Components and Pages

### Pages
- **Chat** - Main chat interface where conversations happen
- **Login** - User login page
- **Register** - New user registration page
- **NotFound** - 404 error page for invalid routes

### Layouts
- **HomeLayout** - Protected layout for authenticated users
- **MainLayout** - Public layout for non-authenticated pages

## 📱 Routes

| Path | Component | Layout | Authentication |
|------|-----------|--------|----------------|
| `/` | `Chat` | `HomeLayout` | Required |
| `/login` | `Login` | `MainLayout` | Not required |
| `/register` | `Register` | `MainLayout` | Not required |
| `*` | `NotFound` | `MainLayout` | Not required |

## 🎨 Theming

Dark / Light Theme


## 🔄 Connection with Backend

This frontend application connects to the [MSN_back](https://github.com/Giolii/MSN_back) backend repository, which handles:
- User authentication and session management
- Storing and retrieving chat messages
- Managing user contacts and relationships

## 🚀 Deployment

### Build for production
```bash
npm run build
# or
yarn build
```

The build files will be created in the `build` directory, ready to be deployed to your hosting service of choice.

### Deployment platforms
The frontend can be deployed on various platforms including:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

Thank You!
