// Pre-defined genomic connector patterns for skills banner
// Represents intron regions (non-coding DNA) between exons/UTRs
// Varied lengths and patterns for visual interest without chaos

export const geneConnectors = [
  // Short connectors (80-120px) - frequent spacers with nucleotide sequences
  { id: 'c1', width: 80, pattern: 'solid', label: 'ATGC', sequence: 'ATGC' },
  { id: 'c2', width: 100, pattern: 'dashed', label: 'CGTA', sequence: 'CGTA' },
  { id: 'c3', width: 90, pattern: 'dotted', label: 'GCTA', sequence: 'GCTA' },
  { id: 'c4', width: 110, pattern: 'double', label: 'TACG', sequence: 'TACG' },

  // Medium connectors (120-180px) - moderate spacing with longer sequences
  { id: 'c5', width: 130, pattern: 'solid', label: 'ATCGATCG', sequence: 'ATCGATCG' },
  { id: 'c6', width: 150, pattern: 'dashed', label: 'GCTAGCTA', sequence: 'GCTAGCTA' },
  { id: 'c7', width: 160, pattern: 'mixed', label: 'TACGTACG', sequence: 'TACGTACG' },
  { id: 'c8', width: 140, pattern: 'dotted', label: 'CGATTACG', sequence: 'CGATTACG' },
  { id: 'c9', width: 170, pattern: 'double', label: 'ATGCATGC', sequence: 'ATGCATGC' },

  // Long connectors (180-250px) - rare, create breathing room with full sequences
  { id: 'c10', width: 200, pattern: 'solid', label: 'ATCGATCGATCG', sequence: 'ATCGATCGATCG' },
  { id: 'c11', width: 220, pattern: 'dashed', label: 'GCTAGCTAGCTA', sequence: 'GCTAGCTAGCTA' },
  { id: 'c12', width: 250, pattern: 'mixed', label: 'TACGTACGTACG', sequence: 'TACGTACGTACG' },
  { id: 'c13', width: 190, pattern: 'double', label: 'CGATTACGATCG', sequence: 'CGATTACGATCG' },
  { id: 'c14', width: 210, pattern: 'dotted', label: 'ATGCATGCATGC', sequence: 'ATGCATGCATGC' },
  { id: 'c15', width: 230, pattern: 'mixed', label: 'GCATGCATGCAT', sequence: 'GCATGCATGCAT' },
];

// Pattern definitions for visual styling
export const connectorPatterns = {
  solid: {
    strokeDasharray: 'none',
    strokeWidth: 1,
  },
  dashed: {
    strokeDasharray: '8 4',
    strokeWidth: 1,
  },
  dotted: {
    strokeDasharray: '2 4',
    strokeWidth: 1,
  },
  double: {
    strokeDasharray: '4 2 2 2',
    strokeWidth: 1,
  },
  mixed: {
    strokeDasharray: '10 3 2 3',
    strokeWidth: 1,
  },
};

// Helper function to get random connector
export const getRandomConnector = () => {
  const randomIndex = Math.floor(Math.random() * geneConnectors.length);
  return geneConnectors[randomIndex];
};

// Helper function to get weighted random connector (favors shorter connectors)
export const getWeightedConnector = () => {
  const random = Math.random();

  // 50% chance of short connector
  if (random < 0.5) {
    const shortConnectors = geneConnectors.slice(0, 4);
    return shortConnectors[Math.floor(Math.random() * shortConnectors.length)];
  }
  // 35% chance of medium connector
  else if (random < 0.85) {
    const mediumConnectors = geneConnectors.slice(4, 9);
    return mediumConnectors[Math.floor(Math.random() * mediumConnectors.length)];
  }
  // 15% chance of long connector
  else {
    const longConnectors = geneConnectors.slice(9);
    return longConnectors[Math.floor(Math.random() * longConnectors.length)];
  }
};
