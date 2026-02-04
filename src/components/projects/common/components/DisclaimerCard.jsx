// DisclaimerCard - Specialized disclaimer component
import React from 'react';
import ContentCard from './ContentCard';

const DisclaimerCard = ({
  title = "Disclaimer",
  children,
  className = ''
}) => {
  // If HL disclaimer classes are provided, use the exact HL structure
  if (className.includes('hl-disclaimer-card')) {
    return (
      <div className={className}>
        <div className="hl-disclaimer-header">
          <div className="hl-disclaimer-icon">⚠️</div>
          <h3>{title}</h3>
        </div>
        {children}
      </div>
    );
  }

  // Otherwise use ContentCard with disclaimer styling
  return (
    <ContentCard
      variant="disclaimer"
      title={title}
      icon="⚠️"
      className={className}
    >
      {children}
    </ContentCard>
  );
};

export default DisclaimerCard;