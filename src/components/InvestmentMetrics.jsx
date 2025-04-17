// InvestmentMetrics.jsx
import React, { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

export default function InvestmentMetrics() {
  const categories = [
    {
      name: 'NFT',
      scores: { Allocation: 40, Growth: 65, Stability: 55, Risk: 75, Innovation: 85 }, // Reduced allocation and growth expectations
      description: 'NFT valuations have been impacted by current market conditions, with temporary decline in growth prospects.',
      color: '#3b82f6',
    },
    {
      name: 'AI',
      scores: { Allocation: 25, Growth: 95, Stability: 75, Risk: 60, Innovation: 95 }, // Increased allocation to AI
      description: 'AI investments maintain strong growth and innovation potential, with increased allocation to balance portfolio.',
      color: '#60a5fa',
    },
    {
      name: 'Memecoins',
      scores: { Allocation: 10, Growth: 65, Stability: 45, Risk: 90, Innovation: 60 }, // Reduced allocation, higher risk
      description: 'Memecoins face increased volatility in current geopolitical climate, with reduced allocation.',
      color: '#f59e0b',
    },
    {
      name: 'Staking & Rewards',
      scores: { Allocation: 10, Growth: 55, Stability: 85, Risk: 45, Innovation: 75 }, // Increased allocation for stability
      description: 'Increased focus on staking rewards to provide portfolio stability during market uncertainty.',
      color: '#10b981',
    },
    {
      name: 'Cardano (ADA)',
      scores: { Allocation: 15, Growth: 90, Stability: 70, Risk: 65, Innovation: 85 }, // New category specifically for ADA
      description: 'Despite short-term price decline from $1.20 to $0.61, ADA maintains strong long-term prospects with $5 target.',
      color: '#6366f1',
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [expandedCategory, setExpandedCategory] = useState(categories[0].name);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCategoryClick = (category) => {
    if (category.name === selectedCategory.name) return;

    setIsExpanded(false); // collapse
    setTimeout(() => {
      setSelectedCategory(category);
      setExpandedCategory(category.name);
      setIsExpanded(true); // expand
    }, 250); // should match motion duration
  };

  const data = Object.entries(selectedCategory.scores).map(([metric, score]) => ({
    metric,
    score,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      {/* CATEGORY SELECTORS */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => handleCategoryClick(category)}
            style={{
              cursor: 'pointer',
              flex: '1 1 220px',
              background: '#111827',
              borderRadius: '16px',
              padding: '1rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
              border: selectedCategory.name === category.name
                ? `1px solid ${category.color}`
                : '1px solid #1f2937',
              transition: 'border 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '1rem', color: '#f3f4f6' }}>{category.name}</h4>
              <span style={{
                fontSize: '0.85rem',
                backgroundColor: '#1f2937',
                color: '#9ca3af',
                padding: '0.25rem 0.5rem',
                borderRadius: '999px'
              }}>
                {category.scores.Allocation}%
              </span>
            </div>

            {expandedCategory === category.name && (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, height: 0 }}
                animate={isExpanded ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ marginTop: '0.75rem', color: '#9ca3af', fontSize: '0.875rem' }}>
                  <p>{category.description}</p>

                  <div style={{ marginTop: '0.5rem' }}>
                    <p style={{ margin: '0.25rem 0' }}>
                      <strong>Growth:</strong> {getScoreDescription(category.scores.Growth, 'Growth')}
                    </p>
                    <p style={{ margin: '0.25rem 0' }}>
                      <strong>Risk:</strong> {getScoreDescription(category.scores.Risk, 'Risk')}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* SPIDER CHART PANEL */}
      <div style={{
        background: '#111827',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ color: '#f3f4f6', fontSize: '1rem', marginBottom: '1rem' }}>
            {selectedCategory.name} Portfolio Analysis
          </h3>

          <div style={{ width: '100%', maxWidth: '600px', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data} outerRadius="80%">
                <PolarGrid stroke="#1f2937" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                  stroke="#1f2937"
                />
                <Radar
                  dataKey="score"
                  stroke={selectedCategory.color}
                  fill={selectedCategory.color}
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ color: '#f3f4f6', fontSize: '0.875rem', paddingLeft: '1rem' }}>
          <h4 style={{ marginBottom: '0.5rem', color: '#3b82f6' }}>Key Insights</h4>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', color: '#9ca3af' }}>
            <li><strong>Allocation:</strong> {selectedCategory.scores.Allocation}% of portfolio</li>
            <li><strong>Growth:</strong> {getScoreDescription(selectedCategory.scores.Growth, 'Growth')}</li>
            <li><strong>Stability:</strong> {getScoreDescription(selectedCategory.scores.Stability, 'Stability')}</li>
            <li><strong>Risk:</strong> {getScoreDescription(selectedCategory.scores.Risk, 'Risk')}</li>
            <li><strong>Innovation:</strong> {getScoreDescription(selectedCategory.scores.Innovation, 'Innovation')}</li>
          </ul>
        </div>
        
        {/* Market Context Panel - New Addition */}
        <div style={{ color: '#f3f4f6', fontSize: '0.875rem', padding: '1rem', marginTop: '1rem', backgroundColor: '#1f2937', borderRadius: '12px' }}>
          <h4 style={{ marginBottom: '0.75rem', color: '#10b981' }}>Market Context</h4>
          <p style={{ color: '#9ca3af', marginBottom: '0.75rem' }}>
            Recent US-China trade tensions and broader geopolitical factors have temporarily impacted crypto markets, particularly affecting ADA prices (down from $1.20 to $0.61) and NFT valuations.
          </p>
          <p style={{ color: '#9ca3af', marginBottom: '0.75rem' }}>
            This correction is <strong>not</strong> related to fundamental weaknesses in crypto assets but reflects broader market uncertainty.
          </p>
          <p style={{ color: '#9ca3af' }}>
            We've adjusted allocations to increase stability while maintaining strong growth potential, with a continued bullish outlook on ADA reaching $5 by year-end.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// 🔍 Score Narrative Helper
function getScoreDescription(score, metric) {
  if (metric === 'Risk') {
    if (score >= 80) return "Very high risk exposure";
    if (score >= 65) return "High risk exposure";
    if (score >= 50) return "Moderate risk exposure";
    if (score >= 30) return "Low risk exposure";
    return "Very low risk exposure";
  }

  if (score >= 90) return "Exceptional";
  if (score >= 75) return "Very high";
  if (score >= 60) return "High";
  if (score >= 45) return "Moderate";
  if (score >= 30) return "Below average";
  return "Low";
}