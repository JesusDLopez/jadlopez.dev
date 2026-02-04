// Demographics Section - Clean implementation following established patterns
import React, { useState, useEffect } from 'react';
import { useHearingLossData } from '../data/DataContext';
import { SectionHeader, InsightHighlight } from '../../../common';
import { DonutChart, BarChart, TransitionCard, KeyFinding } from '../../common';
import '../Styles/demographics.css';

const DemographicsSection = () => {
  const { demographics, isReady } = useHearingLossData();
  const [ageChartData, setAgeChartData] = useState(null);
  const [genderChartData, setGenderChartData] = useState(null);
  const [deliveryChartData, setDeliveryChartData] = useState(null);
  const [birthWeightChartData, setBirthWeightChartData] = useState(null);

  useEffect(() => {
    if (isReady && demographics) {
      // Prepare age chart data
      const ageData = demographics.maternal_characteristics['Maternal Age Group'];
      const ageChartData = Object.entries(ageData.percentages).map(([key, value]) => ({
        category: key,
        percentage: value,
        count: ageData.counts[key]
      }));
      setAgeChartData(ageChartData);

      // Prepare gender chart data
      const genderData = demographics.infant_characteristics['Gender'];
      const genderChartData = Object.entries(genderData.percentages).map(([key, value]) => ({
        category: key,
        percentage: value,
        count: genderData.counts[key]
      }));
      setGenderChartData(genderChartData);

      // Prepare delivery method chart data
      const deliveryData = demographics.infant_characteristics['Delivery Method'];
      const deliveryChartData = Object.entries(deliveryData.percentages).map(([key, value]) => ({
        category: key,
        percentage: value,
        count: deliveryData.counts[key]
      }));
      setDeliveryChartData(deliveryChartData);

      // Prepare birth weight chart data
      const weightData = demographics.infant_characteristics['Birth Weight'];
      const weightChartData = Object.entries(weightData.percentages).map(([key, value]) => ({
        category: key,
        percentage: value,
        count: weightData.counts[key]
      }));
      // Reorder birth weight data: Low, Normal, High
      const weightOrder = ["Low (<2500g)", "Normal (2500-4000g)", "High (>4000g)"];
      const orderedWeightData = weightOrder.map(key => {
        const item = weightChartData.find(d => d.category === key);
        return item || {category: key, percentage: 0, count: 0};
      });
      setBirthWeightChartData(orderedWeightData);
    }
  }, [isReady, demographics]);

  if (!isReady) {
    return (
      <div className="new-demographics-section">
        <div className="hl-container">
          <div className="hl-loading">Loading demographics data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="new-demographics-section">
      <div className="hl-container">

        {/* Header */}
        <div className="hl-header-container">
          <h2 className="hl-h2">Study Population Demographics</h2>
          <p className="hl-h2-subtitle">
            Understanding the characteristics of mothers and infants in our analysis
          </p>
        </div>

        <KeyFinding>
          Our study captures a representative sample of Queensland pregnancies,
          with balanced demographics that allow for robust statistical analysis of hearing loss risk factors.
        </KeyFinding>

        {/* Combined Demographics Box */}
        <div className="new-demo-donut-charts-box">
          <h4 className="new-demo-subsection-title">Population Demographics Overview</h4>

          <div className="new-demo-donut-charts-grid">
            <div className="new-demo-chart-container">
              {ageChartData && (
                <DonutChart
                  data={ageChartData}
                  title="Maternal Age Distribution"
                  colors={['#3b82f6', '#06b6d4']}
                  legendItems={[
                    { color: '#3b82f6', label: '<35 years' },
                    { color: '#06b6d4', label: '≥35 years' }
                  ]}
                  className="new-demo-donut-chart"
                />
              )}
            </div>

            <div className="new-demo-chart-container">
              {genderChartData && (
                <DonutChart
                  data={genderChartData}
                  title="Infant Gender Distribution"
                  colors={['#8b5cf6', '#ec4899']}
                  legendItems={[
                    { color: '#8b5cf6', label: 'Male' },
                    { color: '#ec4899', label: 'Female' }
                  ]}
                  className="new-demo-donut-chart"
                />
              )}
            </div>
          </div>

          <h4 className="new-demo-subsection-title">Clinical Characteristics</h4>

          <div className="new-demo-bar-charts-grid">
            <div className="new-demo-chart-container">
              {deliveryChartData && (
                <BarChart
                  data={deliveryChartData}
                  title="Delivery Methods"
                  colors={['#10b981', '#f59e0b', '#8b5cf6']}
                  categoryMapping={{
                    "Caesarean Section (CS)": "CS",
                    "Vaginal Non-Instrumental (VNI)": "VNI",
                    "Vaginal Instrumental (VI)": "VI"
                  }}
                  fullNameMapping={{
                    "Caesarean Section (CS)": "Caesarean Section",
                    "Vaginal Non-Instrumental (VNI)": "Vaginal Non-Instrumental",
                    "Vaginal Instrumental (VI)": "Vaginal Instrumental"
                  }}
                  className="new-demo-bar-chart"
                />
              )}
            </div>

            <div className="new-demo-chart-container">
              {birthWeightChartData && (
                <BarChart
                  data={birthWeightChartData}
                  title="Birth Weight Distribution"
                  colors={['#ef4444', '#10b981', '#f59e0b']}
                  categoryMapping={{
                    "Normal (2500-4000g)": "Normal",
                    "Low (<2500g)": "Low",
                    "High (>4000g)": "High"
                  }}
                  fullNameMapping={{
                    "Normal (2500-4000g)": "Normal Birth Weight (2500-4000g)",
                    "Low (<2500g)": "Low Birth Weight (<2500g)",
                    "High (>4000g)": "High Birth Weight (>4000g)"
                  }}
                  className="new-demo-bar-chart"
                />
              )}
            </div>
          </div>

          <p className="new-demo-footnote">
            Additional variables including maternal BMI, ethnicity, hypertension status, and delivery complications are examined in subsequent risk factor analyses. Note that not all variables analyzed are presented in this project report.
          </p>
        </div>

        {/* Transition to Risk Factors */}
        <TransitionCard
          icon="📊"
          title="From Demographics to Risk Factor Analysis"
          description="Having established the baseline characteristics of our study population, we now examine how various maternal and pregnancy-related factors are associated with congenital hearing loss through comprehensive risk factor analysis."
        />

      </div>
    </div>
  );
};

export default DemographicsSection;