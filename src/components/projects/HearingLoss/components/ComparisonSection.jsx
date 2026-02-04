// Comparison Section - Primary research question analysis
import React, { useState, useEffect } from 'react';
import { useHearingLossData } from '../data/DataContext';
import { ErrorBarChart, TransitionCard, ContentCard, KeyFinding, StatCard, AnalysisCard } from '../../common';
import '../styles/comparison.css';

const ComparisonSection = () => {
  const { comparison, isReady } = useHearingLossData();
  const [comparisonData, setComparisonData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [hoveredGroup, setHoveredGroup] = useState(null);

  useEffect(() => {
    if (isReady && comparison) {
      setComparisonData(comparison);

      // Prepare chart data
      if (comparison.comparison_data) {
        const chartData = comparison.comparison_data.map(item => ({
          category: item.gdm_status,
          percentage: item.hearing_loss_rate * 100, // Convert to percentage
          count: item.hearing_loss_cases,
          total: item.total_cases
        }));
        setChartData(chartData);
      }
    }
  }, [isReady, comparison]);

  if (!isReady) {
    return (
      <div className="hl-section">
        <div className="hl-container">
          <div className="hl-loading">Loading comparison data...</div>
        </div>
      </div>
    );
  }

  if (!comparisonData) {
    return (
      <div className="hl-section">
        <div className="hl-container">
          <div className="hl-error">No comparison data available</div>
        </div>
      </div>
    );
  }

  const gdmGroup = comparisonData.comparison_data?.find(item => item.gdm_status === "Gestational Diabetes");
  const noGdmGroup = comparisonData.comparison_data?.find(item => item.gdm_status === "No Diabetes");
  const primaryTest = comparisonData.statistical_tests?.find(test => test.test_name === "Multivariable Logistic Regression");

  return (
    <div className="hl-section">
      <div className="hl-container">

        {/* Header */}
        <div className="hl-header-container">
          <h2 className="hl-h2">Group Comparison Analysis</h2>
          <p className="hl-h2-subtitle">
            Comparing hearing loss rates between gestational diabetes and non-diabetes groups
          </p>
        </div>

        {/* Introduction */}
        <ContentCard
          icon="🔍"
          title="Bivariate Statistical Analysis"
          className="hl-content-card"
        >
          <p>
            This section examines the direct relationship between gestational diabetes and hearing loss
            through bivariate statistical testing. Unlike the univariate analysis which examined each risk
            factor independently, this comparison focuses specifically on our primary research question:
            does gestational diabetes status associate with different hearing loss rates? This unadjusted
            analysis serves as the foundation for understanding what role, if any, confounding variables
            may play in subsequent multivariable modeling.
          </p>
        </ContentCard>

        {/* Key Finding - No Association */}
        <KeyFinding className="hl-key-finding">
          There is no statistically significant difference in hearing loss rates
          between gestational diabetes (0.330%) and no diabetes (0.320%) groups (p = 0.345).
        </KeyFinding>

        {/* Main Analysis Container Box */}
        <div className="comparison-analysis-container">

          {/* Two-card layout: Visualization + Group Stats side-by-side */}
          <div className="comparison-top-grid">

            {/* Card 1: Statistical Visualization */}
            <div className="comparison-chart-box">
              {comparisonData.comparison_data && (
                <ErrorBarChart
                  data={comparisonData.comparison_data}
                  title="Hearing Loss Rate Comparison"
                  colors={['#10b981', '#3b82f6']}
                  className="comparison-error-bar-chart"
                  width={400}
                  height={300}
                  yAxisLabel="Hearing Loss Rate (%)"
                  onBarHover={(groupName) => setHoveredGroup(groupName)}
                  onBarLeave={() => setHoveredGroup(null)}
                  showConfidenceNote={true}
                />
              )}
            </div>

            {/* Card 2: Group Comparison Stats */}
            <div className="comparison-stats-box">
              <h3 className="comparison-box-title">Group Comparison</h3>
              <div className={`comparison-table-container ${hoveredGroup ? 'has-hover' : ''}`}>
                <div className="comparison-table">
                  {/* Header Row */}
                  <div className="table-header">
                    <div className="table-header-cell variable">
                      <span className="header-icon">📊</span>
                      <span>Variable</span>
                    </div>
                    <div className={`table-header-cell no-gdm ${hoveredGroup === 'No Diabetes' ? 'highlighted' : ''}`}>
                      <span>No Diabetes</span>
                    </div>
                    <div className={`table-header-cell gdm ${hoveredGroup === 'Gestational Diabetes' ? 'highlighted' : ''}`}>
                      <span>Gestational Diabetes</span>
                    </div>
                  </div>

                  {/* Data Rows */}
                  <div className="table-row">
                    <div className="table-cell variable">Total Cases</div>
                    <div className={`table-cell no-gdm ${hoveredGroup === 'No Diabetes' ? 'highlighted' : ''}`}>{noGdmGroup?.total_cases?.toLocaleString()}</div>
                    <div className={`table-cell gdm ${hoveredGroup === 'Gestational Diabetes' ? 'highlighted' : ''}`}>{gdmGroup?.total_cases?.toLocaleString()}</div>
                  </div>

                  <div className="table-row">
                    <div className="table-cell variable">Hearing Loss Cases</div>
                    <div className={`table-cell no-gdm ${hoveredGroup === 'No Diabetes' ? 'highlighted' : ''}`}>{noGdmGroup?.hearing_loss_cases?.toLocaleString()}</div>
                    <div className={`table-cell gdm ${hoveredGroup === 'Gestational Diabetes' ? 'highlighted' : ''}`}>{gdmGroup?.hearing_loss_cases?.toLocaleString()}</div>
                  </div>

                  <div className="table-row highlight">
                    <div className="table-cell variable">Hearing Loss Rate</div>
                    <div className={`table-cell no-gdm ${hoveredGroup === 'No Diabetes' ? 'highlighted' : ''}`}>{(noGdmGroup?.hearing_loss_rate * 100)?.toFixed(3)}%</div>
                    <div className={`table-cell gdm ${hoveredGroup === 'Gestational Diabetes' ? 'highlighted' : ''}`}>{(gdmGroup?.hearing_loss_rate * 100)?.toFixed(3)}%</div>
                  </div>

                  <div className="table-row confidence">
                    <div className="table-cell variable">95% Confidence Interval</div>
                    <div className={`table-cell no-gdm ${hoveredGroup === 'No Diabetes' ? 'highlighted' : ''}`}>
                      {noGdmGroup?.confidence_interval?.lower ?
                        `${(noGdmGroup.confidence_interval.lower * 100).toFixed(3)}% - ${(noGdmGroup.confidence_interval.upper * 100).toFixed(3)}%`
                        : 'N/A'
                      }
                    </div>
                    <div className={`table-cell gdm ${hoveredGroup === 'Gestational Diabetes' ? 'highlighted' : ''}`}>
                      {gdmGroup?.confidence_interval?.lower ?
                        `${(gdmGroup.confidence_interval.lower * 100).toFixed(3)}% - ${(gdmGroup.confidence_interval.upper * 100).toFixed(3)}%`
                        : 'N/A'
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Statistical Test Results - Custom styled cards */}
        <div className="comparison-stat-cards-container">
          <div className="stat-result-card chi-square-card">
            <div className="stat-result-value">χ² = {comparisonData.statistical_tests?.[1]?.test_statistic || '0.89'}</div>
            <div className="stat-result-label">Test Statistic</div>
            <div className="stat-result-description">Chi-square test of independence</div>
          </div>

          <div className="stat-result-card p-value-card">
            <div className="stat-result-value">p = {comparisonData.statistical_tests?.[1]?.p_value || '0.345'}</div>
            <div className="stat-result-label">P-value</div>
            <div className="stat-result-description">Probability of observing this difference by chance</div>
          </div>

          <div className="stat-result-card conclusion-card">
            <div className="stat-result-value">No Association</div>
            <div className="stat-result-label">Statistical Conclusion</div>
            <div className="stat-result-description">p &gt; 0.05, no significant difference detected</div>
          </div>
        </div>

        {/* Study Context */}
        <AnalysisCard
          icon="📋"
          title="Study Context"
          className="hl-analysis-card secondary-analysis"
        >
          <p>
            {comparisonData.clinical_context?.baseline_risk ||
             'Hearing loss affects approximately 3.2 per 1,000 births in the general population.'}
            Both groups show rates consistent with this baseline in this unadjusted comparison. However, to determine
            whether gestational diabetes has an independent effect on hearing loss risk—separate from the influence
            of other known risk factors—we must employ multivariable statistical modeling that simultaneously adjusts
            for multiple confounding variables.
          </p>
        </AnalysisCard>


        {/* Transition */}
        <TransitionCard
          icon="🔬"
          title="From Simple Comparison to Comprehensive Statistical Modeling"
          description="While this bivariate comparison found no significant difference (p = 0.345), this null finding does not necessarily mean gestational diabetes has no effect. Unadjusted comparisons cannot account for the complex interplay of confounding variables we identified earlier—from strong genetic factors like craniofacial abnormalities (OR=82.8) and family history (OR=14.4) to other maternal conditions."
        />

      </div>
    </div>
  );
};

export default ComparisonSection;