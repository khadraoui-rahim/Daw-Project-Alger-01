import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import './styles/App.css'
import SplashScreen from './components/splash/SplashScreen'
import OnboardingScreen from './components/onboarding/OnboardingScreen'
import LoginScreen from './components/login/LoginScreen'
import SignupScreen from './components/login/SignupScreen'
import HomeScreen from './components/home/HomeScreen'
import UserProfile from './components/profile/UserProfile'
import AddPostForm from './components/post/AddPostForm'
import { GlobalProvider } from './context/GlobalContext'
import { useGlobalContext } from './context/GlobalContext'
import PersistenceStatus from './components/common/PersistenceStatus'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import SinglePostPage from './components/post/SinglePostPage'
import rabbitLogo from './assets/images/rabbit.png'

// Protected route component to handle authentication
const ProtectedRoute = ({ children }) => {
  const { state } = useGlobalContext();
  const location = useLocation();

  if (!state.currentUser) {
    // Redirect to login but save the location they were trying to access
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

// Wrap content in a container to use the context and handle routing
const AppContent = () => {
  const { state } = useGlobalContext();
  const [showSplash, setShowSplash] = useState(true);
  const [currentOnboardingPage, setCurrentOnboardingPage] = useState(0);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Total number of onboarding screens
  const TOTAL_ONBOARDING_SCREENS = 3;

  // Check localStorage on initial render to see if onboarding was completed
  useEffect(() => {
    const onboardingStatus = localStorage.getItem('onboardingComplete');
    if (onboardingStatus === 'true') {
      setOnboardingComplete(true);
    }
  }, []);

  // Handle navigation after user logs in
  useEffect(() => {
    // If user is logged in and we're on the root path, navigate to /home
    if (state.currentUser && location.pathname === '/') {
      navigate('/home');
    }
  }, [state.currentUser, navigate, location.pathname]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleSkipOnboarding = () => {
    setOnboardingComplete(true);
    setShowLogin(true);
    localStorage.setItem('onboardingComplete', 'true');
  };

  const handleNextOnboarding = () => {
    if (currentOnboardingPage < TOTAL_ONBOARDING_SCREENS - 1) {
      setCurrentOnboardingPage(prev => prev + 1);
    } else {
      setOnboardingComplete(true);
      setShowLogin(true);
      localStorage.setItem('onboardingComplete', 'true');
    }
  };

  const handleLoginBack = (screen) => {
    if (screen === 'signup') {
      setShowLogin(false);
      setShowSignup(true);
    } else {
      setShowLogin(false);
      setShowSignup(false);
    }
  };

  const handleSignupBack = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleLoginSuccess = () => {
    // Navigate to home route after successful login
    navigate('/home');
  };

  const handleSignupSuccess = () => {
    // Navigate to home route after successful signup
    navigate('/home');
  };

  // Render the appropriate screen for the root path
  const renderRootPath = () => {
    if (showSplash) {
      return <SplashScreen onSplashComplete={handleSplashComplete} />;
    } else if (!onboardingComplete) {
      return (
        <OnboardingScreen
          onNext={handleNextOnboarding}
          onSkip={handleSkipOnboarding}
          currentPage={currentOnboardingPage}
        />
      );
    } else {
      return (
        <AnimatePresence mode="wait">
          {showSignup ? (
            <SignupScreen key="signup" onBack={handleSignupBack} onSignupSuccess={handleSignupSuccess} />
          ) : showLogin ? (
            <LoginScreen key="login" onBack={handleLoginBack} onLoginSuccess={handleLoginSuccess} />
          ) : (
            <div key="welcome" className="welcome-split-container">
              {/* Background image with overlay */}
              <div
                className="welcome-right-bg"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610333529589-727a858ed911?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
              ></div>

              {/* Centered Welcome Card */}
              <div className="welcome-left-panel">
                {/* Logo */}
                <div className="welcome-logo-wrapper">
                  <img src={rabbitLogo} alt="Rabbit Logo" className="welcome-logo" />
                </div>

                {/* Title */}
                <h1 className="welcome-title font-poppins">Welcome to Rabbit!</h1>
                <p className="welcome-subtitle font-poppins">You've completed the onboarding. Let's get started on your journey!</p>

                {/* Buttons */}
                <div className="welcome-buttons">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="welcome-button-primary font-poppins"
                  >
                    <span>Log In</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setShowSignup(true)}
                    className="welcome-button-secondary font-poppins"
                  >
                    <span>Create Account</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </button>
                </div>

                {/* Feature highlights */}
                <div className="welcome-features">
                  <div className="welcome-feature-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-poppins">Connect with friends</span>
                  </div>
                  <div className="welcome-feature-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-poppins">Share your moments</span>
                  </div>
                  <div className="welcome-feature-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span className="font-poppins">Explore the world</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      );
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<>{renderRootPath()}<PersistenceStatus /></>} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeScreen />
              <PersistenceStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
              <PersistenceStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-post"
          element={
            <ProtectedRoute>
              <AddPostForm onBack={() => navigate('/home')} />
              <PersistenceStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <SinglePostPage />
              <PersistenceStatus />
            </ProtectedRoute>
          }
        />
        {/* Catch-all route - redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

// Main App provides the context and router
function App() {
  return (
    <div className="min-h-screen bg-white">
      <GlobalProvider>
        <Router>
          <AppContent />
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App
