import { useState, useEffect } from 'react'
import './styles/App.css'
import SplashScreen from './components/splash/SplashScreen'
import OnboardingScreen from './components/onboarding/OnboardingScreen'
import LoginScreen from './components/login/LoginScreen'
import HomeScreen from './components/home/HomeScreen'
import { GlobalProvider } from './context/GlobalContext'
import { useGlobalContext } from './context/GlobalContext'
import PersistenceStatus from './components/common/PersistenceStatus'

// Wrap content in a container to use the context
const AppContent = () => {
  const { state } = useGlobalContext();
  const [showSplash, setShowSplash] = useState(true);
  const [currentOnboardingPage, setCurrentOnboardingPage] = useState(0);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Total number of onboarding screens
  const TOTAL_ONBOARDING_SCREENS = 3;

  // Check localStorage on initial render to see if onboarding was completed
  useEffect(() => {
    const onboardingStatus = localStorage.getItem('onboardingComplete');
    if (onboardingStatus === 'true') {
      setOnboardingComplete(true);
    }
  }, []);

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

  const handleLoginBack = () => {
    setShowLogin(false);
  };

  const handleLoginSuccess = () => {
    // This will hide the login screen
    setShowLogin(false);
  };

  // If user is logged in, show home screen
  if (state.currentUser) {
    return (
      <>
        <HomeScreen />
        <PersistenceStatus />
      </>
    );
  }

  // Otherwise show onboarding flow
  return (
    <>
      {showSplash ? (
        <SplashScreen onSplashComplete={handleSplashComplete} />
      ) : !onboardingComplete ? (
        <OnboardingScreen
          onNext={handleNextOnboarding}
          onSkip={handleSkipOnboarding}
          currentPage={currentOnboardingPage}
        />
      ) : showLogin ? (
        <LoginScreen onBack={handleLoginBack} onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome!</h1>
            <p className="text-xl text-gray-600">You have completed the onboarding process.</p>
            <button
              onClick={() => setShowLogin(true)}
              className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
      <PersistenceStatus />
    </>
  );
};

// Main App just provides the context now
function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  );
}

export default App
