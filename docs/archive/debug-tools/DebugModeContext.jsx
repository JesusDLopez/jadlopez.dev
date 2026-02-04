// src/contexts/DebugModeContext.jsx
// Global debug mode context - toggle with "d" key
import React, { createContext, useContext, useState, useEffect } from 'react';

const DebugModeContext = createContext();

export const useDebugMode = () => {
  const context = useContext(DebugModeContext);
  if (!context) {
    throw new Error('useDebugMode must be used within DebugModeProvider');
  }
  return context;
};

export const DebugModeProvider = ({ children }) => {
  const [debugMode, setDebugMode] = useState(false);
  const [sectionMetrics, setSectionMetrics] = useState({});

  // Keyboard listener for "d" key
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only toggle if "d" is pressed without modifiers
      if (e.key === 'd' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Don't trigger if typing in input/textarea
        const activeElement = document.activeElement;
        const isTyping = ['INPUT', 'TEXTAREA'].includes(activeElement?.tagName) ||
                        activeElement?.isContentEditable;

        if (!isTyping) {
          setDebugMode(prev => {
            console.log(`🐛 Debug mode: ${!prev ? 'ON' : 'OFF'}`);
            return !prev;
          });
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Apply/remove body class based on debug mode
  useEffect(() => {
    if (debugMode) {
      document.body.classList.add('debug-mode-active');
    } else {
      document.body.classList.remove('debug-mode-active');
    }
  }, [debugMode]);

  // Update section metrics
  const updateSectionMetrics = (sectionId, metrics) => {
    setSectionMetrics(prev => ({
      ...prev,
      [sectionId]: metrics
    }));
  };

  const value = {
    debugMode,
    setDebugMode,
    sectionMetrics,
    updateSectionMetrics
  };

  return (
    <DebugModeContext.Provider value={value}>
      {children}
    </DebugModeContext.Provider>
  );
};
