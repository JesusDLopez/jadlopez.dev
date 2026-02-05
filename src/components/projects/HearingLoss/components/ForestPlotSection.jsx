// Forest Plot Section - Multivariable analysis results
import React, { useState, useEffect } from 'react';
import { useHearingLossData } from '../data/DataContext';
import { ForestPlot, TransitionCard, ContentCard, KeyFinding, AnalysisCard, StatCard } from '../../common';
import '../styles/forest-plot.css';

const ForestPlotSection = () => {
  const { forestPlot, isReady } = useHearingLossData();
  const [forestData, setForestData] = useState(null);
  const [modelSummary, setModelSummary] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState(null);

  useEffect(() => {
    if (isReady && forestPlot) {
      setForestData(forestPlot.forest_data || []);
      setModelSummary(forestPlot.model_summary || {});
    }
  }, [isReady, forestPlot]);

  if (!isReady) {
    return (
      <div className="hl-section">
        <div className="hl-container">
          <div className="hl-loading">Loading forest plot data...</div>
        </div>
      </div>
    );
  }

  if (!forestData || forestData.length === 0) {
    return (
      <div className="hl-section">
        <div className="hl-container">
          <div className="hl-error">No forest plot data available</div>
        </div>
      </div>
    );
  }

  const primaryPredictor = forestData.find(d => d.category === 'primary_predictor');
  const primaryPredictorCount = forestData.filter(d => d.category === 'primary_predictor').length;
  const strongRisk = forestData.filter(d => d.category === 'strong_risk');
  const moderateRisk = forestData.filter(d => d.category === 'moderate_risk');
  const nonSignificant = forestData.filter(d => d.category === 'non_significant');
  const significantFactors = forestData.filter(d => d.p_value < 0.05);

  return (
    <div className="hl-section">
      <div className="hl-container">

        {/* Header */}
        <div className="hl-header-container">
          <h2 className="hl-h2">The Complete Picture: Multivariable Analysis</h2>
          <p className="hl-h2-subtitle">
            Adjusted odds ratios accounting for confounding variables and their interactions
          </p>
        </div>

        {/* Introduction */}
        <ContentCard
          icon="🔬"
          title="Multivariable Logistic Regression Approach"
          className="hl-content-card"
        >
          <p>
            We employ multivariable logistic regression to control for potential confounding variables and isolate
            the independent effect of gestational diabetes on hearing loss risk. Variables were selected using backward
            stepwise selection based on Akaike Information Criterion (AIC), ensuring the final model includes only
            statistically meaningful predictors while avoiding overfitting. This approach simultaneously adjusts for
            other risk factors identified in our univariate analysis, revealing the true independent association
            between gestational diabetes and hearing loss.
          </p>
        </ContentCard>

        {/* Key Finding */}
        <KeyFinding className="hl-key-finding">
          After controlling for all significant risk factors in a multivariable model,
          gestational diabetes shows no independent association with hearing loss (adjusted OR = 1.093, p = 0.348).
        </KeyFinding>

        {/* Forest Plot Visualization */}
        <div className="forest-plot-box">
          <h3 className="forest-box-title">Forest Plot: Adjusted Odds Ratios</h3>

          <div className="forest-plot-container">
            <ForestPlot
              data={forestData}
              width={900}
              height={Math.max(400, forestData.length * 45 + 100)}
              className="main-forest-plot"
              hoveredCategory={hoveredCategory}
            />
          </div>
        </div>

        {/* Risk Categories - Using StatCards */}
        <div className="forest-categories-overview">
          <StatCard
            label="Primary Predictor"
            value={primaryPredictorCount}
            description="Gestational Diabetes (focus of study)"
            className="hl-stat-card forest-primary"
            onMouseEnter={() => {
              setHoveredCategory('primary_predictor');
              setCategoryInfo({
                title: 'Primary Predictor: Gestational Diabetes',
                items: primaryPredictor ? [`${primaryPredictor.variable} (Adjusted OR: ${primaryPredictor.odds_ratio?.toFixed(3)}, p = ${primaryPredictor.p_value?.toFixed(3)})`] : [],
                description: 'The main exposure variable of interest. After adjusting for all other significant risk factors in the multivariable model, gestational diabetes shows no independent association with hearing loss.'
              });
            }}
            onMouseLeave={() => {
              setHoveredCategory(null);
              setCategoryInfo(null);
            }}
          />

          <StatCard
            label="Strong Risk Factors"
            value={strongRisk.length}
            description="OR > 5 • Highly significant associations"
            className="hl-stat-card forest-strong"
            onMouseEnter={() => {
              setHoveredCategory('strong_risk');
              setCategoryInfo({
                title: 'Strong Risk Factors (Adjusted OR > 5)',
                items: strongRisk.map(f => `${f.variable} (OR: ${f.odds_ratio?.toFixed(2)}, p ${f.p_value < 0.001 ? '<0.001' : '= ' + f.p_value?.toFixed(3)})`),
                description: 'These factors maintain the strongest independent associations with hearing loss even after adjusting for other variables. They primarily represent genetic and syndromic conditions.'
              });
            }}
            onMouseLeave={() => {
              setHoveredCategory(null);
              setCategoryInfo(null);
            }}
          />

          <StatCard
            label="Moderate Risk"
            value={moderateRisk.length}
            description="OR 2-5 • Moderate associations"
            className="hl-stat-card forest-moderate"
            onMouseEnter={() => {
              setHoveredCategory('moderate_risk');
              setCategoryInfo({
                title: 'Moderate Risk Factors (Adjusted OR 2-5)',
                items: moderateRisk.map(f => `${f.variable} (OR: ${f.odds_ratio?.toFixed(2)}, p ${f.p_value < 0.001 ? '<0.001' : '= ' + f.p_value?.toFixed(3)})`),
                description: 'These factors show moderate independent associations with hearing loss after adjustment. They often represent prenatal or perinatal conditions.'
              });
            }}
            onMouseLeave={() => {
              setHoveredCategory(null);
              setCategoryInfo(null);
            }}
          />

          <StatCard
            label="Non-significant"
            value={nonSignificant.length}
            description="p > 0.05 • No significant association"
            className="hl-stat-card forest-non-sig"
            onMouseEnter={() => {
              setHoveredCategory('non_significant');
              setCategoryInfo({
                title: 'Non-significant Factors (p > 0.05)',
                items: nonSignificant.map(f => `${f.variable} (OR: ${f.odds_ratio?.toFixed(2)}, p = ${f.p_value?.toFixed(3)})`),
                description: 'These factors do not show statistically significant independent associations with hearing loss in the adjusted model, despite potential univariate associations.'
              });
            }}
            onMouseLeave={() => {
              setHoveredCategory(null);
              setCategoryInfo(null);
            }}
          />
        </div>

        {/* Category Info Panel */}
        {categoryInfo && (
          <div className="category-info-panel">
            <h4>{categoryInfo.title}</h4>
            <p className="category-info-description">{categoryInfo.description}</p>
            <div className="category-info-items">
              {categoryInfo.items.map((item, idx) => (
                <div key={idx} className="category-info-item">{item}</div>
              ))}
            </div>
          </div>
        )}

        {/* Analysis Summary */}
        <AnalysisCard
          icon="⚖️"
          title="Adjusted Analysis: Primary Finding and Clinical Context"
          className="hl-analysis-card secondary-analysis"
        >
          <p>
            <strong>Primary Finding:</strong> Gestational diabetes (OR = {primaryPredictor?.odds_ratio?.toFixed(3)},
            p = {primaryPredictor?.p_value}) shows no independent association with hearing loss after adjusting
            for {forestData.length - 1} other potential risk factors. This null finding persists even after
            controlling for confounding variables, confirming the results from our bivariate comparison.
          </p>
          <p>
            <strong>Significant Risk Factors:</strong> {significantFactors.length} factors showed significant
            associations in the adjusted model, with the strongest being {strongRisk[0]?.variable}
            (OR = {strongRisk[0]?.odds_ratio?.toFixed(1)}) and {strongRisk[1]?.variable}
            (OR = {strongRisk[1]?.odds_ratio?.toFixed(1)}). These predominantly represent non-modifiable
            genetic and congenital conditions rather than preventable maternal factors.
          </p>
          <p>
            <strong>Clinical Implications:</strong> These results suggest that gestational diabetes management
            protocols do not need specific hearing screening modifications beyond standard newborn hearing
            screening programs. Resources may be better allocated toward screening infants with strong genetic
            or syndromic risk factors.
          </p>
        </AnalysisCard>

        {/* Transition */}
        <TransitionCard
          icon="📋"
          title="From Forest Plot to Model Statistics"
          description="Having visualized the adjusted odds ratios and their confidence intervals, we now examine the detailed statistical model performance metrics, including goodness-of-fit measures and diagnostic statistics."
        />

      </div>
    </div>
  );
};

export default ForestPlotSection;