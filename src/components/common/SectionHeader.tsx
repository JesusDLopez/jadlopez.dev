import React from 'react';
import './SectionHeader.css';
import InsightHighlight from './InsightHighlight';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  insightTitle?: string;
  insightContent?: string;
  insightVariant?: 'blue' | 'gray';
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  insightTitle,
  insightContent,
  insightVariant = 'blue',
  className = ''
}) => {
  return (
    <header className={`section-header ${className}`}>
      <div className="section-title-row">
        <div>
          <div className="fresh-title">{title}</div>
          <div className="fresh-subtitle">{subtitle}</div>
          {insightTitle && insightContent && (
            <InsightHighlight
              title={insightTitle}
              variant={insightVariant}
            >
              {insightContent}
            </InsightHighlight>
          )}
        </div>
      </div>
    </header>
  );
};

export default SectionHeader;