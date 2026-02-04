// AnalysisCard - Reusable card for analysis context and interpretation
import React from 'react';
import '../Styles/AnalysisCard.css';

const AnalysisCard = ({
  icon,
  title,
  children,
  variant = '',
  className = ''
}) => {
  // Check for HL-specific classes and preserve existing structure
  if (className.includes('hl-analysis-card')) {
    return (
      <div className={`hl-detailed-analysis`}>
        <div className={`${className} ${variant}`}>
          <div className="hl-analysis-header">
            <div className="hl-analysis-icon">{icon}</div>
            <h4>{title}</h4>
          </div>
          <div className="hl-analysis-content">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Generic styling for future projects
  return (
    <div className={`analysis-card ${variant} ${className}`}>
      <div className="analysis-header">
        <div className="analysis-icon">{icon}</div>
        <h4>{title}</h4>
      </div>
      <div className="analysis-content">
        {children}
      </div>
    </div>
  );
};

export default AnalysisCard;
