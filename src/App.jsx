import { useState, useEffect } from 'react'
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
    } else if (showSignup) {
      return <SignupScreen onBack={handleSignupBack} onSignupSuccess={handleSignupSuccess} />;
    } else if (showLogin) {
      return <LoginScreen onBack={handleLoginBack} onLoginSuccess={handleLoginSuccess} />;
    } else {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome!</h1>
            <p className="text-xl text-gray-600">You have completed the onboarding process.</p>
            <div className="flex flex-col space-y-4 mt-6">
              <button
                onClick={() => setShowLogin(true)}
                className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                Go to Login
              </button>
              <button
                onClick={() => setShowSignup(true)}
                className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
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
