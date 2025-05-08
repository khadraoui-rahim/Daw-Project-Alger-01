# 🐰 Rabbit Social Media App

A modern, responsive social media application featuring clean design, real-time interactions, and a seamless user experience across desktop and mobile devices.

## 🌟 Features

- **Beautiful Onboarding Experience**
  - Engaging splash screen and multi-step introduction
  - Responsive design that works on both mobile and desktop

- **User Authentication**
  - Quick and easy signup and login
  - User profiles with avatars
  - Secure account management

- **Social Feed**
  - Post images with captions
  - Like and comment functionality
  - Real-time updates

- **Profile Management**
  - View your own posts in a grid layout
  - Edit or delete your posts
  - Delete account option with confirmation

- **Single Post View**
  - Dedicated view for individual posts
  - Comment threads 
  - Like counter and user engagement tools

- **Responsive UI**
  - Works seamlessly on mobile, tablet, and desktop
  - Optimized layouts for each screen size
  - Smooth animations and transitions

## 🛠️ Tech Stack

- **React** (v19) - Modern UI library
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Routing and navigation
- **Context API + Reducers** - State management solution

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/username/rabbit-social-media.git
   cd rabbit-social-media
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser to the local development URL (typically http://localhost:5173)

## 📁 Project Structure

```
rabbit-social-media/
├── public/              # Static assets served as-is
├── src/
│   ├── assets/          # Images, fonts, and other static assets
│   │   ├── common/      # Shared UI components
│   │   ├── home/        # Home screen components
│   │   ├── login/       # Authentication components
│   │   ├── onboarding/  # Onboarding experience
│   │   ├── post/        # Post-related components
│   │   ├── profile/     # User profile components
│   │   └── splash/      # Splash screen
│   ├── context/         # React contexts for state management
│   ├── data/            # Mock data and initial state
│   ├── reducers/        # State reducers for the app
│   ├── styles/          # Global styles and CSS
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 🚀 Deployment

### Deploy to Vercel

This project is configured for easy deployment to Vercel:

1. Push your code to a GitHub repository
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect the Vite configuration
4. The app will be built and deployed

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel
```

## 📱 Responsive Design

- **Mobile First**: Optimized for phone displays with intuitive touch interactions
- **Tablet**: Enhanced layouts for medium-sized screens
- **Desktop**: Full-featured experience with optimized layouts for larger screens

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

Made by (Khadraoui Abderrahim as a college project)
