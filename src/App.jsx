import { useState } from 'react'
import './styles/App.css'
import SplashScreen from './components/splash/SplashScreen'
import OnboardingScreen from './components/onboarding/OnboardingScreen'
import { GlobalProvider } from './context/GlobalContext'

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentOnboardingPage, setCurrentOnboardingPage] = useState(0);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  // Total number of onboarding screens
  const TOTAL_ONBOARDING_SCREENS = 3;

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleSkipOnboarding = () => {
    setOnboardingComplete(true);
  };

  const handleNextOnboarding = () => {
    if (currentOnboardingPage < TOTAL_ONBOARDING_SCREENS - 1) {
      setCurrentOnboardingPage(prev => prev + 1);
    } else {
      setOnboardingComplete(true);
    }
  };

  return (
    <GlobalProvider>
      {showSplash ? (
        <SplashScreen onSplashComplete={handleSplashComplete} />
      ) : !onboardingComplete ? (
        <OnboardingScreen
          onNext={handleNextOnboarding}
          onSkip={handleSkipOnboarding}
          currentPage={currentOnboardingPage}
        />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome!</h1>
            <p className="text-xl text-gray-600">You have completed the onboarding process.</p>
          </div>
        </div>
      )}
    </GlobalProvider>
  );
}

export default App
