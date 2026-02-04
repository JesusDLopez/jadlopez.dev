// src/components/debug/SectionDebugInfo.jsx
// Shows debug labels and metrics for each section
import React, { useEffect, useRef, useState } from 'react';
import { useDebugMode } from '../../contexts/DebugModeContext';

const SectionDebugInfo = ({ sectionId, className, children }) => {
  const { debugMode, updateSectionMetrics } = useDebugMode();
  const sectionRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    height: 0,
    minHeight: '',
    contentHeight: 0,
    computedHeight: 0
  });

  // Track section dimensions with ResizeObserver
  useEffect(() => {
    if (!debugMode || !sectionRef.current) return;

    const updateDimensions = () => {
      const element = sectionRef.current;
      if (!element) return;

      const computed = getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      const metrics = {
        height: Math.round(rect.height),
        minHeight: computed.minHeight,
        contentHeight: element.scrollHeight,
        computedHeight: Math.round(parseFloat(computed.height)),
        paddingTop: computed.paddingTop,
        paddingBottom: computed.paddingBottom,
        marginTop: computed.marginTop,
        marginBottom: computed.marginBottom
      };

      setDimensions(metrics);
      updateSectionMetrics(sectionId, metrics);
    };

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [debugMode, sectionId, updateSectionMetrics]);

  if (!debugMode) {
    return <div ref={sectionRef}>{children}</div>;
  }

  return (
    <div ref={sectionRef} style={{ position: 'relative' }}>
      {/* Section Label - Top Left */}
      <div className="debug-section-label">
        <div className="debug-id">#{sectionId}</div>
        <div className="debug-classes">{className}</div>
      </div>

      {/* Height Metrics - Bottom Right */}
      <div className="debug-height-metrics">
        <div className="debug-metric">
          <span className="debug-metric-label">Height:</span>
          <span className="debug-metric-value">{dimensions.height}px</span>
        </div>
        <div className="debug-metric">
          <span className="debug-metric-label">Min:</span>
          <span className="debug-metric-value">{dimensions.minHeight}</span>
        </div>
        <div className="debug-metric">
          <span className="debug-metric-label">Content:</span>
          <span className="debug-metric-value">{dimensions.contentHeight}px</span>
        </div>
        {dimensions.paddingTop !== '0px' && (
          <div className="debug-metric">
            <span className="debug-metric-label">Padding:</span>
            <span className="debug-metric-value">
              {dimensions.paddingTop} / {dimensions.paddingBottom}
            </span>
          </div>
        )}
      </div>

      {children}
    </div>
  );
};

export default SectionDebugInfo;
