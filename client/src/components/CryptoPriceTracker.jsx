// CryptoPriceTracker.jsx - Updated with July 2026 market data
import React, { useEffect, useState } from "react";

// April 2026 prices (last report baseline)
const PREV_PRICES = {
  BTC: 71103, // Bitcoin was ~$71k in the April report
  ADA: 0.25, // ADA was at $0.25 in the April report
};

// Current July 2026 prices
const CURRENT_PRICES = {
  BTC: 62000, // Bitcoin ~$62k (failed to hold $70k; rolled over through Jun–Jul)
  ADA: 0.15, // ADA at $0.15 (down ~40% from April, -82% from May 2025)
};

export default function CryptoPriceTracker({ onUpdated, onPriceChange }) {
  const [prices, setPrices] = useState({ BTC: null, ADA: null });
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      const USE_MOCK = true; // Using mock data for consistency

      if (USE_MOCK) {
        console.log("[CryptoPriceTracker] Using July 2026 market prices");

        // Set current crisis prices
        setPrices(CURRENT_PRICES);

        // Call callbacks
        if (onUpdated) onUpdated(new Date());
        if (onPriceChange) onPriceChange(CURRENT_PRICES.ADA);

        // Show crisis alert if ADA is below $0.50
        if (CURRENT_PRICES.ADA < 0.5) {
          setShowCrisisAlert(true);
        }
        return;
      }

      // Real API call (when enabled)
      try {
        const res = await fetch("http://localhost:4000/api/prices");
        const json = await res.json();

        const newPrices = {
          BTC: json.BTC,
          ADA: json.ADA,
        };

        setPrices(newPrices);

        if (onUpdated) onUpdated(new Date());
        if (onPriceChange) onPriceChange(newPrices.ADA);
      } catch (err) {
        console.error("Error fetching price data:", err);
        // Fall back to mock prices
        setPrices(CURRENT_PRICES);
        if (onPriceChange) onPriceChange(CURRENT_PRICES.ADA);
      }
    };

    fetchPrices();

    // Update every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, [onUpdated, onPriceChange]);

  const calculateChange = (current, previous) => {
    return ((current - previous) / previous) * 100;
  };

  const renderCard = (symbol, label) => {
    const price = prices[symbol];
    const previousPrice = PREV_PRICES[symbol];
    const delta =
      price && previousPrice ? calculateChange(price, previousPrice) : null;
    const isDown = delta < 0;

    // Special styling for crisis levels
    const isCritical = symbol === "ADA" && price < 0.5;
    const borderColor = isCritical ? "#ef4444" : isDown ? "#f59e0b" : "#22c55e";

    return (
      <div
        key={symbol}
        style={{
          background: "#1f2937",
          borderRadius: "10px",
          padding: "0.5rem 1rem",
          minWidth: "110px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          fontSize: "0.875rem",
          color: "#f3f4f6",
          border: `1px solid ${borderColor}`,
          position: "relative",
        }}
      >
        {isCritical && (
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "20px",
              height: "20px",
              background: "#ef4444",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.7rem",
              color: "#ffffff",
              animation: "pulse 2s infinite",
            }}
          >
            !
          </div>
        )}

        <span style={{ fontWeight: 600 }}>{label}</span>
        <span
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: isCritical ? "#ef4444" : "#ffffff",
            marginTop: "0.25rem",
          }}
        >
          $
          {price
            ? symbol === "BTC"
              ? price.toLocaleString()
              : price.toFixed(4)
            : "—"}
        </span>

        {delta !== null && (
          <div style={{ textAlign: "center", marginTop: "0.25rem" }}>
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: 500,
                color: isDown ? "#ef4444" : "#22c55e",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <span>{isDown ? "▼" : "▲"}</span>
              <span>{Math.abs(delta).toFixed(1)}%</span>
            </span>
            <div
              style={{
                fontSize: "0.675rem",
                fontFamily: "monospace",
                color: "#9ca3af",
                marginTop: "0.25rem",
              }}
            >
              since Apr report
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
        }}
      >
        {renderCard("ADA", "ADA")}
        {renderCard("BTC", "BTC")}
      </div>

      {showCrisisAlert && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 0.8rem",
            background: "rgba(239, 68, 68, 0.1)",
            borderRadius: "8px",
            fontSize: "0.75rem",
            color: "#ef4444",
            fontWeight: 500,
            border: "1px solid rgba(239, 68, 68, 0.3)",
          }}
        >
          <span style={{ fontSize: "0.9rem" }}>⚠️</span>
          <span>Crisis Level</span>
        </div>
      )}

      {/* Market Status Indicator */}
      <div
        style={{
          fontSize: "0.7rem",
          color: "#6b7280",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0.3rem 0.6rem",
          background: "rgba(0, 0, 0, 0.2)",
          borderRadius: "6px",
        }}
      >
        <span style={{ fontWeight: 600, color: "#f59e0b" }}>ADA / NFT CRISIS</span>
        <span>Fear Index: 48</span>
      </div>
    </div>
  );
}

// Add pulse animation style
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.7; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}
