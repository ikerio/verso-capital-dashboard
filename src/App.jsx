// App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import Summary from './components/Summary';
import PerformanceChart from './components/PerformanceChart';
import MarketInsights from './components/MarketInsights';
import InvestmentMetrics from './components/InvestmentMetrics';
import CryptoPriceTracker from './components/CryptoPriceTracker';
import FearGreedIndex from './components/FearGreedIndex';

import './styles/main.css';

export default function App() {
  // Changed default to null so Auth shows on initial load
  const [investmentTier, setInvestmentTier] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [lastUpdated, setLastUpdated] = useState(null);

  return (
    <Router>
      <div className="app-container">
        {!investmentTier ? (
          <Auth setInvestmentTier={setInvestmentTier} />
        ) : (
          <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.25rem 2rem',
                backgroundColor: '#0f172a',
                borderBottom: '1px solid #1e293b',
              }}>
                {/* Left Section: Branding */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>VERSO</h1>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Capital Dashboard - ${(investmentTier / 1000).toFixed(0)}K Tier
                  </span>
                </div>

                {/* Right Section: Tracker + Timestamp + Logout */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <CryptoPriceTracker onUpdated={setLastUpdated} />
                  {lastUpdated && (
                    <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                      Last Updated: {lastUpdated.toLocaleString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  )}
                  <button 
                    onClick={() => setInvestmentTier(null)} 
                    style={{
                      background: 'transparent',
                      border: '1px solid #1e293b',
                      color: '#9ca3af',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#1e293b';
                      e.currentTarget.style.color = '#e2e8f0';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#9ca3af';
                    }}
                  >
                    Logout
                  </button>
                </div>
              </header>

              {/* Tab Content */}
              <main className="dashboard-content" style={{ padding: '2rem' }}>
                <AnimatePresence mode="wait">
                  {activeTab === 'summary' && (
                    <motion.div
                      key="summary"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Summary initialInvestment={investmentTier} />
                    </motion.div>
                  )}
                  {activeTab === 'performance' && (
                    <motion.div
                      key="performance"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <PerformanceChart />
                    </motion.div>
                  )}
                  {activeTab === 'metrics' && (
                    <motion.div
                      key="metrics"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <InvestmentMetrics />
                    </motion.div>
                  )}
                  {activeTab === 'insights' && (
                    <motion.div
                      key="insights"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <MarketInsights />
                    </motion.div>
                  )}
                  {activeTab === 'fear-greed' && (
                    <motion.div
                      key="fear-greed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <FearGreedIndex />
                    </motion.div>
                  )}
                </AnimatePresence>
              </main>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}