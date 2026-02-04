// Shared utility functions for projects

// Format large numbers with locale-appropriate separators
export const formatNumber = (num) => {
  return num?.toLocaleString() || '0';
};

// Format percentages with consistent decimal places
export const formatPercentage = (value, decimals = 1) => {
  return `${Number(value || 0).toFixed(decimals)}%`;
};

// Format numbers with units (e.g., "330K", "1.2M")
export const formatNumberWithUnit = (num) => {
  if (!num) return '0';

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  } else {
    return num.toString();
  }
};