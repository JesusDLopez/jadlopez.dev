// Hero Section - Main title and key statistics
import React, { useState, useEffect } from 'react';
import { useHearingLossData } from '../data/DataContext';
import { StatCard, ContentCard, DisclaimerCard } from '../../common';
import '../styles/hero.css';

const HeroSection = () => {
  const { summaryStats, loading, error, isReady } = useHearingLossData();
  const [isVisible, setIsVisible] = useState(false);


  // Trigger animation when data is ready
  useEffect(() => {
    if (isReady && summaryStats.dataset_overview) {
      setTimeout(() => setIsVisible(true), 300);
    }
  }, [isReady, summaryStats]);

  if (loading) {
    return (
      <div className="hl-section">
        <div className="hl-container">
          <div className="hl-loading">Loading study data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hl-section">
        <div className="hl-container">
          <div className="hl-card">
            <div className="hl-card-content">
              <h2>⚠️ Data Loading Error</h2>
              <p>Error: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const data = summaryStats.dataset_overview;

  return (
    <div className="hl-section">
      <div className="hl-container">

        {/* Enhanced Header */}
        <div className="hl-hero-header">
          <h1>Hearing Loss & Gestational Diabetes</h1>
          <p className="hl-hero-subtitle">
            A comprehensive analysis of risk factors for congenital hearing loss in Queensland health data
          </p>
        </div>

        {/* Content Cards - New Layout */}
        <div className="hl-content-cards">
          {/* Full-width Contribution Card */}
          <ContentCard
            title="My Contribution"
            icon="👨‍💻"
            className="hl-content-card hl-contribution-card"
          >
            <p>
              This project showcases my statistical work on an unpublished study of ~330,000 pregnancies
              from Queensland, Australia. The research team was investigating whether maternal gestational
              diabetes increased the risk of congenital hearing loss in newborns.
            </p>
            <p>
              I was responsible for data processing, building logistic regression models, producing diagnostics,
              and generating clear figures and tables. This page reproduces my work in Python (originally built in R)
              and presents the results through interactive, JavaScript-based visualizations.
            </p>
          </ContentCard>

          {/* Centered Disclaimer Card */}
          <DisclaimerCard className="hl-content-card disclaimer hl-disclaimer-card">
            <p>
              This study remains unpublished. The content here reflects only my contribution
              (statistical methods and results). It is presented for demonstration in my portfolio
              and should not be interpreted as final peer-reviewed findings.
            </p>
          </DisclaimerCard>
        </div>

        {/* Hero Statistics Cards */}
        {data && (
          <div className={`hl-hero-stats ${isVisible ? 'animate' : ''}`}>
            <StatCard
              value={data.total_pregnancies}
              label="Pregnancies Analyzed"
              description="Complete maternal-infant records from Queensland health database"
              variant="primary"
              className="hl-stat-card"
            />
            <StatCard
              value={data.hearing_loss_cases}
              label="Hearing Loss Cases"
              description={`Permanent congenital hearing loss (${data.hearing_loss_rate}% prevalence)`}
              variant="accent"
              className="hl-stat-card"
            />
            <StatCard
              value={data.gestational_diabetes_cases}
              label="Gestational Diabetes"
              description={`Mothers with gestational diabetes (${data.gestational_diabetes_rate}% prevalence)`}
              variant="secondary"
              className="hl-stat-card"
            />
          </div>
        )}

        {/* Context Section */}
        <div className="hl-context">
          <p>
            This study examines the relationship between maternal gestational diabetes
            and permanent congenital hearing loss in offspring using population-based
            health administrative data from Queensland, Australia.
          </p>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;