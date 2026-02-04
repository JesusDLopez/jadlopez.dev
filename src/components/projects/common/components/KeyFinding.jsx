// KeyFinding - Reusable key finding highlight component
import React from 'react';
import '../Styles/KeyFinding.css';

const KeyFinding = ({ children, type = 'default', className = '' }) => {
  return (
    <div className={`key-finding-highlight ${type} ${className}`}>
      <strong>Key Finding:</strong> {children}
    </div>
  );
};

export default KeyFinding;
