import React from 'react';
import { useMelanomaWorkshopData } from '../data/DataContext';
import { ContentCard, KeyFinding } from '../../common';


const SatisfactionSection = () => {
  const { evaluation, isReady } = useMelanomaWorkshopData();

  if (!isReady || !evaluation) {
    return <div className="mw-loading">Loading...</div>;
  }

  const satisfaction = evaluation.satisfaction_q7 || {};
  const activities = evaluation.activities_q4 || {};
  const skillGainCorr = evaluation.satisfaction_skill_correlation || {};

  return (
    <div className="mw-section">
      <div className="mw-container">
        <section className="mw-satisfaction-section">
      <div className="mw-section-header">
        <h2 className="mw-section-title">Workshop Satisfaction</h2>
        <p className="mw-section-subtitle">
          High satisfaction, but an implementation gap emerges
        </p>
      </div>

      <div className="mw-satisfaction-hero">
        <KeyFinding
          title="Overall Satisfaction"
          value={`${satisfaction.mean?.toFixed(1) || '9.0'}/10`}
          description={`${(satisfaction.high_satisfaction_pct || 85.7).toFixed(1)}% rated ≥8/10`}
          icon="⭐"
          theme="success"
        />
        <KeyFinding
          title="Satisfaction Predicts Learning"
          value="r = 0.50"
          description="p < 0.001*** - Greater skill gains → Higher satisfaction"
          icon="📈"
          theme="primary"
        />
        <KeyFinding
          title="Implementation Confidence"
          value={`${satisfaction.implementation_confidence?.toFixed(1) || '7.3'}/10`}
          description="Only 54% high confidence"
          icon="⚠️"
          theme="warning"
        />
        <KeyFinding
          title="The Gap"
          value="~30%"
          description="Difference between satisfaction and implementation readiness"
          icon="📊"
          theme="info"
        />
      </div>

      <ContentCard title="Activity Ratings (Q4)" className="mw-activities">
        <p className="mw-text">All workshop activities rated highly (8.7-9.0/10):</p>
        <div className="mw-activities-list">
          {activities.activities && activities.activities.map((activity, idx) => (
            <div key={idx} className="mw-activity-item">
              <span className="mw-activity-name">{activity.activity || `Activity ${idx + 1}`}</span>
              <div className="mw-activity-rating">
                <span className="mw-rating-value">{activity.mean?.toFixed(1) || 'N/A'}/10</span>
                <div className="mw-rating-bar">
                  <div 
                    className="mw-rating-fill" 
                    style={{ width: `${(activity.mean || 0) * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContentCard>

      <div className="mw-satisfaction-grid">
        <ContentCard title="Satisfaction-Learning Link">
          <p className="mw-text">
            <strong>Key finding:</strong> Participants who gained more skills were MORE satisfied 
            with the workshop.
          </p>
          <div className="mw-stat-row">
            <span className="mw-stat-label">Correlation:</span>
            <span className="mw-stat-value">r = {skillGainCorr.correlation?.toFixed(3) || '0.504'}</span>
          </div>
          <div className="mw-stat-row">
            <span className="mw-stat-label">Significance:</span>
            <span className="mw-stat-value mw-sig">
              p = {skillGainCorr.p_value?.toFixed(4) || '0.0007'}***
            </span>
          </div>
          <p className="mw-text mw-mt">
            <strong>Interpretation:</strong> This validates that participants accurately perceived 
            their learning. Those who improved most were most satisfied, suggesting the workshop 
            delivered meaningful skill development.
          </p>
        </ContentCard>

        <ContentCard title="The Implementation Gap" className="mw-implementation-gap">
          <p className="mw-text">
            Despite <strong>high satisfaction (9.0/10)</strong>, post-workshop 
            <strong> implementation confidence was only moderate (7.3/10)</strong>.
          </p>
          <div className="mw-gap-visual">
            <div className="mw-gap-item">
              <div className="mw-gap-label">Satisfaction</div>
              <div className="mw-gap-bar mw-gap-high">
                <span>9.0/10 (86%)</span>
              </div>
            </div>
            <div className="mw-gap-item">
              <div className="mw-gap-label">Implementation Confidence</div>
              <div className="mw-gap-bar mw-gap-moderate">
                <span>7.3/10 (54%)</span>
              </div>
            </div>
          </div>
          <p className="mw-text mw-mt">
            <strong>What this means:</strong> Participants <em>enjoyed</em> the workshop and 
            <em>learned</em> valuable skills, but they don't feel confident they can actually 
            <em>implement</em> genetic testing in their practice.
          </p>
          <p className="mw-text mw-highlight">
            <strong>This gap signals systemic barriers beyond education.</strong>
          </p>
        </ContentCard>
      </div>

      <ContentCard className="mw-satisfaction-interpretation">
        <h3>Strategic Interpretation</h3>
        <p className="mw-text">
          The workshop succeeded in its <strong>educational mission</strong> (high satisfaction, 
          validated learning). However, the implementation gap reveals that 
          <strong> training alone is insufficient</strong>.
        </p>
        <p className="mw-text">
          Participants are telling us: <em>"I learned a lot, I'm confident in my knowledge, 
          but I still can't implement this in my practice."</em>
        </p>
        <p className="mw-text">
          The next section explores <strong>why</strong> - through qualitative analysis of 
          implementation barriers.
        </p>
      </ContentCard>
        </section>
      </div>
    </div>
  );
};

export default SatisfactionSection;
