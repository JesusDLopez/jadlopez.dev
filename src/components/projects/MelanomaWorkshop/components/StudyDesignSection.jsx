import React from 'react';
import { useMelanomaWorkshopData } from '../data/DataContext';
import '../Styles/StudyDesignSection.css';

/**
 * StudyDesignSection - Study Design & Methodology
 *
 * Presents:
 * - Pre/post paired survey design
 * - Two workshop administrations (2023-2024)
 * - Survey structure and question domains
 * - Participant flow diagram (N=51 pre → N=48 paired → N=53 post)
 * - Data usage strategy (ALL vs PAIRED)
 */
const StudyDesignSection = () => {
  const { demographics, isReady } = useMelanomaWorkshopData();

  if (!isReady || !demographics) {
    return null;
  }

  return (
    <section className="mw-study-design-section">
      <div className="mw-study-design-container">
        <h2 className="mw-section-title">Study Design & Methodology</h2>

        {/* Design Overview */}
        <div className="mw-design-card">
          <h3>Pre/Post Paired Survey Design</h3>
          <p>
            Educational intervention evaluated using matched pre- and post-workshop surveys
            administered to dermatologists across two workshop sessions (2023-2024).
            Paired data (N={demographics.pairedParticipants}) enables within-subject
            analysis of knowledge change and attitude shifts.
          </p>
        </div>

        {/* Participant Flow */}
        <div className="mw-flow-diagram">
          <h3>Participant Flow</h3>
          <div className="mw-flow-chart">
            <div className="mw-flow-step">
              <div className="mw-flow-box mw-flow-pre">
                <span className="mw-flow-label">Pre-Workshop</span>
                <span className="mw-flow-count">N = {demographics.totalPreWorkshop}</span>
              </div>
            </div>

            <div className="mw-flow-arrow">→</div>

            <div className="mw-flow-step">
              <div className="mw-flow-box mw-flow-paired">
                <span className="mw-flow-label">Paired (Both Surveys)</span>
                <span className="mw-flow-count">N = {demographics.pairedParticipants}</span>
              </div>
            </div>

            <div className="mw-flow-arrow">→</div>

            <div className="mw-flow-step">
              <div className="mw-flow-box mw-flow-post">
                <span className="mw-flow-label">Post-Workshop</span>
                <span className="mw-flow-count">N = {demographics.totalPostWorkshop}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Usage Strategy */}
        <div className="mw-data-strategy">
          <h3>Data Usage Strategy</h3>
          <div className="mw-strategy-grid">
            <div className="mw-strategy-card">
              <h4>Descriptive Statistics</h4>
              <p className="mw-strategy-sample">
                Uses <strong>ALL participants</strong>
              </p>
              <ul className="mw-strategy-list">
                <li>Pre-workshop baseline: N={demographics.totalPreWorkshop}</li>
                <li>Post-workshop outcomes: N={demographics.totalPostWorkshop}</li>
                <li>Frequency distributions</li>
                <li>Means, standard deviations</li>
              </ul>
            </div>

            <div className="mw-strategy-card">
              <h4>Paired Comparisons</h4>
              <p className="mw-strategy-sample">
                Uses <strong>PAIRED participants only</strong>
              </p>
              <ul className="mw-strategy-list">
                <li>Paired sample: N={demographics.pairedParticipants}</li>
                <li>Paired t-tests</li>
                <li>Knowledge change analysis</li>
                <li>Effect sizes (Cohen's d)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Survey Structure */}
        <div className="mw-survey-structure">
          <h3>Survey Structure</h3>
          <div className="mw-survey-domains">
            <div className="mw-domain-card">
              <h4>Q1.1 - Q1.2</h4>
              <p>Baseline Attitudes & Confidence</p>
            </div>
            <div className="mw-domain-card">
              <h4>Q2.1 - Q2.6</h4>
              <p>Knowledge Assessment (Genetics & Testing)</p>
            </div>
            <div className="mw-domain-card">
              <h4>Q3.1 - Q3.3</h4>
              <p>Clinical Practice Intentions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyDesignSection;
