import { useState } from 'react'
import './styles/App.css'
import SplashScreen from './components/splash/SplashScreen'
import OnboardingScreen from './components/onboarding/OnboardingScreen'

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
      // We've reached the end of onboarding
      setOnboardingComplete(true);
    }
  };

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
      ) : (
        <div className="placeholder-main-app">
          <h1>Main App Coming Soon!</h1>
          <p>You have completed the onboarding process.</p>
        </div>
      )}
    </>
  )
}

export default App
