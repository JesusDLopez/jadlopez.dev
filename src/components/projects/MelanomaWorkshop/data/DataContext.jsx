import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useMelanomaWorkshopData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useMelanomaWorkshopData must be used within MelanomaWorkshopDataProvider');
  }
  return context;
};

export const MelanomaWorkshopDataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJson = async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
      }
      return response.json();
    };

    const loadData = async () => {
      try {
        // Use import.meta.env.BASE_URL to get the correct base path
        const basePath = import.meta.env.BASE_URL || '/';
        const dataPath = `${basePath}data/melanoma-workshop/`;

        const [q1Analysis, q2Analysis, baseline, skills, evaluation, qualitative, masterSummary]
          = await Promise.all([
            loadJson(`${dataPath}Q1_analysis.json`),
            loadJson(`${dataPath}Q2_analysis.json`),
            loadJson(`${dataPath}Q3_Q5_Q6_baseline.json`),
            loadJson(`${dataPath}Confidence_Skills_101_112.json`),
            loadJson(`${dataPath}Workshop_Evaluation_Q4_Q9.json`),
            loadJson(`${dataPath}Qualitative_Q10_Q12.json`),
            loadJson(`${dataPath}Master_Analysis_Summary.json`),
          ]);

        setData({ 
          q1Analysis, 
          q2Analysis, 
          baseline, 
          skills, 
          evaluation, 
          qualitative, 
          masterSummary 
        });
        setIsReady(true);
      } catch (err) {
        console.error('Failed to load Melanoma Workshop data:', err);
        setError(err);
        setIsReady(true);
      }
    };

    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ ...data, isReady, error }}>
      {children}
    </DataContext.Provider>
  );
};
