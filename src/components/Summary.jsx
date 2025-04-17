// Summary.jsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function Summary({ initialInvestment = 20000 }) {
  // Calculate values based on the initialInvestment prop
  const currentMultiplier = 0.79; // Current value after ADA price drop
  
  const calculatedValues = useMemo(() => {
    const currentValue = (initialInvestment * currentMultiplier).toFixed(2);
    const returnAmount = (currentValue - initialInvestment).toFixed(2);
    const returnPercentage = (((currentValue - initialInvestment) / initialInvestment) * 100).toFixed(1);
    
    // Adjust chart data based on initial investment
    const ratio = initialInvestment / 20000; // Scale factor based on default 20000
    
    const chartData = [
      { label: 'JAN', value: Math.round(32000 * ratio) }, 
      { label: 'FEB', value: Math.round(26100 * ratio) }, 
      { label: 'MAR', value: Math.round(12500 * ratio) }, 
      { label: 'APR', value: Math.round(initialInvestment * currentMultiplier) },
    ];
    
    return { currentValue, returnAmount, returnPercentage, chartData };
  }, [initialInvestment, currentMultiplier]);
  
  const { currentValue, returnAmount, returnPercentage, chartData } = calculatedValues;
  const liquidityValue = 18; // Increased liquidity for flexibility

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: '#1f2937',
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          color: '#ffffff',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.05)'
        }}>
          <strong>{payload[0].payload.label}</strong><br />
          ${payload[0].value.toLocaleString()}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="section-title">Portfolio Summary</h2>

      {/* ──────────────── METRIC BAR ──────────────── */}
      <div className="card" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <MetricBlock 
          label="Initial Investment" 
          value={`$${Number(initialInvestment).toLocaleString()}`} 
        />
        <MetricBlock 
          label="Current Value" 
          value={`$${parseFloat(currentValue).toLocaleString()}`} 
        />
        <MetricBlock 
          label="Return" 
          value={`$${parseFloat(returnAmount).toLocaleString()}`}
          subValue={`${returnPercentage}%`}
          valueColor={parseFloat(returnAmount) >= 0 ? '#22c55e' : '#f87171'}
        />
        <MetricBlock 
          label="Liquidity %" 
          value={`${liquidityValue}%`} 
        />
      </div>

      {/* ──────────────── PERFORMANCE OVERVIEW ──────────────── */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="chart-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h4 className="chart-title">Performance Overview</h4>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
            <span style={{ cursor: 'pointer', color: '#3b82f6' }}>3M</span>
            <span style={{ cursor: 'pointer' }}>YTD</span>
            <span style={{ cursor: 'pointer' }}>ALL</span>
          </div>
        </div>

        <div className="chart-container" style={{ width: '100%', height: '320px' }}>
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="label" stroke="#6b7280" />
              <YAxis 
                stroke="#6b7280" 
                tickFormatter={(val) => `$${val / 1000}k`}
                domain={[0, Math.max(...chartData.map(d => d.value)) * 1.1]} // Dynamic domain
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
                  fill: '#3b82f6',
                  stroke: '#ffffff',
                  strokeWidth: 2
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ──────────────── QUARTERLY DEVELOPMENTS ──────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        <div className="card">
          <h4 style={{ marginBottom: '0.75rem', fontSize: '1rem', color: '#ffffff' }}>Q1 2025 Market Context</h4>
          <p style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>ADA price <span style={{ color: '#f87171' }}>-49%</span> (from $1.20 to $0.61)</p>
          <p style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>NFT valuations <span style={{ color: '#f87171' }}>↓</span> amid market correction</p>
          <p style={{ color: '#9ca3af' }}>Increased liquidity position <span style={{ color: '#22c55e' }}>+3%</span></p>
        </div>

        <div className="card">
          <h4 style={{ marginBottom: '0.75rem', fontSize: '1rem', color: '#ffffff' }}>Outlook & Strategy</h4>
          <p style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Maintaining long position on ADA <span style={{ color: '#22c55e' }}>target $5.00</span></p>
          <p style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Strategic accumulation during geopolitical dip</p>
          <p style={{ color: '#9ca3af' }}>Reduced exposure to volatile NFT sectors</p>
        </div>
      </div>
    </motion.div>
  );
}

// ──────────────── METRIC BLOCK COMPONENT ────────────────
function MetricBlock({ label, value, subValue, valueColor = '#ffffff' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{label}</span>
      <span style={{ fontSize: '1.5rem', fontWeight: 600, color: valueColor }}>{value}</span>
      {subValue && (
        <span style={{ 
          fontSize: '0.75rem', 
          color: valueColor,
          marginTop: '-0.25rem'
        }}>
          {subValue}
        </span>
      )}
    </div>
  );
}