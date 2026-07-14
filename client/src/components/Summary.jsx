// Summary.jsx with illiquidity period narrative
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Summary({
  initialInvestment = 20000,
  currentADAPrice = 0.15,
}) {
  // Updated to 12M for the extended crisis period
  const [activePeriod, setActivePeriod] = useState("6M");

  // Mark-to-Model Valuation Approach for Illiquid NFT Assets
  // May 2025 report: ADA was at $0.82, portfolio at -25.1% ($14,982.76)
  const mayADAPrice = 0.82;
  const currentADAPrice_actual = 0.15; // July 2026 actual price

  // Historical ADA prices for the "Valley of Uncertainty" (now 14 months)
  const adaPrices = {
    may: 0.82,
    jun: 0.625,
    jul: 0.7343,
    aug: 0.9254,
    sep: 0.889,
    oct: 0.6997,
    nov: 0.4046,
    dec: 0.33,
    jan26: 0.29,
    feb26: 0.28,
    mar26: 0.24,
    apr26: 0.25,
    may26: 0.24,
    jun26: 0.17,
    jul26: 0.15,
  };

  // Hybrid valuation model for illiquid NFT assets
  const calculatePortfolioValue = (adaPrice, baseMultiplier) => {
    // Base ADA value component (40% weight) - tracks ADA price movement
    const adaComponent = baseMultiplier * (adaPrice / mayADAPrice) * 0.4;

    // Illiquidity discount component (30% weight) - reflects market depth
    const liquidityPenalty = adaPrice < 0.6 ? 0.25 : 0.45; // Severe penalty when ADA drops
    const liquidityComponent = baseMultiplier * liquidityPenalty * 0.3;

    // Premium asset floor (30% weight) - rare NFTs maintain minimum value
    const premiumFloor = 0.35; // Rare NFTs maintain 35% minimum value
    const premiumComponent = premiumFloor * 0.3;

    return adaComponent + liquidityComponent + premiumComponent;
  };

  const calculatedValues = useMemo(() => {
    // Current portfolio value using Mark-to-Model
    const mayMultiplier = 0.749; // May was at -25.1%
    const currentMultiplier = calculatePortfolioValue(
      currentADAPrice_actual,
      mayMultiplier
    );
    const currentValue = (initialInvestment * currentMultiplier).toFixed(2);
    const returnAmount = (currentValue - initialInvestment).toFixed(2);
    const returnPercentage = (
      ((currentValue - initialInvestment) / initialInvestment) *
      100
    ).toFixed(1);

    // Adjust chart data based on initial investment
    const ratio = initialInvestment / 20000;

    // Calculate portfolio values for each month using Mark-to-Model
    const mayValue = 14982.76 * ratio; // Last verified value

    const allData = [
      // Historical verified data
      {
        label: "OCT",
        value: Math.round(initialInvestment * 0.9),
        verified: true,
      },
      {
        label: "NOV",
        value: Math.round(initialInvestment * 1.05),
        verified: true,
      },
      {
        label: "DEC",
        value: Math.round(initialInvestment * 1.25),
        verified: true,
      },
      { label: "JAN", value: Math.round(32000 * ratio), verified: true },
      { label: "FEB", value: Math.round(26100 * ratio), verified: true },
      { label: "MAR", value: Math.round(12500 * ratio), verified: true },
      { label: "APR", value: Math.round(11000 * ratio), verified: true },
      { label: "MAY", value: Math.round(mayValue), verified: true },

      // The "Valley of Uncertainty" - Mark-to-Model valuations
      // These values DON'T track ADA price spikes because NFT market had no volume
      {
        label: "JUN",
        value: Math.round(
          initialInvestment *
            calculatePortfolioValue(adaPrices.jun, mayMultiplier)
        ),
        illiquid: true,
      },
      {
        label: "JUL",
        value: Math.round(
          initialInvestment *
            calculatePortfolioValue(adaPrices.jul, mayMultiplier)
        ),
        illiquid: true,
      },
      {
        label: "AUG",
        value: Math.round(
          initialInvestment *
            calculatePortfolioValue(adaPrices.aug, mayMultiplier)
        ),
        illiquid: true,
      },
      {
        label: "SEP",
        value: Math.round(
          initialInvestment *
            calculatePortfolioValue(adaPrices.sep, mayMultiplier)
        ),
        illiquid: true,
      },
      {
        label: "OCT 25",
        value: Math.round(
          initialInvestment *
            calculatePortfolioValue(adaPrices.oct, mayMultiplier)
        ),
        illiquid: true,
      },
      {
        label: "NOV",
        value: Math.round(
          initialInvestment *
            calculatePortfolioValue(adaPrices.nov, mayMultiplier)
        ),
        illiquid: true,
      },
      {
        label: "DEC",
        value: Math.round(
          initialInvestment *
            calculatePortfolioValue(adaPrices.dec, mayMultiplier)
        ),
        illiquid: true,
      },
      {
        label: "JAN 26",
        value: Math.round(
          initialInvestment *
            calculatePortfolioValue(adaPrices.jan26, mayMultiplier)
        ),
        illiquid: true,
      },
      {
        label: "FEB",
        value: Math.round(
          initialInvestment *
            calculatePortfolioValue(adaPrices.feb26, mayMultiplier)
        ),
        illiquid: true,
      },
      {
        label: "MAR",
        value: Math.round(
          initialInvestment *
            calculatePortfolioValue(adaPrices.mar26, mayMultiplier)
        ),
        illiquid: true,
      },
      {
        label: "APR",
        value: Math.round(
          initialInvestment *
            calculatePortfolioValue(adaPrices.apr26, mayMultiplier)
        ),
        illiquid: true,
      },
      {
        label: "MAY 26",
        value: Math.round(
          initialInvestment *
            calculatePortfolioValue(adaPrices.may26, mayMultiplier)
        ),
        illiquid: true,
      },
      {
        label: "JUN 26",
        value: Math.round(
          initialInvestment *
            calculatePortfolioValue(adaPrices.jun26, mayMultiplier)
        ),
        illiquid: true,
      },
      {
        label: "JUL 26",
        value: Math.round(parseFloat(currentValue)),
        illiquid: true,
        current: true,
      },
    ];

    // Filter data based on selected time period
    let chartData;
    switch (activePeriod) {
      case "6M":
        // Show Feb 2026 through July 2026 (last 6 months)
        chartData = allData.slice(16);
        break;
      case "12M":
        // Show May 2025 through July 2026 (full crisis period)
        chartData = allData.slice(7); // From MAY onwards
        break;
      case "ALL":
        chartData = allData;
        break;
      default:
        chartData = allData.slice(16); // Default to 6M view
    }

    return { currentValue, returnAmount, returnPercentage, chartData };
  }, [initialInvestment, activePeriod]);

  const { currentValue, returnAmount, returnPercentage, chartData } =
    calculatedValues;
  const liquidityValue = 4; // Liquid ADA + cash; shrinks further as ADA falls to $0.15

  // Calculate Y-axis domain
  const maxValue = Math.max(...chartData.map((d) => d.value));
  const minValue = Math.min(...chartData.map((d) => d.value));

  const calculateYAxisTicks = () => {
    const range = maxValue - minValue;
    const step = Math.ceil(range / 4 / 1000) * 1000;
    let ticks = [];
    let currentTick = Math.floor(minValue / 1000) * 1000;
    while (currentTick <= maxValue * 1.1) {
      ticks.push(currentTick);
      currentTick += step;
    }
    return ticks;
  };

  const yAxisTicks = calculateYAxisTicks();

  // Custom tooltip to show illiquidity warnings
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            background: "#1f2937",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            color: "#ffffff",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          <strong>{data.label}</strong>
          <br />${payload[0].value.toLocaleString()}
          {data.illiquid && (
            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: "#f59e0b",
                fontStyle: "italic",
              }}
            >
              ⚠️ Mark-to-Model Valuation
              <br />
              <span style={{ fontSize: "0.7rem", color: "#9ca3af" }}>
                No market liquidity for price discovery
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Updated market insights for extended illiquidity period (Jul 2026)
  const marketInsights = [
    {
      title: "Extended Liquidity Crisis (Jun 2025 to Jul 2026)",
      items: [
        {
          label: "NFT Marketplace",
          value: "Shut Down",
          color: "#ef4444",
          detail:
            "JPG Store, the main Cardano NFT marketplace, closed for good on May 23, 2026. There is no longer a real place to sell these NFTs. Trading across the whole chain is now about $3.5k a day, with fewer than 30 buyers.",
        },
        {
          label: "ADA Price",
          value: "-82%",
          color: "#f87171",
          detail:
            "ADA fell from $0.82 in May 2025 to about $0.15 now, down another 40% since our April report. The $0.25 level we thought might hold in the spring did not.",
        },
        {
          label: "Valuation Method",
          value: "Mark-to-Model",
          color: "#f59e0b",
          detail:
            "The model weighs the ADA price (40%), a liquidity discount (30%), and an assumed floor for the NFTs (30%). With the marketplace closed, we can no longer support that 35% floor and are lowering it.",
        },
        {
          label: "Fear & Greed",
          value: "48 (Neutral)",
          color: "#f59e0b",
          detail:
            "Overall crypto sentiment has recovered from its February low of 5 back to Neutral (48). None of that reached Cardano or its NFTs, so it does not help this portfolio.",
        },
      ],
    },
    {
      title: "Preservation Strategy",
      items: [
        {
          label: "Position Status",
          value: "HOLD (No Venue)",
          color: "#f59e0b",
          detail:
            "The NFTs cannot be sold now that the marketplace has closed, so holding them is not really a decision. Our liquid ADA and cash are still there and still accessible.",
        },
        {
          label: "Exit Strategy",
          value: "No Market Exists",
          color: "#ef4444",
          detail:
            "With JPG Store gone, nothing is setting a price for the NFTs. A recovery depends on a new marketplace, an aggregator, or a serious OTC buyer showing up.",
        },
        {
          label: "Realistic Value",
          value: "5-10% (Revised)",
          color: "#ef4444",
          detail:
            "No real buyer ever confirmed the 35% floor. With the marketplace closed, we are lowering our estimate of what the portfolio could be sold for, from 10-15% to about 5-10% of the original investment.",
        },
        {
          label: "Recovery Timeline",
          value: "Unknown",
          color: "#ef4444",
          detail:
            "We will not put a date on it. The NFTs need the market around them to be rebuilt almost from scratch. They are still in your wallet and still yours; they just cannot be sold for now.",
        },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="section-title">Portfolio Summary</h2>

      {/* ────────────── ILLIQUIDITY WARNING BANNER ────────────── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1))",
          border: "1px solid #f59e0b",
          borderRadius: "12px",
          padding: "1rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ fontSize: "1.5rem" }}>⚠️</div>
        <div>
          <h4
            style={{
              color: "#f59e0b",
              marginBottom: "0.25rem",
              fontSize: "0.95rem",
            }}
          >
            Portfolio Under Mark-to-Model Valuation
          </h4>
          <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: 0 }}>
            Because the NFT market has almost no trading, portfolio values from
            June 2025 onward are estimates from a model, not real market prices.
            The illiquidity has now run 14 months. On May 23, 2026, JPG Store,
            the main Cardano NFT marketplace, closed for good, so nothing is
            setting a price for these holdings anymore. The model values shown
            here are well above what the portfolio could actually be sold for
            today, which we estimate at 5-10% of the original investment.
          </p>
        </div>
      </div>

      {/* ────────────── METRIC BAR ────────────── */}
      <div
        className="card"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <MetricBlock
          label="Initial Investment"
          value={`$${Number(initialInvestment).toLocaleString()}`}
        />
        <MetricBlock
          label="Current Value"
          value={`$${parseFloat(currentValue).toLocaleString()}`}
          subValue="Mark-to-Model"
          valueColor="#f59e0b"
        />
        <MetricBlock
          label="Unrealized Loss"
          value={`$${parseFloat(returnAmount).toLocaleString()}`}
          subValue={`${returnPercentage}%`}
          valueColor={parseFloat(returnAmount) >= 0 ? "#22c55e" : "#f87171"}
        />
        <MetricBlock label="Liquidity Reserve" value={`${liquidityValue}%`} />
      </div>

      {/* ────────────── PERFORMANCE OVERVIEW ────────────── */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div
          className="chart-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div>
            <h4 className="chart-title">Performance Overview</h4>
            {(activePeriod === "6M" || activePeriod === "12M") && (
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#f59e0b",
                  fontStyle: "italic",
                  display: "block",
                  marginTop: "0.25rem",
                }}
              >
                ⚠️ Jun 2025 to Jul 2026 values use Mark-to-Model due to market illiquidity
              </span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              fontSize: "0.75rem",
              color: "#6b7280",
            }}
          >
            {["6M", "12M", "ALL"].map((period) => (
              <span
                key={period}
                onClick={() => setActivePeriod(period)}
                style={{
                  cursor: "pointer",
                  color: activePeriod === period ? "#3b82f6" : "#6b7280",
                  fontWeight: activePeriod === period ? 500 : 400,
                  transition: "color 0.2s ease",
                }}
              >
                {period}
              </span>
            ))}
          </div>
        </div>

        <div
          className="chart-container"
          style={{ width: "100%", height: "320px" }}
        >
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <pattern
                  id="diagonalHatch"
                  patternUnits="userSpaceOnUse"
                  width="4"
                  height="4"
                >
                  <path
                    d="M0,4 l4,-4 M0,0 l4,4"
                    style={{
                      stroke: "#f59e0b",
                      strokeWidth: 0.5,
                      opacity: 0.3,
                    }}
                  />
                </pattern>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis dataKey="label" stroke="#6b7280" />
              <YAxis
                stroke="#6b7280"
                tickFormatter={(val) => `$${val / 1000}k`}
                domain={[0, maxValue * 1.1]}
                ticks={yAxisTicks}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fill="url(#areaGradient)"
                strokeWidth={2.5}
                strokeDasharray={(data) => (data.illiquid ? "5 5" : "0")}
                activeDot={{
                  r: 6,
                  fill: "#3b82f6",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            background: "rgba(245, 158, 11, 0.05)",
            borderRadius: "8px",
            fontSize: "0.8rem",
            color: "#9ca3af",
          }}
        >
          <strong style={{ color: "#f59e0b" }}>Note on Valuation:</strong> The
          illiquidity has now run 14 months (Jun 2025 to Jul 2026). ADA has
          dropped another 40% since our April report, from $0.25 to about
          $0.15. The bigger change is that JPG Store, the main Cardano NFT
          marketplace, closed for good on May 23, 2026, so there is no longer
          anywhere to price or sell these NFTs. Everything shown here is a
          model estimate. What the portfolio could actually be sold for is
          closer to 5-10% of the original investment.
        </div>
      </div>

      {/* ────────────── MARKET INSIGHTS ────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
        }}
      >
        {marketInsights.map((section, idx) => (
          <div key={idx} className="card">
            <h4
              style={{
                marginBottom: "1rem",
                fontSize: "1rem",
                color: "#ffffff",
              }}
            >
              {section.title}
            </h4>

            {section.items.map((item, i) => (
              <div
                key={i}
                style={{
                  marginBottom: i < section.items.length - 1 ? "1rem" : 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span style={{ color: "#9ca3af" }}>{item.label}</span>
                  <span style={{ color: item.color, fontWeight: 500 }}>
                    {item.value}
                  </span>
                </div>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    lineHeight: "1.4",
                  }}
                >
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ────────────── STRATEGIC RECOMMENDATIONS ────────────── */}
      <div className="card" style={{ marginTop: "2rem" }}>
        <h4
          style={{ marginBottom: "1rem", fontSize: "1rem", color: "#ffffff" }}
        >
          Strategic Path Forward
        </h4>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <RecommendationItem
            title="Keep Holding the NFTs"
            description="With JPG Store closed, there is no price at which the NFTs can be sold, so holding them is not really a choice. They are still in your wallet and still yours. They just cannot be sold until the market around them is rebuilt."
            action="HOLD"
            actionColor="#3b82f6"
          />

          <RecommendationItem
            title="Watch for a New Marketplace or OTC Channel"
            description="A recovery for the NFTs depends on a new Cardano marketplace, an aggregator, or a credible OTC desk showing up to create a bid again. We are watching for it. Nothing like that exists today."
            action="MONITOR"
            actionColor="#f59e0b"
          />

          <RecommendationItem
            title="Revise the Premium Floor Downward"
            description="The 35% floor assumed collector demand that never showed up, and the marketplace that would have hosted it has now closed. We are lowering our estimate of what could realistically be recovered to about 5-10% of the original investment."
            action="REVISE"
            actionColor="#ef4444"
          />

          <RecommendationItem
            title="Preserve Remaining Liquidity"
            description="Liquid ADA, cash, and staking income are the only assets we can still move. We will not put them into new positions. Keeping our options open matters more than chasing yield right now."
            action="PRESERVE"
            actionColor="#3b82f6"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ────────────── METRIC BLOCK COMPONENT ──────────────
function MetricBlock({ label, value, subValue, valueColor = "#ffffff" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>{label}</span>
      <span style={{ fontSize: "1.5rem", fontWeight: 600, color: valueColor }}>
        {value}
      </span>
      {subValue && (
        <span
          style={{
            fontSize: "0.75rem",
            color: valueColor,
            marginTop: "-0.25rem",
          }}
        >
          {subValue}
        </span>
      )}
    </div>
  );
}

// ────────────── RECOMMENDATION ITEM COMPONENT ──────────────
function RecommendationItem({ title, description, action, actionColor }) {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#1e293b",
      }}
    >
      {/* Action tag */}
      <div
        style={{
          padding: "1rem 0.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: actionColor,
          color: "#ffffff",
          fontWeight: "600",
          fontSize: "0.75rem",
          width: "90px",
          textAlign: "center",
        }}
      >
        {action}
      </div>

      {/* Content */}
      <div style={{ padding: "0.75rem 1rem" }}>
        <h5
          style={{
            fontSize: "0.9rem",
            fontWeight: 500,
            marginBottom: "0.375rem",
            color: "#ffffff",
          }}
        >
          {title}
        </h5>
        <p
          style={{
            fontSize: "0.8rem",
            color: "#94a3b8",
            lineHeight: "1.4",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
