// Hearing Loss Report - Main Entry Component
import React from 'react';
import './styles/index.css';

// Data Context
import { DataProvider } from './data/DataContext';

// Section Components
import HeroSection from './components/HeroSection';
import MethodsSection from './components/MethodsSection';
import DemographicsSection from './components/DemographicsSection';
import RiskFactorsSection from './components/RiskFactorsSection';
import ComparisonSection from './components/ComparisonSection';
import ForestPlotSection from './components/ForestPlotSection';
import ModelStatisticsSection from './components/ModelStatisticsSection';

const HearingLossReport = () => {
  return (
    <div className="rp-root hl-root">
      <DataProvider>
        {/* All 7 sections of the report */}
        <HeroSection />
        <MethodsSection />
        <DemographicsSection />
        <RiskFactorsSection />
        <ComparisonSection />
        <ForestPlotSection />
        <ModelStatisticsSection />
      </DataProvider>
    </div>
  );
};

export default HearingLossReport;