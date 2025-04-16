import React from 'react';
import { ThemeContextProvider } from './context/ThemeContext';
import { ResumeContextProvider } from './context/ResumeContext';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import WelcomeScreen from './screens/WelcomeScreen';

function App() {
  return (
    <ThemeContextProvider>
      <ResumeContextProvider>
        <AppContent />
      </ResumeContextProvider>
    </ThemeContextProvider>
  );
}

// Separate component to consume the theme context
function AppContent() {
  return (
    <div className="app-container">
      <header>
        <div className="header-logo">
          <h1 className="logo">Sira</h1>
        </div>
        <div className="header-controls">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </header>
      
      <main>
        <WelcomeScreen onGetStarted={() => console.log('Get started clicked')} />
      </main>
    </div>
  );
}

export default App;