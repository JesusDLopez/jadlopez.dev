// Hearing Loss Report - Data Context
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useHearingLossData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useHearingLossData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base URL for data files - use Vite's BASE_URL for proper path resolution
  const basePath = import.meta.env.BASE_URL || '/';
  const baseUrl = `${basePath}data/hearing-loss`;

  // Data files to load (using actual filenames from public/data/hearing-loss/)
  const dataFiles = [
    'summary_statistics.json',
    'demographics.json',
    'risk_factors.json',
    'all_diabetes_types.json',
    'gdm_comparison.json',
    'forest_plot.json',
    'model_statistics.json'
  ];

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const loadAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load all data files in parallel
        const promises = dataFiles.map(async (filename) => {
          const url = `${baseUrl}/${filename}`;

          const response = await fetch(url, { signal });
          if (!response.ok) {
            throw new Error(`Failed to load ${filename}: ${response.status} ${response.statusText}`);
          }

          const jsonData = await response.json();
          return { filename, data: jsonData };
        });

        const results = await Promise.all(promises);

        // Organize data by filename (without extension)
        const organizedData = {};
        results.forEach(({ filename, data }) => {
          const key = filename.replace('.json', '');
          organizedData[key] = data;
        });

        setData(organizedData);

      } catch (err) {
        console.error('❌ Data loading error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();

    return () => {
      controller.abort();
    };
  }, []);

  // Helper functions for accessing specific data
  const contextValue = {
    // Raw data
    data,
    loading,
    error,

    // Convenient accessors (using actual filename keys)
    summaryStats: data.summary_statistics || {},
    demographics: data.demographics || {},
    riskFactors: data.risk_factors || {},
    allDiabetesTypes: data.all_diabetes_types || {},
    comparison: data.gdm_comparison || {},
    forestPlot: data.forest_plot || {},
    modelStats: data.model_statistics || {},

    // Data checking helpers
    hasData: (key) => data[key] && Object.keys(data[key]).length > 0,
    isReady: !loading && !error && Object.keys(data).length > 0
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
