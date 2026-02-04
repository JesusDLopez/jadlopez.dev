import React from 'react';
import { MelanomaWorkshopDataProvider } from './data/DataContext';
import HeroSection from './components/HeroSection';
import MethodsSection from './components/MethodsSection';
import SkillsSection from './components/SkillsSection';
import KnowledgeSection from './components/KnowledgeSection';
import SatisfactionSection from './components/SatisfactionSection';
import BarriersSection from './components/BarriersSection';
import RecommendationsSection from './components/RecommendationsSection';
import './styles/index.css';

const MelanomaWorkshop = () => {
  return (
    <div className="rp-root mw-root">
      <MelanomaWorkshopDataProvider>
        <HeroSection />
        <MethodsSection />
        <SkillsSection />
        <KnowledgeSection />
        <SatisfactionSection />
        <BarriersSection />
        <RecommendationsSection />
      </MelanomaWorkshopDataProvider>
    </div>
  );
};

export default MelanomaWorkshop;
