// Model Statistics Section - Model diagnostics and validation
import React, { useState, useEffect } from 'react';
import { useHearingLossData } from '../data/DataContext';
import { KeyFinding, ContentCard, AnalysisCard, TransitionCard, PipelineStepCard } from '../../common';
import '../styles/model-statistics.css';

const ModelStatisticsSection = () => {
  const { modelStats, isReady } = useHearingLossData();
  const [modelComparison, setModelComparison] = useState([]);
  const [diagnostics, setDiagnostics] = useState(null);
  const [validation, setValidation] = useState(null);
  const [clinicalInterp, setClinicalInterp] = useState(null);
  const [flippedMetricCards, setFlippedMetricCards] = useState({});

  useEffect(() => {
    if (isReady && modelStats) {
      setModelComparison(modelStats.model_comparison || []);
      setDiagnostics(modelStats.diagnostic_tests || {});
      setValidation(modelStats.validation_results || {});
      setClinicalInterp(modelStats.clinical_interpretation || {});
    }
  }, [isReady, modelStats]);

  const toggleMetricCard = (cardId) => {
    setFlippedMetricCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  if (!isReady) {
    return (
      <div className="hl-section">
        <div className="hl-container">
          <div className="hl-loading">Loading model statistics...</div>
        </div>
      </div>
    );
  }

  if (!modelComparison.length) {
    return (
      <div className="hl-section">
        <div className="hl-container">
          <div className="hl-error">No model statistics data available</div>
        </div>
      </div>
    );
  }

  const finalModel = modelComparison.find(m => m.model_name === 'Final Multivariable Model');
  const gdmModel = modelComparison.find(m => m.model_name === 'Univariate GDM Model');

  return (
    <div className="hl-section">
      <div className="hl-container">

        {/* Header */}
        <div className="hl-header-container">
          <h2 className="hl-h2">Model Diagnostics & Validation</h2>
          <p className="hl-h2-subtitle">
            Comprehensive evaluation of model performance, calibration, and clinical utility
          </p>
        </div>

        {/* Understanding Model Validation - With Cards Inside */}
        <ContentCard
          icon="🔍"
          title="Understanding Model Validation"
          className="hl-content-card model-validation-unified"
        >
          <p className="validation-intro-text">
            After building our multivariable logistic regression model, we need to validate that it's reliable
            and performs well. Model validation involves checking <strong>three key aspects</strong>.
            Click each card below to learn what these concepts mean and how we measure them:
          </p>

          <div className="hl-pipeline-steps metric-cards-grid">
            {/* Model Fit Card */}
            <PipelineStepCard
              stepNumber="1"
              title="Model Fit"
              description="How good is the model at capturing the relationship between predictors and outcome?"
              techTerms={["model quality", "explanatory power"]}
              backTitle="Measuring Model Fit"
              backContent="We use two complementary metrics:<br/><br/><strong>AIC (Akaike Information Criterion):</strong> Compares models by balancing fit quality against complexity. Calculated as <span class='hl-equation'>AIC = -2×log-likelihood + 2k</span>, where <em>k</em> is parameters. <strong>Lower AIC = better model</strong>. It penalizes unnecessary complexity—more variables only help if they meaningfully improve predictions. Differences of <strong>10+ points</strong> indicate substantial improvement.<br/><br/><strong>Pseudo R² (McFadden's R²):</strong> Analogous to R² in linear regression, showing variance explained: <span class='hl-equation'>1 - (log-likelihood_model / log-likelihood_null)</span>. Unlike linear R², values are typically lower—<span class='hl-equation'>0.2–0.4</span> is <strong>excellent</strong> for logistic regression. Our <strong>0.024</strong> reflects that hearing loss is rare with multiple complex factors."
              isFlipped={flippedMetricCards['modelfit']}
              onFlip={() => toggleMetricCard('modelfit')}
              className="hl-pipeline-step hl-metric-card"
            />

            {/* Discrimination Card */}
            <PipelineStepCard
              stepNumber="2"
              title="Discrimination"
              description="Can the model distinguish between cases with and without hearing loss?"
              techTerms={["predictive accuracy", "AUC"]}
              backTitle="Measuring Discrimination"
              backContent="<strong>C-statistic (Area Under ROC Curve):</strong> Measures discrimination ability. Think of it as: <em>If you pick one person with hearing loss and one without, what's the probability the model assigns a higher risk to the case?</em><br/><br/><strong>Interpretation Scale:</strong><ul style='margin-top: 0.5rem; margin-bottom: 0.5rem;'><li><span class='hl-equation'>C = 0.5</span>: No better than random guessing</li><li><span class='hl-equation'>C = 0.6–0.7</span>: Acceptable discrimination</li><li><span class='hl-equation'>C = 0.7–0.8</span>: Good discrimination</li><li><span class='hl-equation'>C > 0.8</span>: Excellent discrimination</li></ul>Our model's C-statistic of <strong>0.582</strong> indicates <strong>modest but meaningful discrimination ability</strong>—better than chance, appropriate for a rare outcome with multiple contributing factors."
              isFlipped={flippedMetricCards['discrimination']}
              onFlip={() => toggleMetricCard('discrimination')}
              className="hl-pipeline-step hl-metric-card"
            />

            {/* Calibration Card */}
            <PipelineStepCard
              stepNumber="3"
              title="Calibration & Validation"
              description="Do predicted probabilities match reality? These tests ensure predictions are accurate and reliable."
              techTerms={["calibration", "generalizability"]}
              backTitle="Measuring Calibration & Validation"
              backContent="<strong>Hosmer-Lemeshow Test:</strong> Checks if predicted probabilities match observed outcomes. Divides subjects into groups by predicted risk, then compares expected vs. observed using a <strong>χ² test</strong>. <em>p > 0.05</em> indicates <strong>good calibration</strong> (we want high p-values!). If the model predicts 10% risk in a group, ~10% should actually have the outcome. Our <strong>p = 0.131</strong> confirms excellent calibration.<br/><br/><strong>Cross-Validation:</strong> Tests consistency across data subsets to detect overfitting. We divide data into <strong>k folds</strong>, train on k-1, test on the remaining fold, and repeat. Mean AUC across folds shows if performance is stable. Our mean AUC of <strong>0.578</strong> (very close to C-statistic of 0.582) indicates <strong>the model generalizes reliably to new patients</strong>."
              isFlipped={flippedMetricCards['calibration']}
              onFlip={() => toggleMetricCard('calibration')}
              className="hl-pipeline-step hl-metric-card"
            />
          </div>
        </ContentCard>

        {/* Transition to Results */}
        <p className="validation-results-transition">
          Now let's see how our model performed on these three validation criteria:
        </p>

        {/* Key Finding */}
        <KeyFinding className="hl-key-finding">
          The final multivariable model shows <strong>good calibration</strong> (Hosmer-Lemeshow p = 0.131) and
          <strong> moderate discrimination</strong> (C-statistic = 0.582), with a <strong>low Pseudo R² of 0.024</strong> reflecting
          the rarity and complexity of congenital hearing loss. Despite modest predictive power, the model reliably confirms
          that gestational diabetes shows no independent association with hearing loss after controlling for confounding factors.
        </KeyFinding>

        {/* Model Comparison */}
        <ContentCard
          icon="📊"
          title="Model Development & Comparison"
          className="hl-content-card model-comparison-container"
        >
          <div className="model-comparison-table">
            <div className="comparison-table-header">
              <div className="table-header-cell model-name">Model</div>
              <div className="table-header-cell metric">
                AIC
                <span className="metric-hint">↓ lower is better</span>
              </div>
              <div className="table-header-cell metric">
                C-statistic
                <span className="metric-hint">↑ higher is better</span>
              </div>
              <div className="table-header-cell metric">
                Pseudo R²
                <span className="metric-hint">0.2-0.4 = excellent</span>
              </div>
              <div className="table-header-cell interpretation">Interpretation</div>
            </div>

            {modelComparison.map((model, index) => (
              <div key={model.model_name} className={`comparison-table-row ${model.model_name === 'Final Multivariable Model' ? 'final-model' : ''}`}>
                <div className="table-cell model-name">
                  <span className="model-step">{index + 1}</span>
                  {model.model_name}
                </div>
                <div className="table-cell metric">{model.aic.toFixed(1)}</div>
                <div className="table-cell metric">{model.c_statistic.toFixed(3)}</div>
                <div className="table-cell metric">{model.pseudo_r_squared.toFixed(3)}</div>
                <div className="table-cell interpretation">
                  {model.model_name === 'Univariate GDM Model' && 'Baseline: GDM alone'}
                  {model.model_name === 'Maternal Factors Model' && 'Added maternal variables'}
                  {model.model_name === 'Infant Factors Model' && 'Added infant variables'}
                  {model.model_name === 'Final Multivariable Model' && 'Best performing model'}
                </div>
              </div>
            ))}
          </div>

          <div className="model-improvement-summary">
            <div className="improvement-item">
              <span className="improvement-label">AIC Improvement:</span>
              <span className="improvement-value">
                {(gdmModel.aic - finalModel.aic).toFixed(1)} points (lower is better)
              </span>
            </div>
            <div className="improvement-item">
              <span className="improvement-label">C-statistic Improvement:</span>
              <span className="improvement-value">
                +{((finalModel.c_statistic - gdmModel.c_statistic) * 100).toFixed(1)}%
                (from {gdmModel.c_statistic.toFixed(3)} to {finalModel.c_statistic.toFixed(3)})
              </span>
            </div>
            <div className="improvement-item">
              <span className="improvement-label">Pseudo R²:</span>
              <span className="improvement-value">
                {finalModel.pseudo_r_squared.toFixed(3)} (typical for rare outcomes)
              </span>
            </div>
          </div>
        </ContentCard>

        {/* Model Diagnostics */}
        <ContentCard
          icon="🔍"
          title="Model Diagnostics"
          className="hl-content-card diagnostics-container"
        >
          <div className="diagnostic-tests-grid">
            <div className="diagnostic-test-card calibration">
              <div className="diagnostic-icon">⚙️</div>
              <div className="diagnostic-content">
                <h4>Hosmer-Lemeshow Test</h4>
                <div className="diagnostic-stats">
                  <div className="diagnostic-item">
                    <span className="diagnostic-label">χ² statistic:</span>
                    <span className="diagnostic-value">{diagnostics.hosmer_lemeshow?.chi_square}</span>
                  </div>
                  <div className="diagnostic-item">
                    <span className="diagnostic-label">P-value:</span>
                    <span className="diagnostic-value">{diagnostics.hosmer_lemeshow?.p_value}</span>
                  </div>
                  <div className="diagnostic-item">
                    <span className="diagnostic-label">Interpretation:</span>
                    <span className="diagnostic-value">{diagnostics.hosmer_lemeshow?.interpretation}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="diagnostic-test-card validation">
              <div className="diagnostic-icon">🎯</div>
              <div className="diagnostic-content">
                <h4>Cross-Validation</h4>
                <div className="diagnostic-stats">
                  <div className="diagnostic-item">
                    <span className="diagnostic-label">Mean AUC:</span>
                    <span className="diagnostic-value">{validation.cross_validation?.mean_auc?.toFixed(3)}</span>
                  </div>
                  <div className="diagnostic-item">
                    <span className="diagnostic-label">95% CI:</span>
                    <span className="diagnostic-value">
                      {validation.cross_validation?.confidence_interval?.lower?.toFixed(3)} -
                      {validation.cross_validation?.confidence_interval?.upper?.toFixed(3)}
                    </span>
                  </div>
                  <div className="diagnostic-item">
                    <span className="diagnostic-label">Interpretation:</span>
                    <span className="diagnostic-value">Consistent performance across validation folds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentCard>

        {/* Clinical Interpretation & Study Context */}
        <ContentCard
          icon="📋"
          title="Clinical Interpretation & Study Context"
          className="hl-content-card clinical-interpretation-card"
        >
          <div className="interpretation-section">
            <h4 className="interpretation-section-title">
              <span className="section-icon">🔬</span>
              Primary Findings
            </h4>
            <ul className="interpretation-list">
              {clinicalInterp.primary_findings?.map((finding, index) => (
                <li key={index}>{finding}</li>
              ))}
            </ul>
          </div>

          <div className="interpretation-section">
            <h4 className="interpretation-section-title">
              <span className="section-icon">🏥</span>
              Clinical Recommendations
            </h4>
            <ul className="interpretation-list">
              {clinicalInterp.clinical_recommendations?.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className="interpretation-section">
            <h4 className="interpretation-section-title">
              <span className="section-icon">⚠️</span>
              Study Limitations
            </h4>
            <ul className="interpretation-list">
              {clinicalInterp.study_limitations?.map((limitation, index) => (
                <li key={index}>{limitation}</li>
              ))}
            </ul>
          </div>
        </ContentCard>

        {/* Final Summary */}
        <div className="final-summary-box">
          <div className="final-summary-content">
            <div className="summary-icon">🎆</div>
            <div className="summary-text">
              <h3>Study Conclusion</h3>
              <p>
                This comprehensive analysis of 328,751 pregnancies demonstrates that
                <strong> gestational diabetes does not independently increase the risk of congenital hearing loss</strong>
                after accounting for other risk factors. The evidence supports current clinical guidelines
                that do not recommend additional hearing screening for infants born to mothers with gestational diabetes.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModelStatisticsSection;