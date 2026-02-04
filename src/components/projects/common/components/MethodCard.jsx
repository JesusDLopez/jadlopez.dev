// MethodCard - Reusable flip card for statistical methods with code examples
import React, { useRef, useEffect } from 'react';
import '../Styles/MethodCard.css';

const MethodCard = ({
  title,
  description,
  icon,
  techTerms = [],
  libraries,
  code,
  isFlipped = false,
  onFlip,
  className = ''
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const handleWheel = (e) => {
      // If card is not flipped, prevent scroll
      if (!isFlipped) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const cardElement = cardRef.current;
    // Use passive: false to allow preventDefault
    cardElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      cardElement.removeEventListener('wheel', handleWheel);
    };
  }, [isFlipped]);

  // If HL method card classes are provided, use existing HL structure
  if (className.includes('hl-method-card')) {
    return (
      <div
        ref={cardRef}
        className={`${className} ${isFlipped ? 'flipped' : ''}`}
        onClick={onFlip}
      >
        <div className="hl-card-inner">
          <div className="hl-card-front">
            <div className="hl-method-header">
              <div className="hl-method-icon">{icon}</div>
              <h4>{title}</h4>
            </div>
            <div className="hl-method-content">
              <p>{description}</p>
              {techTerms.length > 0 && (
                <div className="hl-tech-terms">
                  {techTerms.map((term, index) => (
                    <span key={index} className="hl-tech-term">{term}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="hl-card-back">
            <div className="hl-code-header">
              <div className="hl-code-icon">💻</div>
              <h4>Implementation</h4>
            </div>
            <div className="hl-code-content">
              {libraries && (
                <div className="hl-library-used">Libraries: {libraries}</div>
              )}
              {code && (
                <pre className="hl-code-snippet">{code}</pre>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise use generic method-card styling
  return (
    <div
      ref={cardRef}
      className={`method-card ${isFlipped ? 'flipped' : ''} ${className}`}
      onClick={onFlip}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="method-header">
            <div className="method-icon">{icon}</div>
            <h4>{title}</h4>
          </div>
          <div className="method-content">
            <p>{description}</p>
            {techTerms.length > 0 && (
              <div className="tech-terms">
                {techTerms.map((term, index) => (
                  <span key={index} className="tech-term">{term}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="card-back">
          <div className="code-header">
            <div className="code-icon">💻</div>
            <h4>Implementation</h4>
          </div>
          <div className="code-content">
            {libraries && (
              <div className="library-used">Libraries: {libraries}</div>
            )}
            {code && (
              <pre className="code-snippet">{code}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodCard;