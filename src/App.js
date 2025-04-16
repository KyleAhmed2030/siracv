import React, { useState, useEffect } from 'react';
import { ThemeContextProvider } from './context/ThemeContext';
import { ResumeContextProvider } from './context/ResumeContext';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import WelcomeScreen from './screens/WelcomeScreen';

function App() {
  const [theme, setTheme] = useState('light');
  
  // Load saved theme from localStorage on app start
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  // Apply theme to body class
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  return (
    <ThemeContextProvider initialTheme={theme}>
      <ResumeContextProvider>
        <div className="app-container">
          <header>
            <div className="header-controls">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </header>
          
          <main>
            <WelcomeScreen onGetStarted={() => console.log('Get started clicked')} />
          </main>
        </div>
      </ResumeContextProvider>
    </ThemeContextProvider>
  );
}

export default App;