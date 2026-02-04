// StatCard - Reusable animated statistics card component
import React from 'react';
import { formatNumber } from '../utils/formatters';
import '../Styles/StatCard.css';

const StatCard = ({
  value,
  label,
  description,
  variant = 'primary', // 'primary', 'secondary', 'accent'
  animated = false,
  className = '',
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  // If hl-stat-card class is provided, use existing HL styling structure
  if (className.includes('hl-stat-card')) {
    return (
      <div
        className={`${className} ${variant}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <div className="hl-stat-number">
          {formatNumber(value)}
        </div>
        <div className="hl-stat-label">{label}</div>
        {description && (
          <div className="hl-stat-description">
            {description}
          </div>
        )}
      </div>
    );
  }

  // If mw-stat-card class is provided, use MW styling structure
  if (className.includes('mw-stat-card')) {
    return (
      <div
        className={`${className} ${variant}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <div className="mw-stat-number">
          {formatNumber(value)}
        </div>
        <div className="mw-stat-label">{label}</div>
        {description && (
          <div className="mw-stat-description">
            {description}
          </div>
        )}
      </div>
    );
  }

  // Otherwise use generic stat-card styling
  return (
    <div
      className={`stat-card ${variant} ${animated ? 'animate' : ''} ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="stat-number">
        {formatNumber(value)}
      </div>
      <div className="stat-label">{label}</div>
      {description && (
        <div className="stat-description">
          {description}
        </div>
      )}
    </div>
  );
};

export default StatCard;