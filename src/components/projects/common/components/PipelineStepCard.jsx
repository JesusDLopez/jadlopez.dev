// PipelineStepCard - Reusable flip card for analysis pipeline steps
//
// IMPORTANT USAGE NOTE:
// When using these cards in a grid layout, you MUST define explicit grid-template-rows
// to prevent the grid from expanding based on the back face's scrollable content.
//
// Example (CORRECT):
//   .my-cards-grid {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     grid-template-rows: 1fr;  /* <-- REQUIRED to constrain row height */
//   }
//
// Without grid-template-rows, the browser calculates row height based on the tallest
// possible content (the flipped card's back face), creating massive unwanted space.
//
import React, { useRef, useEffect } from 'react';
import '../styles/PipelineStepCard.css';

const PipelineStepCard = ({
  stepNumber,
  title,
  description,
  backTitle,
  backContent,
  techTerms = [],
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

  // If HL pipeline classes are provided, use existing HL structure
  if (className.includes('hl-pipeline-step')) {
    return (
      <div
        ref={cardRef}
        className={`${className} ${isFlipped ? 'flipped' : ''}`}
        onClick={onFlip}
      >
        <div className="hl-pipeline-card-inner">
          <div className="hl-pipeline-card-front">
            <div className="hl-step-number">{stepNumber}</div>
            <div className="hl-step-content">
              <h4>{title}</h4>
              <p>
                {description}
                {techTerms.map((term, index) => (
                  <span key={index} className="hl-tech-term">{term}</span>
                ))}
              </p>
            </div>
          </div>
          <div className="hl-pipeline-card-back">
            <div className="hl-step-content">
              <h4>{backTitle}</h4>
              {Array.isArray(backContent) ? (
                backContent.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))
              ) : (
                <p dangerouslySetInnerHTML={{ __html: backContent }} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If MW pipeline classes are provided, use MW structure
  if (className.includes('mw-pipeline-step')) {
    return (
      <div
        ref={cardRef}
        className={`${className} ${isFlipped ? 'flipped' : ''}`}
        onClick={onFlip}
      >
        <div className="mw-pipeline-card-inner">
          <div className="mw-pipeline-card-front">
            <div className="mw-step-number">{stepNumber}</div>
            <div className="mw-step-content">
              <h4>{title}</h4>
              <p>
                {description}
                {techTerms.map((term, index) => (
                  <span key={index} className="mw-tech-term">{term}</span>
                ))}
              </p>
            </div>
          </div>
          <div className="mw-pipeline-card-back">
            <div className="mw-step-content">
              <h4>{backTitle}</h4>
              {Array.isArray(backContent) ? (
                backContent.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))
              ) : (
                <p dangerouslySetInnerHTML={{ __html: backContent }} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise use generic pipeline-step styling
  return (
    <div
      ref={cardRef}
      className={`pipeline-step ${isFlipped ? 'flipped' : ''} ${className}`}
      onClick={onFlip}
    >
      <div className="pipeline-card-inner">
        <div className="pipeline-card-front">
          <div className="step-number">{stepNumber}</div>
          <div className="step-content">
            <h4>{title}</h4>
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
        <div className="pipeline-card-back">
          <div className="step-content">
            <h4>{backTitle}</h4>
            {Array.isArray(backContent) ? (
              backContent.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))
            ) : (
              <p dangerouslySetInnerHTML={{ __html: backContent }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineStepCard;