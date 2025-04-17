// MarketInsights.jsx
import React from 'react';
import { motion } from 'framer-motion';
import LiveIntelCarousel from './LiveIntelCarousel';

export default function MarketInsights() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      {/* ───── MARKET OUTLOOK ───── */}
      <section style={cardStyle}>
        <h3 style={titleStyle}>2025: A Bullish Outlook for Crypto</h3>
        <p style={descStyle}>
          Explore the dynamic opportunities of the cryptocurrency market as it continues to reshape the global economy. 
          Strategic investments and regulatory clarity have paved the way for unprecedented growth.
        </p>
      </section>

      {/* ───── KEY GROWTH DRIVERS ───── */}
      <section style={cardStyle}>
        <h4 style={subtitleStyle}>Key Drivers of Growth</h4>
        <div style={gridStyle}>
          {[
            {
              title: 'AI Token Revolution',
              content: 'AI tokens are at the forefront of innovation, disrupting traditional industries with decentralized intelligence solutions. With up to 5x ROI reported, this sector is driving significant investment momentum.',
              metric: 'Growth Potential',
              value: 85
            },
            {
              title: 'Regulatory Clarity',
              content: '2025 has seen major jurisdictions embrace crypto with clear regulatory frameworks, fostering trust and unlocking institutional capital. This has transformed crypto from a speculative asset to a mainstream financial tool.',
              metric: 'Market Impact',
              value: 75
            },
            {
              title: 'NFTs with Utility',
              content: 'NFTs are evolving into utility-based models, enabling real-world applications in gaming, real estate, and identity verification. This evolution solidifies their value beyond collectibles.',
              metric: 'Innovation Factor',
              value: 65
            }
          ].map((item, i) => (
            <div key={i} style={infoCardStyle}>
              <h4 style={{ color: '#f3f4f6' }}>{item.title}</h4>
              <p style={cardContentStyle}>{item.content}</p>
              <div>
                <span style={metricLabelStyle}>{item.metric}</span>
                <div style={barOuterStyle}>
                  <div style={{ ...barFillStyle, width: `${item.value}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── CARDANO CASE ───── */}
      <section style={cardStyle}>
        <h4 style={subtitleStyle}>Why Cardano is the Future</h4>
        <div style={gridStyle}>
          {[
            {
              title: 'Increased Market Activity',
              content: 'Cardano (ADA) has seen significant market activity, with community support and technical analysis suggesting a bullish sentiment for the year.',
              secondary: 'The Cardano community continues to be a strong pillar, with market analysts and influencers expressing confidence in ADA\'s potential due to its active and supportive user base.'
            },
            {
              title: 'Thriving Community Sentiment',
              content: 'There\'s a noted surge in Cardano\'s daily active addresses, reflecting genuine user engagement rather than manipulated metrics seen in some other blockchain networks.',
              stat: '+42%',
              statLabel: 'Daily Active Address Growth'
            },
            {
              title: '2025 Price Projections',
              content: 'For 2025, while forecasts vary, there\'s a general expectation of appreciation. Analysts from different platforms predict ADA could hit between $2.52 to $2.87 on average, with some bullish scenarios going as high as $5.33.',
              priceRange: ['$2.52', '$5.33']
            }
          ].map((item, i) => (
            <div key={i} style={infoCardStyle}>
              <h4 style={{ color: '#f3f4f6' }}>{item.title}</h4>
              <p style={cardContentStyle}>{item.content}</p>
              {item.secondary && <p style={cardContentSecondaryStyle}>{item.secondary}</p>}
              {item.stat && (
                <div>
                  <div style={statStyle}>{item.stat}</div>
                  <div style={statLabelStyle}>{item.statLabel}</div>
                </div>
              )}
              {item.priceRange && (
                <div>
                  <div style={priceRangeStyle}>
                    <span>{item.priceRange[0]}</span>
                    <div style={rangeBarStyle} />
                    <span>{item.priceRange[1]}</span>
                  </div>
                  <div style={statLabelStyle}>Projected Price Range</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ───── STRATEGIC RECOMMENDATIONS ───── */}
      <section style={cardStyle}>
        <h4 style={subtitleStyle}>Strategic Recommendations</h4>
        <div style={gridStyle}>
          {[
            { title: 'Maintain AI Token Allocation', content: 'Continue strategic positioning in AI tokens to capitalize on sector growth.' },
            { title: 'Reduce Memecoin Exposure', content: 'Consider decreasing allocation to high-risk memecoins in preparation for potential market corrections.' },
            { title: 'Explore Cardano Opportunities', content: 'Consider increasing ADA position to leverage projected growth in the ecosystem.' }
          ].map((rec, i) => (
            <div key={i} style={infoCardStyle}>
              <h5 style={{ color: '#f3f4f6', marginBottom: '0.5rem' }}>{rec.title}</h5>
              <p style={cardContentStyle}>{rec.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── LIVE INTEL CAROUSEL ───── */}
      <LiveIntelCarousel />
    </motion.div>
  );
}

// ─── Styles
const cardStyle = {
  background: '#111827',
  padding: '2rem',
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem'
};

const infoCardStyle = {
  background: '#1f2937',
  borderRadius: '16px',
  padding: '1rem 1.25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
};

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#f9fafb'
};

const subtitleStyle = {
  fontSize: '1.125rem',
  fontWeight: 500,
  color: '#93c5fd'
};

const descStyle = {
  fontSize: '0.95rem',
  color: '#d1d5db'
};

const cardContentStyle = {
  fontSize: '0.875rem',
  color: '#9ca3af'
};

const cardContentSecondaryStyle = {
  fontSize: '0.8rem',
  color: '#6b7280',
  marginTop: '-0.5rem'
};

const metricLabelStyle = {
  fontSize: '0.75rem',
  color: '#6b7280',
  marginBottom: '0.25rem'
};

const barOuterStyle = {
  height: '6px',
  width: '100%',
  background: '#374151',
  borderRadius: '999px',
  overflow: 'hidden'
};

const barFillStyle = {
  height: '100%',
  background: '#3b82f6',
  borderRadius: '999px'
};

const statStyle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#22c55e'
};

const statLabelStyle = {
  fontSize: '0.75rem',
  color: '#9ca3af',
  marginTop: '0.25rem'
};

const priceRangeStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  marginTop: '0.5rem',
  fontSize: '0.875rem',
  color: '#f3f4f6'
};

const rangeBarStyle = {
  flex: 1,
  height: '6px',
  background: 'linear-gradient(to right, #3b82f6, #2563eb)',
  borderRadius: '999px'
};
