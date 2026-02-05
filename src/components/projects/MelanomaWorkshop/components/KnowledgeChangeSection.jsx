import React from 'react';
import { useMelanomaWorkshopData } from '../data/DataContext';
import '../styles/KnowledgeChangeSection.css';

/**
 * KnowledgeChangeSection - Knowledge Change Analysis (All Questions)
 *
 * Presents:
 * - Pre/post comparisons for all survey questions
 * - Visual comparison (bar charts, before/after)
 * - Mean scores, standard deviations
 * - Percentage change in correct responses
 * - Sample: N=48 (PAIRED participants only)
 *
 * Questions covered:
 * - Q1.1, Q1.2: Attitudes & Confidence
 * - Q2.1-Q2.6: Knowledge Assessment
 * - Q3.1-Q3.3: Clinical Practice Intentions
 */
const KnowledgeChangeSection = () => {
  const { knowledgeChange, demographics, isReady } = useMelanomaWorkshopData();

  if (!isReady || !knowledgeChange) {
    return null;
  }

  return (
    <section className="mw-knowledge-change-section">
      <div className="mw-knowledge-change-container">
        <h2 className="mw-section-title">Knowledge Change Analysis</h2>

        <p className="mw-section-intro">
          Pre/post comparison of survey responses from <strong>N={demographics.pairedParticipants}</strong> paired participants
          (completed both surveys). This analysis reveals changes in knowledge, attitudes,
          and clinical practice intentions following workshop training.
        </p>

        {/* Questions Grid */}
        <div className="mw-questions-grid">
          {knowledgeChange.questions && knowledgeChange.questions.map((question, idx) => (
            <div key={idx} className="mw-question-card">
              <h3 className="mw-question-header">
                {question.id}: {question.title}
              </h3>

              {/* Pre/Post Comparison */}
              <div className="mw-comparison">
                <div className="mw-comparison-item mw-pre">
                  <span className="mw-comparison-label">Pre-workshop</span>
                  <span className="mw-comparison-value">
                    {question.preMean} (SD: {question.preSD})
                  </span>
                </div>

                <div className="mw-comparison-arrow">→</div>

                <div className="mw-comparison-item mw-post">
                  <span className="mw-comparison-label">Post-workshop</span>
                  <span className="mw-comparison-value">
                    {question.postMean} (SD: {question.postSD})
                  </span>
                </div>
              </div>

              {/* Change Indicator */}
              <div className={`mw-change-indicator ${question.change > 0 ? 'mw-positive' : 'mw-negative'}`}>
                <span className="mw-change-label">Change:</span>
                <span className="mw-change-value">
                  {question.change > 0 ? '+' : ''}{question.change}
                  {question.changePercentage && ` (${question.changePercentage}%)`}
                </span>
              </div>

              {/* Visualization Placeholder */}
              <div className="mw-chart-placeholder-small">
                <p>Pre/post comparison chart</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Insights */}
        <div className="mw-knowledge-summary">
          <h3>Summary of Changes</h3>
          <div className="mw-summary-card">
            <p>
              Analysis of paired responses (N={demographics.pairedParticipants}) reveals
              patterns of knowledge improvement and attitude shifts across all question
              domains. Statistical significance and effect sizes are evaluated in the
              following section.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeChangeSection;
