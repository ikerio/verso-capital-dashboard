// Sidebar.jsx
import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { key: 'summary', label: 'Portfolio Summary', icon: SummaryIcon },
    { key: 'performance', label: 'Performance Analysis', icon: ChartIcon },
    { key: 'metrics', label: 'Investment Metrics', icon: MetricsIcon },
    { key: 'insights', label: 'Market Insights', icon: GlobeIcon },
    { key: 'fear-greed', label: 'Fear & Greed Index', icon: ThermometerIcon },
  ];

  return (
    <aside
      className="sidebar"
      style={{
        background: 'rgba(18, 24, 39, 0.85)',
        backdropFilter: 'blur(16px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        minWidth: '240px',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <div className="sidebar-logo" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="logo-icon" style={{ marginBottom: '0.75rem' }}>
          {/* Replace SVG with the logo image */}
          <img 
  src="/verso-capital-dashboard/logo.png" 
  alt="Verso Logo" 
  style={{
    width: '100px',
    height: 'auto',
    filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.3))'
  }} 
/>
        </div>
        <h1
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'white',
          }}
        >
          VERSO
        </h1>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`nav-item ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
            style={{
              background: activeTab === key ? 'rgba(74,144,226,0.15)' : 'transparent',
              color: activeTab === key ? '#3b82f6' : '#9ca3af',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: activeTab === key ? 600 : 500,
              transition: 'all 0.2s ease',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Icon color={activeTab === key ? '#3b82f6' : '#6b7280'} />
            {label}
          </button>
        ))}
      </nav>

      {/* Optional Footer */}
      <div style={{ marginTop: 'auto', fontSize: '0.75rem', color: '#6b7280', padding: '1rem 0' }}>
        <p>© 2025 VERSO Capital</p>
      </div>
    </aside>
  );
}

// ---- SVG ICON COMPONENTS ----
function SummaryIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" stroke={color} fill="none" strokeWidth="2">
      <rect x="3" y="3" width="7" height="9" rx="2" />
      <rect x="3" y="15" width="7" height="6" rx="2" />
      <rect x="14" y="3" width="7" height="6" rx="2" />
      <rect x="14" y="12" width="7" height="9" rx="2" />
    </svg>
  );
}

function ChartIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" stroke={color} fill="none" strokeWidth="2">
      <path d="M21 21H3V3" />
      <path d="M21 9L15 15L9 9L3 15" />
    </svg>
  );
}

function MetricsIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" stroke={color} fill="none" strokeWidth="2">
      <path d="M12 2L19.8 7V17L12 22L4.2 17V7L12 2Z" />
      <path d="M12 22V12" />
      <path d="M12 12L19.8 7" />
      <path d="M12 12L4.2 7" />
    </svg>
  );
}

function GlobeIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" stroke={color} fill="none" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12H22" />
      <path d="M12 2C14.5 4.7 15.9 8.3 16 12C15.9 15.7 14.5 19.3 12 22C9.5 19.3 8.1 15.7 8 12C8.1 8.3 9.5 4.7 12 2Z" />
    </svg>
  );
}

function ThermometerIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" stroke={color} fill="none" strokeWidth="2">
      <path d="M14 14.76V3a2 2 0 10-4 0v11.76a5 5 0 104 0z" />
    </svg>
  );
}