import React from 'react';
import './SectionSeparator.css';

const SectionSeparator = ({ label, anchorId }) => {
  return (
    <div className={`section-separator ${anchorId ? `separator-${anchorId}` : ''}`}>
      <div className="separator-line"></div>
      {label && (
        <div className="separator-label">
          <span>{label}</span>
        </div>
      )}
    </div>
  );
};

export default SectionSeparator;