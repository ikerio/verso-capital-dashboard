// components/FearGreedIndex.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  BarChart, 
  ChevronUp, 
  ChevronDown,
  Bookmark
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart
} from 'recharts';

export default function FearGreedIndex() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Market data
  const data = {
    current: {
      score: 34,
      label: 'Fear',
      change: +3
    },
    history: {
      yesterday: { score: 31, label: 'Fear' },
      lastWeek: { score: 15, label: 'Extreme Fear' },
      lastMonth: { score: 24, label: 'Fear' }
    },
    extremes: {
      high: { score: 88, label: 'Extreme Greed', date: '3 months ago' },
      low: { score: 15, label: 'Extreme Fear', date: '1 week ago' }
    },
    // Sample historical data for chart
    chartData: [
      { date: 'Jan', score: 55, label: 'Neutral' },
      { date: 'Feb', score: 70, label: 'Greed' },
      { date: 'Mar', score: 88, label: 'Extreme Greed' },
      { date: 'Apr', score: 65, label: 'Greed' },
      { date: 'May', score: 40, label: 'Fear' },
      { date: 'Jun', score: 25, label: 'Fear' },
      { date: 'Jul', score: 15, label: 'Extreme Fear' },
      { date: 'Aug', score: 20, label: 'Extreme Fear' },
      { date: 'Sep', score: 31, label: 'Fear' },
      { date: 'Oct', score: 34, label: 'Fear' },
    ],
    lastMonth: [
      { day: '1', score: 24 },
      { day: '5', score: 28 },
      { day: '10', score: 20 },
      { day: '15', score: 15 },
      { day: '20', score: 18 },
      { day: '25', score: 25 },
      { day: '30', score: 31 },
      { day: 'Now', score: 34 }
    ]
  };

  // Get sentiment color based on score
  const getSentimentColor = (score) => {
    if (score >= 75) return '#22c55e'; // Extreme Greed
    if (score >= 60) return '#4ade80'; // Greed
    if (score >= 45) return '#a3e635'; // Neutral-Greed
    if (score >= 35) return '#facc15'; // Neutral
    if (score >= 25) return '#f59e0b'; // Neutral-Fear
    if (score >= 10) return '#f97316'; // Fear
    return '#ef4444'; // Extreme Fear
  };

  // Get label based on score
  const getSentimentLabel = (score) => {
    if (score >= 75) return 'Extreme Greed';
    if (score >= 60) return 'Greed';
    if (score >= 45) return 'Neutral-Greed';
    if (score >= 35) return 'Neutral';
    if (score >= 25) return 'Fear';
    if (score >= 10) return 'Fear';
    return 'Extreme Fear';
  };
  
  // Calculate needle position angle (for semicircular gauge)
  const calculateRotation = (score) => {
    // Convert 0-100 scale to -90 to 90 degrees
    return -90 + (score * 1.8);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const score = payload[0].value;
      return (
        <div style={{
          background: '#1f2937',
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          color: 'white',
          fontSize: '0.875rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)'
        }}>
          <div style={{ color: getSentimentColor(score) }}>
            {getSentimentLabel(score)}
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            Score: <strong>{score}</strong>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      {/* Main Card with Gauge */}
      <section style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={titleStyle}>
            <AlertTriangle size={20} style={{ color: '#f59e0b', marginRight: '0.5rem' }} />
            Fear & Greed Index
          </h2>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {['overview', 'history'].map((tab) => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  cursor: 'pointer',
                  color: activeTab === tab ? '#3b82f6' : '#6b7280',
                  fontWeight: activeTab === tab ? 600 : 400,
                  fontSize: '0.875rem',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        {activeTab === 'overview' ? (
          <>
            {/* Gauge Visualization */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '100%', maxWidth: '400px', height: '200px', marginBottom: '0.5rem' }}>
                <svg viewBox="0 0 200 120">
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="15%" stopColor="#f97316" />
                      <stop offset="30%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#facc15" />
                      <stop offset="70%" stopColor="#a3e635" />
                      <stop offset="85%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                  
                  {/* Gauge background */}
                  <path 
                    d="M10,110 A90,90 0 0,1 190,110" 
                    fill="none" 
                    stroke="url(#gauge-gradient)" 
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  
                  {/* Gauge labels */}
                  <text x="5" y="115" fontSize="9" fill="#ef4444" textAnchor="middle">0</text>
                  <text x="50" y="75" fontSize="9" fill="#f97316" textAnchor="middle">25</text>
                  <text x="100" y="50" fontSize="9" fill="#facc15" textAnchor="middle">50</text>
                  <text x="150" y="75" fontSize="9" fill="#4ade80" textAnchor="middle">75</text>
                  <text x="195" y="115" fontSize="9" fill="#22c55e" textAnchor="middle">100</text>
                  
                  {/* Needle */}
                  <g transform={`rotate(${calculateRotation(data.current.score)}, 100, 110)`}>
                    <line x1="100" y1="110" x2="100" y2="30" stroke={getSentimentColor(data.current.score)} strokeWidth="3" />
                    <circle cx="100" cy="110" r="6" fill={getSentimentColor(data.current.score)} />
                  </g>
                </svg>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ 
                fontSize: '3.5rem', 
                fontWeight: 700, 
                color: getSentimentColor(data.current.score),
                marginRight: '1rem' 
              }}>
                {data.current.score}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '1.25rem', color: getSentimentColor(data.current.score) }}>
                  {data.current.label}
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: data.current.change >= 0 ? '#22c55e' : '#ef4444',
                  fontSize: '0.875rem'
                }}>
                  {data.current.change >= 0 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  <span>{Math.abs(data.current.change)} points</span>
                </div>
              </div>
            </div>

            {/* Historical Comparison */}
            <div>
              <h4 style={subtitleStyle}>
                <Clock size={16} style={{ marginRight: '0.5rem' }} />
                Historical Sentiment
              </h4>
              <div style={gridStyle}>
                {Object.entries(data.history).map(([period, info]) => (
                  <div key={period} style={infoCardStyle}>
                    <h5 style={cardLabelStyle}>{period.replace(/([a-z])([A-Z])/g, '$1 $2')}</h5>
                    <div style={{ fontSize: '1.25rem', color: getSentimentColor(info.score) }}>{info.score}</div>
                    <div style={{ fontSize: '0.875rem', color: getSentimentColor(info.score) }}>{info.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extremes Section */}
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={subtitleStyle}>
                <Bookmark size={16} style={{ marginRight: '0.5rem' }} />
                Extreme Ranges
              </h4>
              <div style={gridStyle}>
                {Object.entries(data.extremes).map(([key, info]) => (
                  <div key={key} style={infoCardStyle}>
                    <h5 style={cardLabelStyle}>{key === 'high' ? 'Yearly High' : 'Yearly Low'}</h5>
                    <div style={{ fontSize: '1.25rem', color: getSentimentColor(info.score) }}>{info.score}</div>
                    <div style={{ fontSize: '0.875rem', color: getSentimentColor(info.score) }}>{info.label}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>{info.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* History Tab Content */}
            <div>
              <h4 style={subtitleStyle}>
                <TrendingUp size={16} style={{ marginRight: '0.5rem' }} />
                Historical Trend
              </h4>
              <div style={{ height: '300px', marginTop: '1rem', marginBottom: '1.5rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.chartData}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" />
                    <YAxis domain={[0, 100]} stroke="#9ca3af" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <h4 style={subtitleStyle}>
                <BarChart size={16} style={{ marginRight: '0.5rem' }} />
                Recent Movement
              </h4>
              <div style={{ height: '200px', marginTop: '1rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.lastMonth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis domain={[0, 100]} stroke="#9ca3af" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ stroke: '#3b82f6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div style={infoCardStyle}>
                <h4 style={{ fontSize: '0.875rem', color: '#f3f4f6', marginBottom: '0.5rem' }}>Analysis</h4>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                  The Fear & Greed Index has been in fear territory for most of the past month, hitting its lowest point of 15 (Extreme Fear) two weeks ago. Current data shows a potential sentiment shift, with a positive trend emerging in recent days.
                </p>
              </div>
            </div>
          </>
        )}
      </section>

      {/* What This Means */}
      <section style={cardStyle}>
        <h4 style={subtitleStyle}>What This Means</h4>
        
        <div style={infoCardStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <h5 style={{ color: '#f3f4f6', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Current Market Sentiment</h5>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                The market is currently in <strong style={{ color: getSentimentColor(data.current.score) }}>{data.current.label}</strong> territory at <strong>{data.current.score}</strong>. This indicates cautious investor sentiment, with potential buying opportunities for contrarian investors.
              </p>
            </div>
            
            <div>
              <h5 style={{ color: '#f3f4f6', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Investment Implications</h5>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                High fear levels typically present buying opportunities as markets may be oversold. Current levels suggest gradual accumulation strategies while maintaining defensive positions.
              </p>
            </div>
          </div>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <div style={infoCardStyle}>
            <h5 style={{ color: '#f3f4f6', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Bulls Say</h5>
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '1.25rem', 
              color: '#9ca3af', 
              fontSize: '0.875rem' 
            }}>
              <li>Fear level indicates oversold conditions</li>
              <li>Positive trend forming with +3 point change</li>
              <li>Historically strong returns after fear episodes</li>
            </ul>
          </div>
          
          <div style={infoCardStyle}>
            <h5 style={{ color: '#f3f4f6', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Bears Say</h5>
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '1.25rem', 
              color: '#9ca3af', 
              fontSize: '0.875rem' 
            }}>
              <li>Fear could persist longer than expected</li>
              <li>Market may test lower levels before reversal</li>
              <li>Macroeconomic headwinds remain significant</li>
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// ─── STYLES ───
const cardStyle = {
  background: '#111827',
  borderRadius: '20px',
  padding: '1.5rem',
  boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: '1rem'
};

const infoCardStyle = {
  background: '#1f2937',
  borderRadius: '12px',
  padding: '1rem',
  boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
};

const titleStyle = {
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#f9fafb',
  display: 'flex',
  alignItems: 'center'
};

const subtitleStyle = {
  fontSize: '1rem',
  fontWeight: 500,
  color: '#93c5fd',
  marginBottom: '0.75rem',
  display: 'flex',
  alignItems: 'center'
};

const cardLabelStyle = {
  fontSize: '0.875rem',
  color: '#9ca3af',
  marginBottom: '0.25rem'
};