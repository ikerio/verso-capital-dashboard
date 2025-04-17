// PerformanceChart.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

export default function PerformanceChart() {
  const [hoveredData, setHoveredData] = useState(null);

  // Updated data with Y3 Q4 showing the decline from January to April
  const data = [
    { period: 'Initial', quarter: '', value: 100, event: 'Initial Investment', detail: 'Starting point of capital allocation.', yearEnd: null },
    { period: 'Y1', quarter: 'Q1', value: 20, event: 'FTX Crash', detail: 'Portfolio value dropped by 80%.', yearEnd: null },
    { period: 'Y1', quarter: 'Q2', value: 45, event: 'Partial Recovery', detail: 'Reallocation and market rebound.', yearEnd: null },
    { period: 'Y1', quarter: 'Q3', value: 50, event: 'Market Stabilization', detail: 'Further recovery.', yearEnd: null },
    { period: 'Y1', quarter: 'Q4', value: 60, event: 'Year-End Position', detail: '60% of initial capital recovered.', yearEnd: 60 },
    { period: 'Y2', quarter: 'Q1', value: 55, event: 'Mild Dip', detail: 'Market uncertainty.', yearEnd: null },
    { period: 'Y2', quarter: 'Q2', value: 65, event: 'Uptrend', detail: 'Regained momentum.', yearEnd: null },
    { period: 'Y2', quarter: 'Q3', value: 75, event: 'Growth Phase', detail: 'Consistent upward trend.', yearEnd: null },
    { period: 'Y2', quarter: 'Q4', value: 95, event: 'Recovery Complete', detail: 'Nearly full return achieved.', yearEnd: 95 },
    { period: 'Y3', quarter: 'Q1', value: 105, event: 'Surpass Initial', detail: 'Above water performance.', yearEnd: null },
    { period: 'Y3', quarter: 'Q2', value: 98, event: 'Stagnation', detail: 'Election-year pause.', yearEnd: null },
    { period: 'Y3', quarter: 'Q3', value: 170, event: 'AI Token Boom', detail: 'Massive yield from AI reallocation.', yearEnd: null },
    { period: 'Y3', quarter: 'Q4', value: 112, event: 'Geopolitical Impact', detail: 'ADA price fell from $1.20 to $0.61 due to US-China trade tensions. NFT valuations also declined.', yearEnd: 112 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div style={{
          background: '#1e1e1e',
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          color: 'white',
          fontSize: '0.875rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
          maxWidth: '240px'
        }}>
          <strong>{d.period} {d.quarter}</strong><br />
          <span style={{ color: '#3b82f6' }}>{d.event}</span><br />
          <span>{d.value}%</span>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="performance-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      {/* ───── CHART PANEL ───── */}
      <div style={{
        background: '#111827',
        borderRadius: '20px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>
            Investment Performance Timeline
          </h3>
          <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: '#6b7280' }}>
            <span style={{ color: '#3b82f6', cursor: 'pointer' }}>All Time</span>
            <span style={{ cursor: 'pointer' }}>Year 3</span>
            <span style={{ cursor: 'pointer' }}>Year 2</span>
            <span style={{ cursor: 'pointer' }}>Year 1</span>
          </div>
        </div>

        <div style={{ width: '100%', height: '320px' }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              onMouseMove={(e) => setHoveredData(e?.activePayload?.[0]?.payload || null)}
              onMouseLeave={() => setHoveredData(null)}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="quarter"
                stroke="#6b7280"
                tickFormatter={(_, i) => `${data[i].period} ${data[i].quarter}`}
              />
              <YAxis
                domain={[0, 180]}
                stroke="#6b7280"
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fill="url(#areaGradient)"
                strokeWidth={2.5}
                activeDot={{
                  r: 6,
                  stroke: '#ffffff',
                  strokeWidth: 2,
                  fill: '#3b82f6'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{
          fontSize: '0.75rem',
          color: '#6b7280',
          marginTop: '1rem'
        }}>
          Portfolio Value (% of Initial Investment)
        </div>
      </div>

      {/* ───── DATA PANEL ───── */}
      <div style={{
        background: '#111827',
        borderRadius: '20px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
        color: '#f3f4f6'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
          {hoveredData ? `${hoveredData.period} ${hoveredData.quarter}` : 'Current Market Context'}
        </h3>

        {hoveredData ? (
          <>
            <h4 style={{ 
              fontSize: '0.875rem', 
              color: '#3b82f6', 
              marginBottom: '0.5rem' 
            }}>
              {hoveredData.event}
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{hoveredData.detail}</p>
            {hoveredData.yearEnd && (
              <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                <strong>Year-End Position:</strong> {hoveredData.yearEnd}%
              </p>
            )}
          </>
        ) : (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ color: '#3b82f6' }}>Recent Performance Update</h4>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                Portfolio declined from 170% to 79% in Q4 of Year 3 due to ADA price drop from $1.20 to $0.61 and NFT/token valuation decreases.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ color: '#3b82f6' }}>Market Context</h4>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                The decline is attributed to US-China trade tensions and broader geopolitical uncertainty, not underlying crypto fundamentals.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#3b82f6' }}>Position Summary</h4>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                Despite recent volatility, the portfolio remains at 79% of initial investment, maintaining an overall recovery since market crisis from tariffs.
              </p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}