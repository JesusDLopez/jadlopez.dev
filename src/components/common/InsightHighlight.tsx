import React from 'react';
import './InsightHighlight.css';

interface InsightHighlightProps {
  title: string;
  children: React.ReactNode;
  variant?: 'blue' | 'gray' | 'key-finding';
  className?: string;
}

const InsightHighlight: React.FC<InsightHighlightProps> = ({
  title,
  children,
  variant = 'blue',
  className = ''
}) => {
  return (
    <div className={`insight-highlight-wrapper ${className}`}>
      <div className={`insight-highlight insight-highlight--${variant}`}>
        <strong>{title}:</strong> {children}
      </div>
    </div>
  );
};

export default InsightHighlight;