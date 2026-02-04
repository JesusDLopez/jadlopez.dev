import React, { useState, useEffect } from 'react';
import { useMelanomaWorkshopData } from '../data/DataContext';
import { ContentCard, DisclaimerCard, StatCard } from '../../common';

const HeroSection = () => {
  const { masterSummary, isReady } = useMelanomaWorkshopData();
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation after data loads
  useEffect(() => {
    if (isReady && masterSummary) {
      setTimeout(() => setIsVisible(true), 300);
    }
  }, [isReady, masterSummary]);

  if (!isReady) {
    return <div className="mw-loading">Loading data...</div>;
  }

  // Map actual JSON structure
  const metadata = masterSummary?.metadata || {};
  const primaryOutcomes = masterSummary?.primary_outcomes || {};
  const knowledgeOutcomes = masterSummary?.knowledge_outcomes || {};
  const satisfactionMetrics = masterSummary?.satisfaction_metrics || {};
  const barriers = masterSummary?.implementation_barriers || {};

  return (
    <div className="mw-section">
      <div className="mw-container">
        <section className="mw-hero-section">
          {/* Header - Simple title and subtitle like HL */}
          <div className="mw-hero-header">
            <h1>Melanoma Genetic Testing Workshop</h1>
            <p className="mw-hero-subtitle">
              Educational impact evaluation of a professional development workshop for dermatologists
            </p>
          </div>

          {/* Content Cards - My Contribution and Disclaimer */}
          <div className="mw-content-cards">
            <ContentCard
              title="My Contribution"
              icon="👨‍💻"
              className="mw-content-card mw-contribution-card"
            >
              <p>
                This analysis evaluates a melanoma genetic testing workshop for {metadata.n_paired_participants || 47} dermatologists
                using paired pre-post design. I conducted all statistical analyses including paired t-tests, McNemar tests,
                effect size calculations (Cohen's d), and thematic coding of qualitative data.
              </p>
              <p>
                The study assesses three domains: (1) clinical skill development across 12 competencies, (2) knowledge
                transformation regarding insurance policy changes, and (3) implementation barriers using the COM-B framework.
                This page presents the statistical work in an interactive format.
              </p>
            </ContentCard>

            <DisclaimerCard className="mw-content-card disclaimer mw-disclaimer-card">
              <p>
                This study remains unpublished. The content here reflects statistical analysis and findings
                for demonstration purposes in my portfolio. It should not be interpreted as final peer-reviewed research.
              </p>
            </DisclaimerCard>
          </div>

          {/* Hero Statistics Cards - 3 key metrics */}
          <div className={`mw-hero-stats ${isVisible ? 'animate' : ''}`}>
            <StatCard
              value={metadata.n_paired_participants || 47}
              label="Participants"
              description="Paired pre-post workshop assessments"
              variant="primary"
              className="mw-stat-card"
            />
            <StatCard
              value={`${primaryOutcomes.n_skills_improved || 12}/12`}
              label="Skills Improved"
              description={`All significant (d=${(primaryOutcomes.mean_cohens_d || 1.23).toFixed(2)})`}
              variant="accent"
              className="mw-stat-card"
            />
            <StatCard
              value={`${knowledgeOutcomes.moratorium_awareness_post || 95.5}%`}
              label="Moratorium Awareness"
              description={`+${knowledgeOutcomes.moratorium_change || 70.5}pp increase (p<0.001)`}
              variant="secondary"
              className="mw-stat-card"
            />
          </div>

          {/* Context Section */}
          <div className="mw-context">
            <p>
              The workshop succeeded in building capability and motivation, but 95% of implementation
              barriers were systemic (time, cost, access) rather than educational—highlighting the gap
              between training and practice change.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
