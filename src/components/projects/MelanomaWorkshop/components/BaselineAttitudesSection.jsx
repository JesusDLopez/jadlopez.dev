import React from 'react';
import { useMelanomaWorkshopData } from '../data/DataContext';
import '../styles/BaselineAttitudesSection.css';

/**
 * BaselineAttitudesSection - Baseline Attitudes & Confidence (Q1.1, Q1.2)
 *
 * Visualizes:
 * - Pre-workshop attitudes toward genetic testing (Q1.1)
 * - Pre-workshop confidence in discussing genetics (Q1.2)
 * - Distribution of responses (bar charts)
 * - Sample: N=51 (ALL pre-workshop participants)
 */
const BaselineAttitudesSection = () => {
  const { baselineAttitudes, demographics, isReady } = useMelanomaWorkshopData();

  if (!isReady || !baselineAttitudes) {
    return null;
  }

  return (
    <section className="mw-baseline-section">
      <div className="mw-baseline-container">
        <h2 className="mw-section-title">Baseline Attitudes & Confidence</h2>

        <p className="mw-section-intro">
          Pre-workshop survey responses from <strong>N={demographics.totalPreWorkshop}</strong> dermatologists
          regarding their initial attitudes toward melanoma genetic testing and confidence
          in discussing genetics with patients.
        </p>

        {/* Q1.1 - Attitudes */}
        <div className="mw-baseline-question">
          <h3 className="mw-question-title">
            Q1.1: Attitude Toward Genetic Testing for Melanoma
          </h3>
          <div className="mw-question-content">
            {/* Placeholder for bar chart visualization */}
            <div className="mw-chart-placeholder">
              <p>Bar chart showing distribution of responses (N={demographics.totalPreWorkshop})</p>
              <ul>
                {baselineAttitudes.q1_1 && baselineAttitudes.q1_1.map((item, idx) => (
                  <li key={idx}>
                    {item.response}: {item.count} ({item.percentage}%)
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mw-question-note">
            <em>Sample: All pre-workshop participants (N={demographics.totalPreWorkshop})</em>
          </p>
        </div>

        {/* Q1.2 - Confidence */}
        <div className="mw-baseline-question">
          <h3 className="mw-question-title">
            Q1.2: Confidence in Discussing Genetics with Patients
          </h3>
          <div className="mw-question-content">
            {/* Placeholder for bar chart visualization */}
            <div className="mw-chart-placeholder">
              <p>Bar chart showing distribution of responses (N={demographics.totalPreWorkshop})</p>
              <ul>
                {baselineAttitudes.q1_2 && baselineAttitudes.q1_2.map((item, idx) => (
                  <li key={idx}>
                    {item.response}: {item.count} ({item.percentage}%)
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mw-question-note">
            <em>Sample: All pre-workshop participants (N={demographics.totalPreWorkshop})</em>
          </p>
        </div>

        {/* Key Findings */}
        <div className="mw-baseline-findings">
          <h3>Key Findings</h3>
          <div className="mw-findings-card">
            <p>
              Baseline data establishes the starting attitudes and confidence levels
              of participating dermatologists prior to workshop training. These metrics
              provide context for evaluating post-workshop changes in knowledge and
              clinical practice intentions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BaselineAttitudesSection;
