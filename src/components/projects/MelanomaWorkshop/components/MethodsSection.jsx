import React, { useState } from 'react';
import { useMelanomaWorkshopData } from '../data/DataContext';
import { ContentCard, PipelineStepCard } from '../../common';

const MethodsSection = () => {
  const { masterSummary, isReady } = useMelanomaWorkshopData();
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCard = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  if (!isReady) {
    return <div className="mw-loading">Loading...</div>;
  }

  const metadata = masterSummary?.metadata || {};

  return (
    <div className="mw-section">
      <div className="mw-container">
        <section className="mw-methods-section">
      <div className="mw-section-header">
        <h2 className="mw-section-title">Methodology</h2>
        <p className="mw-section-subtitle">Robust paired pre-post evaluation design</p>
      </div>

      {/* Study Details - Sequential Flow */}
      <h3 className="mw-study-details-title">Study Details</h3>
      <div className="mw-study-flow">
        <ContentCard title="Study Design" icon="🔬" className="mw-content-card mw-flow-card">
          <ul className="mw-list">
            <li><strong>Design:</strong> Paired pre-post educational intervention</li>
            <li><strong>Sample:</strong> N=47 dermatologists (Workshop 1 2023 + Perth 2024)</li>
            <li><strong>Data Quality:</strong> 99.1% complete (excellent)</li>
            <li><strong>Analysis Date:</strong> October 13, 2025</li>
          </ul>
        </ContentCard>

        <div className="mw-flow-arrow">→</div>

        <ContentCard title="Workshop Structure" icon="📚" className="mw-content-card mw-flow-card">
          <p className="mw-text">
            <strong>3-hour educational workshop</strong> covering:
          </p>
          <ul className="mw-list">
            <li>Melanoma genetic testing fundamentals</li>
            <li>Patient selection criteria and family history</li>
            <li>Test interpretation and clinical application</li>
            <li>Insurance moratorium (2019) and patient concerns</li>
            <li>Genetic counseling referral pathways</li>
          </ul>
        </ContentCard>

        <div className="mw-flow-arrow">→</div>

        <ContentCard title="Data Collection" icon="📝" className="mw-content-card mw-flow-card">
          <p className="mw-text">
            Participants completed comprehensive surveys:
          </p>
          <ul className="mw-list">
            <li><strong>Pre-workshop:</strong> Baseline attitudes, knowledge, confidence skills (Q1-Q6)</li>
            <li><strong>Post-workshop:</strong> Confidence skills, knowledge, satisfaction, barriers, facilitators (Q1-Q12)</li>
            <li><strong>Scales:</strong> 1-5 Likert scales for attitudes and confidence</li>
            <li><strong>Qualitative:</strong> Open-ended responses for barriers (Q10) and facilitators (Q11)</li>
          </ul>
        </ContentCard>
      </div>

      {/* My Analysis Strategy Section */}
      <div className="mw-analysis-pipeline">
        <h3>My Analysis Strategy</h3>
        <p>I approached this workshop evaluation systematically, combining quantitative and qualitative methods to assess educational impact:</p>

        <div className="mw-pipeline-steps">
          {/* Step 1: Quantitative Analysis */}
          <PipelineStepCard
            stepNumber="1"
            title="Quantitative Analysis"
            description="Paired statistical tests comparing pre-post changes in skills, knowledge, and attitudes."
            techTerms={["paired t-tests", "McNemar's test"]}
            backTitle="Statistical Testing Details"
            backContent="Applied paired t-tests for 12 confidence skills (continuous 1-5 Likert scales) and McNemar's test for categorical knowledge items. Used Benjamini-Hochberg correction for multiple comparisons. Calculated Cohen's d effect sizes to quantify the magnitude of changes—all 12 skills showed large effects (mean d=1.23)."
            isFlipped={flippedCards['step1']}
            onFlip={() => toggleCard('step1')}
            className="mw-pipeline-step mw-step-1"
          />

          {/* Step 2: Effect Size Quantification */}
          <PipelineStepCard
            stepNumber="2"
            title="Effect Size Quantification"
            description="Calculated Cohen's d to measure the magnitude of skill improvements beyond statistical significance."
            techTerms={["Cohen's d", "effect sizes"]}
            backTitle="Why Effect Sizes Matter"
            backContent="Statistical significance (p-values) only tells us if an effect exists. Effect sizes tell us if the effect is <em>meaningful</em>. Cohen's d of 0.8+ is considered large. Our mean d=1.23 indicates the workshop produced substantial, practically significant skill gains—not just statistically detectable ones."
            isFlipped={flippedCards['step2']}
            onFlip={() => toggleCard('step2')}
            className="mw-pipeline-step mw-step-2"
          />

          {/* Step 3: Qualitative Thematic Analysis */}
          <PipelineStepCard
            stepNumber="3"
            title="Qualitative Thematic Analysis"
            description="Coded open-ended responses to identify implementation barriers using the COM-B framework."
            techTerms={["thematic analysis", "COM-B framework"]}
            backTitle="COM-B Framework Application"
            backContent="The COM-B (Capability, Opportunity, Motivation) model helped categorize barriers. I coded 42 responses for Q10 (barriers), identifying that 95% were <strong>systemic/opportunity barriers</strong> (time, cost, access) rather than capability or motivation issues. This revealed that further training wouldn't help—the healthcare system lacks the infrastructure for implementation."
            isFlipped={flippedCards['step3']}
            onFlip={() => toggleCard('step3')}
            className="mw-pipeline-step mw-step-3"
          />

          {/* Step 4: Cross-validation */}
          <PipelineStepCard
            stepNumber="4"
            title="Cross-validation & Replication"
            description="Validated findings across two workshop cohorts and used word frequency to verify thematic coding."
            techTerms={["replication", "triangulation"]}
            backTitle="Ensuring Robust Findings"
            backContent="Combined N=35 (Workshop 1 2023) + N=12 (Perth 2024) for N=47 total. <strong>95%+ of findings replicated</strong> across cohorts. Used word frequency analysis to validate themes: 'time' mentioned 21×, 'cost' 8×—confirming these as dominant barriers independent of my subjective coding."
            isFlipped={flippedCards['step4']}
            onFlip={() => toggleCard('step4')}
            className="mw-pipeline-step mw-step-4"
          />
        </div>
      </div>

      {/* Study Strengths */}
      <ContentCard title="Study Strengths" icon="✨" className="mw-content-card mw-methods-strength">
        <div className="mw-strengths-grid">
          <div className="mw-strength-item">
            <span className="mw-strength-icon">✓</span>
            <span>Robust replication (95%+ findings held N=35→N=47)</span>
          </div>
          <div className="mw-strength-item">
            <span className="mw-strength-icon">✓</span>
            <span>Large effect sizes (mean d=1.23)</span>
          </div>
          <div className="mw-strength-item">
            <span className="mw-strength-icon">✓</span>
            <span>Multiple testing correction throughout</span>
          </div>
          <div className="mw-strength-item">
            <span className="mw-strength-icon">✓</span>
            <span>Excellent data quality (99.1% complete)</span>
          </div>
          <div className="mw-strength-item">
            <span className="mw-strength-icon">✓</span>
            <span>Mixed methods convergence</span>
          </div>
          <div className="mw-strength-item">
            <span className="mw-strength-icon">✓</span>
            <span>Cross-workshop validation</span>
          </div>
        </div>
      </ContentCard>
        </section>
      </div>
    </div>
  );
};

export default MethodsSection;
