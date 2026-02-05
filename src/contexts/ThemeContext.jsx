import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Initialize state directly from localStorage to avoid race condition
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme !== null ? savedTheme === 'dark' : true; // Default to dark mode
  });

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('portfolio-theme', newIsDark ? 'dark' : 'light');
  };

  // Apply theme to html and body class for CSS (html needed for safe-area background)
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  const value = {
    isDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};