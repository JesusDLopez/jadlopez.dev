import React from 'react';
import { useMelanomaWorkshopData } from '../data/DataContext';
import { ContentCard, KeyFinding } from '../../common';


const KnowledgeSection = () => {
  const { q2Analysis, q1Analysis, isReady } = useMelanomaWorkshopData();

  if (!isReady) {
    return <div className="mw-loading">Loading...</div>;
  }

  const q27Data = q2Analysis?.mcnemar_tests?.find(t => t.question === '2.7');
  const q25Data = q2Analysis?.mcnemar_tests?.find(t => t.question === '2.5');
  const q11Data = q1Analysis?.paired_tests?.find(t => t.question === '1.1');

  return (
    <div className="mw-section">
      <div className="mw-container">
        <section className="mw-knowledge-section">
      <div className="mw-section-header">
        <h2 className="mw-section-title">Knowledge Transformation</h2>
        <p className="mw-section-subtitle">
          Most dramatic change: Insurance moratorium awareness
        </p>
      </div>

      <ContentCard className="mw-knowledge-hero">
        <div className="mw-knowledge-visual">
          <div className="mw-knowledge-before">
            <div className="mw-knowledge-label">PRE-WORKSHOP</div>
            <div className="mw-knowledge-value mw-red">25%</div>
            <div className="mw-knowledge-sublabel">aware of moratorium</div>
          </div>
          <div className="mw-knowledge-arrow">→</div>
          <div className="mw-knowledge-after">
            <div className="mw-knowledge-label">POST-WORKSHOP</div>
            <div className="mw-knowledge-value mw-green">95.5%</div>
            <div className="mw-knowledge-sublabel">aware of moratorium</div>
          </div>
        </div>
        <div className="mw-knowledge-change">
          <strong>+70.5 percentage points</strong> (p &lt; 0.001***)
        </div>
      </ContentCard>

      <div className="mw-knowledge-grid">
        <KeyFinding
          title="Critical Knowledge Gap Addressed"
          value="70.5pp increase"
          description="Q2.7: Awareness of 2019 insurance moratorium"
          icon="💡"
          theme="success"
        />
        <KeyFinding
          title="Insurance Concerns Reduced"
          value="-22.7pp"
          description="Q2.5: Concerns about private insurance (86% → 64%)"
          icon="🔒"
          theme="info"
        />
        <KeyFinding
          title="Perceived Relevance Increased"
          value="+0.41 points"
          description="Q1.1: Clinical relevance increased post-workshop"
          icon="📊"
          theme="primary"
        />
      </div>

      <ContentCard title="What is the 2019 Insurance Moratorium?" className="mw-moratorium-context">
        <p className="mw-text">
          In 2019, Australia introduced a <strong>moratorium on genetic discrimination</strong> by 
          life insurance companies. This policy protects individuals who undergo genetic testing from 
          being denied coverage or charged higher premiums based on their genetic risk.
        </p>
        <p className="mw-text">
          <strong>Why it matters:</strong> Prior to this policy, many patients and clinicians were 
          reluctant to pursue genetic testing due to fear of insurance discrimination. The moratorium 
          removes this barrier, making genetic testing a more viable clinical option.
        </p>
      </ContentCard>

      <div className="mw-knowledge-details">
        <ContentCard title="Q2.7: Insurance Moratorium Awareness">
          <div className="mw-stat-row">
            <span className="mw-stat-label">Pre-workshop awareness:</span>
            <span className="mw-stat-value">25.0% (11/44 participants)</span>
          </div>
          <div className="mw-stat-row">
            <span className="mw-stat-label">Post-workshop awareness:</span>
            <span className="mw-stat-value">95.5% (42/44 participants)</span>
          </div>
          <div className="mw-stat-row">
            <span className="mw-stat-label">McNemar test:</span>
            <span className="mw-stat-value mw-sig">p &lt; 0.001*** (B-H adjusted)</span>
          </div>
          <div className="mw-stat-row">
            <span className="mw-stat-label">Odds Ratio:</span>
            <span className="mw-stat-value">0.85 [95% CI: 0.03]</span>
          </div>
        </ContentCard>

        <ContentCard title="Q2.5: Insurance Concerns">
          <p className="mw-text">
            <strong>Related change:</strong> As moratorium awareness increased, concerns about 
            private insurance implications <em>decreased</em>.
          </p>
          <div className="mw-stat-row">
            <span className="mw-stat-label">Pre-workshop concerns:</span>
            <span className="mw-stat-value">86.4% (38/44 participants)</span>
          </div>
          <div className="mw-stat-row">
            <span className="mw-stat-label">Post-workshop concerns:</span>
            <span className="mw-stat-value">63.6% (28/44 participants)</span>
          </div>
          <div className="mw-stat-row">
            <span className="mw-stat-label">Change:</span>
            <span className="mw-stat-value">-22.7pp (p = 0.049*, B-H adjusted)</span>
          </div>
          <p className="mw-text mw-mt">
            <strong>Interpretation:</strong> Education about the moratorium reduced unwarranted 
            concerns, making clinicians more comfortable discussing testing with patients.
          </p>
        </ContentCard>
      </div>

      <ContentCard className="mw-knowledge-interpretation">
        <h3>Strategic Importance</h3>
        <p className="mw-text">
          The moratorium education component represents a <strong>critical success</strong> of the 
          workshop. This single knowledge change addresses both clinician and patient barriers:
        </p>
        <ul className="mw-list">
          <li><strong>Clinician confidence:</strong> Knowing the moratorium exists empowers clinicians 
          to discuss testing without fear of harming patients</li>
          <li><strong>Patient concerns:</strong> Clinicians can now address insurance fears with 
          accurate information</li>
          <li><strong>System-level impact:</strong> This knowledge change enables conversations that 
          were previously suppressed by insurance anxiety</li>
        </ul>
        <p className="mw-text mw-highlight">
          <strong>Recommendation:</strong> Future workshops should maintain strong emphasis on 
          moratorium education, as this single component removes a major psychological barrier.
        </p>
      </ContentCard>
        </section>
      </div>
    </div>
  );
};

export default KnowledgeSection;
