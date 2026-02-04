import React from 'react';
import { useMelanomaWorkshopData } from '../data/DataContext';
import '../Styles/ConclusionsSection.css';

/**
 * ConclusionsSection - Conclusions & Recommendations
 *
 * Synthesizes:
 * - Overall workshop effectiveness
 * - Key findings summary
 * - Clinical implications
 * - Limitations and future directions
 * - Recommendations for practice and education
 */
const ConclusionsSection = () => {
  const { demographics, statisticalTests, isReady } = useMelanomaWorkshopData();

  if (!isReady || !demographics || !statisticalTests) {
    return null;
  }

  return (
    <section className="mw-conclusions-section">
      <div className="mw-conclusions-container">
        <h2 className="mw-section-title">Conclusions & Recommendations</h2>

        {/* Overall Effectiveness */}
        <div className="mw-conclusion-card mw-effectiveness">
          <h3>Workshop Effectiveness</h3>
          <p>
            This evaluation of two melanoma genetic testing workshops (N={demographics.pairedParticipants} paired participants)
            demonstrates the educational intervention's impact on dermatologists' knowledge,
            attitudes, and clinical practice intentions. Statistical analysis reveals
            measurable improvements across key knowledge domains.
          </p>
        </div>

        {/* Key Findings */}
        <div className="mw-conclusion-card mw-key-findings">
          <h3>Key Findings</h3>
          <ul className="mw-findings-list">
            <li>
              <strong>High Response Rate:</strong> {demographics.responseRate}% of participants
              completed both pre- and post-workshop surveys, indicating strong engagement.
            </li>
            <li>
              <strong>Knowledge Improvement:</strong> Paired t-tests revealed statistically
              significant improvements in multiple knowledge domains (α = 0.05).
            </li>
            <li>
              <strong>Effect Sizes:</strong> Cohen's d values indicate practical significance
              of observed changes, beyond statistical significance alone.
            </li>
            <li>
              <strong>Clinical Practice Intentions:</strong> Post-workshop surveys show
              increased confidence and intention to incorporate genetic testing discussions
              into dermatology practice.
            </li>
          </ul>
        </div>

        {/* Clinical Implications */}
        <div className="mw-conclusion-card mw-implications">
          <h3>Clinical Implications</h3>
          <p>
            Enhanced knowledge and confidence in melanoma genetic testing among dermatologists
            can improve patient counseling, appropriate referrals for genetic testing, and
            integration of genomic information into clinical decision-making. These workshops
            address a critical gap in dermatology education regarding genetic aspects of
            melanoma management.
          </p>
        </div>

        {/* Limitations */}
        <div className="mw-conclusion-card mw-limitations">
          <h3>Limitations</h3>
          <ul className="mw-limitations-list">
            <li>
              Pre/post survey design without control group limits causal inference
            </li>
            <li>
              Self-reported knowledge and intentions may not reflect actual clinical practice changes
            </li>
            <li>
              Response bias: Participants completing both surveys may differ from non-responders
            </li>
            <li>
              Long-term knowledge retention and practice changes not assessed
            </li>
          </ul>
        </div>

        {/* Recommendations */}
        <div className="mw-conclusion-card mw-recommendations">
          <h3>Recommendations</h3>
          <div className="mw-recommendations-grid">
            <div className="mw-recommendation-item">
              <h4>For Medical Education</h4>
              <p>
                Continue offering workshops on melanoma genetics for dermatologists.
                Consider integrating genetic testing education into dermatology residency
                curricula and continuing medical education programs.
              </p>
            </div>

            <div className="mw-recommendation-item">
              <h4>For Future Research</h4>
              <p>
                Conduct follow-up assessments to evaluate long-term knowledge retention
                and actual changes in clinical practice. Consider controlled trial designs
                and objective measures of clinical behavior change.
              </p>
            </div>

            <div className="mw-recommendation-item">
              <h4>For Clinical Practice</h4>
              <p>
                Promote interdisciplinary collaboration between dermatologists and genetic
                counselors. Develop clinical decision support tools to facilitate appropriate
                use of melanoma genetic testing in practice.
              </p>
            </div>
          </div>
        </div>

        {/* Study Information Footer */}
        <div className="mw-study-footer">
          <p className="mw-study-info">
            <strong>Study Sample:</strong> N={demographics.pairedParticipants} paired participants
            (Pre: N={demographics.totalPreWorkshop}, Post: N={demographics.totalPostWorkshop}) |
            <strong> Response Rate:</strong> {demographics.responseRate}% |
            <strong> Workshop Dates:</strong> 2023-2024
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConclusionsSection;
