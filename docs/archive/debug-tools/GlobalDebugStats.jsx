// src/components/debug/GlobalDebugStats.jsx
// Fixed top-right panel showing global page metrics
import React, { useState, useEffect } from 'react';
import { useDebugMode } from '../../contexts/DebugModeContext';

const GlobalDebugStats = () => {
  const { debugMode, sectionMetrics } = useDebugMode();
  const [globalStats, setGlobalStats] = useState({
    pageHeight: 0,
    viewportHeight: 0,
    scrollY: 0
  });

  useEffect(() => {
    if (!debugMode) return;

    const updateGlobalStats = () => {
      setGlobalStats({
        pageHeight: document.documentElement.scrollHeight,
        viewportHeight: window.innerHeight,
        scrollY: window.scrollY
      });
    };

    updateGlobalStats();

    window.addEventListener('scroll', updateGlobalStats);
    window.addEventListener('resize', updateGlobalStats);

    return () => {
      window.removeEventListener('scroll', updateGlobalStats);
      window.removeEventListener('resize', updateGlobalStats);
    };
  }, [debugMode]);

  if (!debugMode) return null;

  return (
    <div className="debug-global-stats">
      <div className="debug-stats-header">
        <span className="debug-stats-title">📐 Layout Debug</span>
        <span className="debug-stats-hint">(Press 'd' to toggle)</span>
      </div>

      <div className="debug-stats-section">
        <div className="debug-stat-row">
          <span className="debug-stat-label">Page Height:</span>
          <span className="debug-stat-value">{globalStats.pageHeight}px</span>
        </div>
        <div className="debug-stat-row">
          <span className="debug-stat-label">Viewport:</span>
          <span className="debug-stat-value">{globalStats.viewportHeight}px</span>
        </div>
        <div className="debug-stat-row">
          <span className="debug-stat-label">Scroll Y:</span>
          <span className="debug-stat-value">{Math.round(globalStats.scrollY)}px</span>
        </div>
      </div>

      <div className="debug-stats-divider"></div>

      <div className="debug-stats-section">
        <div className="debug-sections-title">Sections:</div>
        {Object.entries(sectionMetrics).map(([id, metrics]) => (
          <div key={id} className="debug-section-stat">
            <span className="debug-section-id">#{id}</span>
            <div className="debug-section-metrics">
              <span>{metrics.height}px</span>
              {metrics.minHeight !== 'auto' && (
                <span className="debug-min-height">(min: {metrics.minHeight})</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalDebugStats;
