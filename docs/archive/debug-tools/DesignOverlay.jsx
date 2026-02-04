import React, { useState, useEffect } from 'react';
import './DesignOverlay.css';

const DesignOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle overlay with keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'g' && e.ctrlKey) {
        e.preventDefault();
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  // Grid anchor points - A1-A5 markers
  const anchorPoints = [
    { id: 'A1', position: '8%', label: 'Left Boundary', type: 'boundary' },
    { id: 'A1.5', position: '16.5%', label: 'Text Start', type: 'custom' },
    { id: 'A2', position: '25%', label: 'Left Content', type: 'content' },
    { id: 'A3', position: '50%', label: 'Center Spine', type: 'center' },
    { id: 'A4', position: '75%', label: 'Right Content', type: 'content' },
    { id: 'A5', position: '92%', label: 'Right Boundary', type: 'boundary' }
  ];

  if (!isVisible) {
    return (
      <div className="design-overlay-toggle">
        <div className="toggle-hint">Ctrl+G: Toggle Design Grid</div>
      </div>
    );
  }

  return (
    <div className="design-overlay-system">
      {/* Grid Anchor Points */}
      <div className="design-grid-main">
        {/* Vertical Grid Lines */}
        {anchorPoints.map((anchor) => (
          <div
            key={anchor.id}
            className={`grid-line vertical ${anchor.type}`}
            style={{ left: anchor.position }}
          >
            <div className="anchor-point">
              <div className="anchor-dot"></div>
              <div className="anchor-label">
                <span className="anchor-id">{anchor.id}</span>
                <span className="anchor-name">{anchor.label}</span>
                <span className="anchor-position">{anchor.position}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Center Line (special emphasis) */}
        <div className="center-spine" style={{ left: '50%' }}>
          <div className="center-label">CENTER SPINE</div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="design-overlay-controls">
        <h3>🎯 Design Grid</h3>
        <div className="anchor-reference">
          <h4>Anchor Points Reference:</h4>
          {anchorPoints.map((anchor) => (
            <div key={anchor.id} className="anchor-ref">
              <strong>{anchor.id}</strong>: {anchor.label} ({anchor.position})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignOverlay;