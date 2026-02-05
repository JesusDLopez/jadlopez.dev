// ContentCard - Reusable content card component
import React from 'react';
import '../styles/ContentCard.css';

const ContentCard = ({
  title,
  children,
  variant = 'default', // 'default', 'contribution', 'disclaimer'
  icon,
  className = ''
}) => {
  // If HL content card classes are provided, use existing HL styling structure
  if (className.includes('hl-content-card')) {
    return (
      <div className={className}>
        {(title || icon) && (
          <div className="hl-disclaimer-header">
            {icon && <div className="hl-disclaimer-icon">{icon}</div>}
            {title && <h3>{title}</h3>}
          </div>
        )}
        {children}
      </div>
    );
  }

  // If MW content card classes are provided, use MW styling structure
  if (className.includes('mw-content-card')) {
    return (
      <div className={className}>
        {(title || icon) && (
          <div className="mw-card-header">
            {icon && <div className="mw-card-icon">{icon}</div>}
            {title && <h3>{title}</h3>}
          </div>
        )}
        {children}
      </div>
    );
  }

  // Otherwise use generic content-card styling
  return (
    <div className={`content-card ${variant} ${className}`}>
      {title && (
        <div className="content-card-header">
          {icon && <div className="content-card-icon">{icon}</div>}
          <h3>{title}</h3>
        </div>
      )}
      <div className="content-card-body">
        {children}
      </div>
    </div>
  );
};

export default ContentCard;