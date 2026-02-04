import React, { useEffect, useState } from 'react';
import './SectionSpacingDebug.css';

/**
 * SectionSpacingDebug - Visual debugging overlay
 * Toggle with Ctrl+Shift+D
 */
const SectionSpacingDebug = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Toggle with Ctrl+Shift+D
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsVisible(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="section-spacing-debug">
      <div className="debug-legend">
        <h4>Layout Debug (Ctrl+Shift+D)</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color section-boundary"></span>
            <span>Section Edge</span>
          </div>
          <div className="legend-item">
            <span className="legend-color content-width"></span>
            <span>Content Width</span>
          </div>
        </div>
      </div>

      <div className="width-info-box">
        <h4>Width System</h4>
        <div className="width-info-item">
          <strong>Hero:</strong> 100vw (full)
        </div>
        <div className="width-info-item">
          <strong>About:</strong> 100vw → 75.5vw text
        </div>
        <div className="width-info-item" style={{ color: '#00ffff' }}>
          <strong>Work:</strong> max 1400px ✓
        </div>
        <div className="width-info-item" style={{ color: '#00ffff' }}>
          <strong>Blog:</strong> max 1400px ✓
        </div>
        <div className="width-info-item" style={{ color: '#00ffff' }}>
          <strong>Contact:</strong> max 1400px ✓
        </div>
        <div style={{ marginTop: '10px', fontSize: '9px', opacity: 0.7, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '8px' }}>
          Consistent 1400px width for all content sections. See <code>WIDTH_ANALYSIS.md</code>
        </div>
      </div>
    </div>
  );
};

export default SectionSpacingDebug;
