// components/CryptoPriceTracker.jsx
import React, { useEffect, useState } from 'react';

const LAST_PRICES = {
  BTC: 100500,
  ADA: 1.2
};

export default function CryptoPriceTracker({ onUpdated }) {
  const [prices, setPrices] = useState({ BTC: null, ADA: null });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/prices');
        const json = await res.json();

        setPrices({
          BTC: json.BTC,
          ADA: json.ADA
        });

        if (onUpdated) {
          onUpdated(new Date());
        }
      } catch (err) {
        console.error('Error fetching proxy price data:', err);
      }
    };

    fetchPrices();
  }, []);

  const format = (price) => price?.toFixed(2);

  const renderCard = (symbol, label) => {
    const price = prices[symbol];
    const last = LAST_PRICES[symbol];
    const delta = price && last ? ((price - last) / last) * 100 : null;
    const isDown = delta < 0;

    return (
      <div key={symbol} style={{
        background: '#1f2937',
        borderRadius: '10px',
        padding: '0.5rem 1rem',
        minWidth: '90px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
        fontSize: '0.875rem',
        color: '#f3f4f6'
      }}>
        <span style={{ fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: '0.9rem' }}>${price ? price.toFixed(2) : '—'}</span>
        {delta !== null && (
  <div style={{ textAlign: 'center' }}>
    <span style={{
      fontSize: '0.75rem',
      fontWeight: 500,
      color: isDown ? '#ef4444' : '#22c55e'
    }}>
      {isDown ? '▼' : '▲'} {Math.abs(delta).toFixed(1)}%
    </span>
    <div style={{
      fontSize: '0.675rem',
      fontFamily: 'monospace',
      color: '#9ca3af',
      marginTop: '0.25rem'
    }}>
      since last report
    </div>
  </div>
)}

      </div>
    );
  };

  return (
    <div style={{
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center'
    }}>
      {renderCard('ADA', 'ADA')}
      {renderCard('BTC', 'BTC')}
    </div>
  );
}
