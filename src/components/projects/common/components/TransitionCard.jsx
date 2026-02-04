// TransitionCard - Reusable transition card for section navigation
import React from 'react';
import '../styles/TransitionCard.css';

const TransitionCard = ({
  icon,
  title,
  description,
  className = ''
}) => {
  return (
    <div className={`hl-methodology-transition ${className}`}>
      <div className="hl-transition-card">
        <div className="hl-transition-icon">{icon}</div>
        <div className="hl-transition-content">
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TransitionCard;
