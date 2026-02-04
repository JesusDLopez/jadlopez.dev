import React from 'react';
import { useMelanomaWorkshopData } from '../data/DataContext';
import '../Styles/StatisticalTestingSection.css';

/**
 * StatisticalTestingSection - Statistical Analysis Results
 *
 * Presents:
 * - Paired t-test results for all questions
 * - Effect sizes (Cohen's d)
 * - P-values and confidence intervals
 * - Statistical significance indicators
 * - Sample: N=48 (PAIRED participants only)
 *
 * Interpretation guide:
 * - p < 0.05: Statistically significant
 * - Cohen's d > 0.8: Large effect
 * - Cohen's d 0.5-0.8: Medium effect
 * - Cohen's d 0.2-0.5: Small effect
 */
const StatisticalTestingSection = () => {
  const { statisticalTests, demographics, isReady } = useMelanomaWorkshopData();

  if (!isReady || !statisticalTests) {
    return null;
  }

  // Helper to get effect size interpretation
  const getEffectSizeLabel = (d) => {
    const absD = Math.abs(d);
    if (absD >= 0.8) return 'Large';
    if (absD >= 0.5) return 'Medium';
    if (absD >= 0.2) return 'Small';
    return 'Negligible';
  };

  return (
    <section className="mw-statistical-section">
      <div className="mw-statistical-container">
        <h2 className="mw-section-title">Statistical Analysis</h2>

        <p className="mw-section-intro">
          Paired t-tests comparing pre/post responses for <strong>N={demographics.pairedParticipants}</strong> participants
          who completed both surveys. Statistical significance (α = 0.05) and effect
          sizes (Cohen's d) quantify the magnitude of workshop impact.
        </p>

        {/* Interpretation Guide */}
        <div className="mw-interpretation-guide">
          <h3>Interpretation Guide</h3>
          <div className="mw-guide-grid">
            <div className="mw-guide-card">
              <h4>Statistical Significance</h4>
              <ul>
                <li><strong>p &lt; 0.001</strong>: Highly significant (***)</li>
                <li><strong>p &lt; 0.01</strong>: Very significant (**)</li>
                <li><strong>p &lt; 0.05</strong>: Significant (*)</li>
                <li><strong>p ≥ 0.05</strong>: Not significant (ns)</li>
              </ul>
            </div>

            <div className="mw-guide-card">
              <h4>Effect Size (Cohen's d)</h4>
              <ul>
                <li><strong>|d| ≥ 0.8</strong>: Large effect</li>
                <li><strong>|d| ≥ 0.5</strong>: Medium effect</li>
                <li><strong>|d| ≥ 0.2</strong>: Small effect</li>
                <li><strong>|d| &lt; 0.2</strong>: Negligible</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Statistical Tests Table */}
        <div className="mw-tests-table-container">
          <h3>Paired T-Test Results</h3>
          <table className="mw-tests-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>t-statistic</th>
                <th>p-value</th>
                <th>Significance</th>
                <th>Cohen's d</th>
                <th>Effect Size</th>
              </tr>
            </thead>
            <tbody>
              {statisticalTests.pairedTTests && statisticalTests.pairedTTests.map((test, idx) => {
                const isSignificant = test.pValue < 0.05;
                const significanceLabel =
                  test.pValue < 0.001 ? '***' :
                  test.pValue < 0.01 ? '**' :
                  test.pValue < 0.05 ? '*' : 'ns';
                const effectSizeLabel = getEffectSizeLabel(test.cohensD);

                return (
                  <tr key={idx} className={isSignificant ? 'mw-significant-row' : ''}>
                    <td className="mw-question-cell">{test.question}</td>
                    <td>{test.tStatistic.toFixed(3)}</td>
                    <td>{test.pValue < 0.001 ? '< 0.001' : test.pValue.toFixed(3)}</td>
                    <td className="mw-significance-cell">
                      <span className={`mw-significance-badge ${isSignificant ? 'mw-sig' : 'mw-ns'}`}>
                        {significanceLabel}
                      </span>
                    </td>
                    <td>{test.cohensD.toFixed(2)}</td>
                    <td className="mw-effect-size-cell">
                      <span className={`mw-effect-badge mw-effect-${effectSizeLabel.toLowerCase()}`}>
                        {effectSizeLabel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Key Findings */}
        <div className="mw-statistical-findings">
          <h3>Statistical Summary</h3>
          <div className="mw-findings-card">
            <p>
              Paired t-tests (N={demographics.pairedParticipants}) reveal which knowledge
              domains showed statistically significant improvement following workshop
              training. Effect sizes (Cohen's d) indicate the practical magnitude of
              these changes, independent of sample size.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticalTestingSection;
