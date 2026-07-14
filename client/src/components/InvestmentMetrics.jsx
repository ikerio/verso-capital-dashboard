// InvestmentMetrics.jsx - Updated July 2026: 14-month illiquidity crisis, JPG Store closed, Mark-to-Model allocations
import React, { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export default function InvestmentMetrics() {
  // Updated categories reflecting 14-month illiquidity crisis (July 2026)
  const categories = [
    {
      name: "NFT (Illiquid)",
      scores: {
        Allocation: 93, // Proportion increased as ADA holdings lost more value
        Growth: 3, // Near-zero growth potential — marketplace closed
        Stability: 3, // No stability — model floor no longer supportable
        Risk: 99, // Maximum risk — no venue to exit at any price
        Innovation: 55, // Tech still exists but ecosystem infrastructure collapsing
      },
      description:
        "The NFTs have been frozen for 14 months (Jun 2025 to Jul 2026). On May 23, 2026, JPG Store, the main Cardano marketplace, closed for good, so nothing sets a price for them now. We can no longer support the 35% floor and have lowered our realistic estimate to 5-10%.",
      color: "#ef4444",
      status: "CRITICAL",
    },
    {
      name: "Cardano (ADA)",
      scores: {
        Allocation: 2, // ADA holdings diminished further in value
        Growth: 20, // Further reduced — ADA at ~$0.15, down 82% from May 2025
        Stability: 20, // Continued high volatility, new multi-year lows
        Risk: 82, // High risk but at least liquid
        Innovation: 78, // Network development continues despite price
      },
      description:
        "ADA sits near $0.15, down 82% from May 2025 and about 40% since the April report. It is still liquid and tradeable, and it is the only holding we could actually sell. The $0.25 level did not hold once BTC failed to stay above $70k.",
      color: "#f59e0b",
      status: "LIQUID",
    },
    {
      name: "Cash Reserve",
      scores: {
        Allocation: 2, // Held steady while ADA declined around it
        Growth: 5, // Minimal growth
        Stability: 100, // Maximum stability
        Risk: 5, // Minimal risk
        Innovation: 0, // No innovation in cash
      },
      description:
        "Cash reserve at 2%. This is the only genuinely safe part of the portfolio, and it is the buffer that has kept us from being forced to sell NFTs through 14 months of this.",
      color: "#22c55e",
      status: "SAFE",
    },
    {
      name: "Staking Rewards",
      scores: {
        Allocation: 3, // Small but consistent
        Growth: 25, // Yield continues but on a much smaller ADA base value
        Stability: 72, // Reliable but yield on depreciating asset
        Risk: 30, // Low direct risk
        Innovation: 50, // DeFi ecosystem weakened; Cardano TVL ~$130M
      },
      description:
        "Earning about 4.5% APY on staked ADA. The yield is steady, but it is on an asset that has lost 82% of its value, so in dollar terms it does not add up to much anymore.",
      color: "#3b82f6",
      status: "EARNING",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [expandedCategory, setExpandedCategory] = useState(categories[0].name);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCategoryClick = (category) => {
    if (category.name === selectedCategory.name) return;

    setIsExpanded(false);
    setTimeout(() => {
      setSelectedCategory(category);
      setExpandedCategory(category.name);
      setIsExpanded(true);
    }, 250);
  };

  const data = Object.entries(selectedCategory.scores).map(
    ([metric, score]) => ({
      metric,
      score,
    })
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      {/* ILLIQUIDITY WARNING BANNER */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.1))",
          border: "1px solid #ef4444",
          borderRadius: "12px",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ fontSize: "1.5rem" }}>🚨</div>
        <div>
          <h4
            style={{
              color: "#ef4444",
              marginBottom: "0.25rem",
              fontSize: "0.95rem",
            }}
          >
            Critical Liquidity Alert: 93% of Portfolio Frozen, Month 14, No Marketplace
          </h4>
          <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: 0 }}>
            The NFTs cannot be sold, and since May 23, 2026 there is no
            marketplace to sell them into: JPG Store, the main Cardano NFT
            venue, has closed for good. The allocations below come from our
            model, not from prices anyone would actually pay. With the
            marketplace gone, we can no longer support the 35% floor, and our
            realistic estimate of forced-sale value is down to about 5-10% of
            the portfolio.
          </p>
        </div>
      </div>

      {/* CATEGORY SELECTORS */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => handleCategoryClick(category)}
            style={{
              cursor: "pointer",
              flex: "1 1 220px",
              background: "#111827",
              borderRadius: "16px",
              padding: "1rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
              border:
                selectedCategory.name === category.name
                  ? `2px solid ${category.color}`
                  : "1px solid #1f2937",
              transition: "all 0.2s ease",
              position: "relative",
            }}
          >
            {/* Status Badge */}
            <div
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                fontSize: "0.65rem",
                fontWeight: 600,
                padding: "0.2rem 0.4rem",
                borderRadius: "4px",
                background: `${category.color}20`,
                color: category.color,
              }}
            >
              {category.status}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4 style={{ fontSize: "1rem", color: "#f3f4f6" }}>
                {category.name}
              </h4>
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  backgroundColor: "#1f2937",
                  color: category.color,
                  padding: "0.25rem 0.5rem",
                  borderRadius: "999px",
                }}
              >
                {category.scores.Allocation}%
              </span>
            </div>

            {expandedCategory === category.name && (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, height: 0 }}
                animate={
                  isExpanded
                    ? { opacity: 1, height: "auto" }
                    : { opacity: 0, height: 0 }
                }
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    marginTop: "0.75rem",
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                  }}
                >
                  <p>{category.description}</p>

                  <div style={{ marginTop: "0.5rem" }}>
                    <p style={{ margin: "0.25rem 0" }}>
                      <strong>Growth:</strong>{" "}
                      {getScoreDescription(category.scores.Growth, "Growth")}
                    </p>
                    <p style={{ margin: "0.25rem 0" }}>
                      <strong>Risk:</strong>{" "}
                      {getScoreDescription(category.scores.Risk, "Risk")}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* SPIDER CHART PANEL */}
      <div
        style={{
          background: "#111827",
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3
            style={{ color: "#f3f4f6", fontSize: "1rem", marginBottom: "1rem" }}
          >
            {selectedCategory.name} Portfolio Analysis
          </h3>

          <div style={{ width: "100%", maxWidth: "600px", height: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data} outerRadius="80%">
                <PolarGrid stroke="#1f2937" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: "#6b7280", fontSize: 10 }}
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

        <div
          style={{
            color: "#f3f4f6",
            fontSize: "0.875rem",
            paddingLeft: "1rem",
          }}
        >
          <h4 style={{ marginBottom: "0.5rem", color: selectedCategory.color }}>
            Key Insights
          </h4>
          <ul
            style={{
              listStyleType: "disc",
              paddingLeft: "1.25rem",
              color: "#9ca3af",
            }}
          >
            <li>
              <strong>Allocation:</strong> {selectedCategory.scores.Allocation}%
              of portfolio
            </li>
            <li>
              <strong>Growth:</strong>{" "}
              {getScoreDescription(selectedCategory.scores.Growth, "Growth")}
            </li>
            <li>
              <strong>Stability:</strong>{" "}
              {getScoreDescription(
                selectedCategory.scores.Stability,
                "Stability"
              )}
            </li>
            <li>
              <strong>Risk:</strong>{" "}
              {getScoreDescription(selectedCategory.scores.Risk, "Risk")}
            </li>
            <li>
              <strong>Innovation:</strong>{" "}
              {getScoreDescription(
                selectedCategory.scores.Innovation,
                "Innovation"
              )}
            </li>
          </ul>
        </div>

        {/* LIQUIDITY CRISIS CONTEXT */}
        <div
          style={{
            color: "#f3f4f6",
            fontSize: "0.875rem",
            padding: "1rem",
            marginTop: "1rem",
            backgroundColor: selectedCategory.name.includes("NFT")
              ? "rgba(239, 68, 68, 0.1)"
              : "#1f2937",
            borderRadius: "12px",
            borderLeft: `3px solid ${selectedCategory.color}`,
          }}
        >
          <h4
            style={{ marginBottom: "0.75rem", color: selectedCategory.color }}
          >
            {selectedCategory.name.includes("NFT")
              ? "Liquidity Crisis Impact"
              : "Market Context"}
          </h4>
          {selectedCategory.name.includes("NFT") ? (
            <>
              <p style={{ color: "#9ca3af", marginBottom: "0.75rem" }}>
                <strong>June 2025:</strong> NFT volume dropped 97% and the
                crisis began
              </p>
              <p style={{ color: "#9ca3af", marginBottom: "0.75rem" }}>
                <strong>November 2025:</strong> Investor report issued at -69.1%.
                We estimated recovery in 3-6 months
              </p>
              <p style={{ color: "#9ca3af", marginBottom: "0.75rem" }}>
                <strong>May 23, 2026:</strong> JPG Store, the main Cardano NFT
                marketplace, closed for good. The place to sell into stopped
                existing
              </p>
              <p style={{ color: "#9ca3af", marginBottom: "0.75rem" }}>
                <strong>July 2026:</strong> 14 months in, no marketplace. We
                lowered our realistic forced-sale estimate to 5-10%
              </p>
              <p style={{ color: "#ef4444", fontWeight: 500 }}>
                Strategy: we hold because we have to. There is nowhere to sell,
                and a recovery now needs the market itself to be rebuilt. We
                cannot give a timeline.
              </p>
            </>
          ) : (
            <p style={{ color: "#9ca3af" }}>
              {selectedCategory.name === "Cash Reserve"
                ? "This is the buffer that has kept us from being forced to sell through 14 months of crisis. It is the only genuinely safe asset in the portfolio, and protecting it is essential."
                : selectedCategory.name === "Cardano (ADA)"
                ? "ADA sits near $0.15, down 82% from $0.82. It is still liquid and tradeable, and it is the only holding we could actually sell. The network keeps developing, but the price needs the broader market to improve, and so far that improvement has skipped ADA."
                : "Staking pays about 4.5% APY, but on an asset that has lost 82% of its value. In dollar terms the yield is small now, though it is still the only income the portfolio produces."}
            </p>
          )}
        </div>
      </div>

      {/* PORTFOLIO COMPOSITION BREAKDOWN */}
      <div
        style={{
          background: "#111827",
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
        }}
      >
        <h3
          style={{
            color: "#f3f4f6",
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
          }}
        >
          Portfolio Reality Check
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          <div
            style={{
              padding: "1rem",
              background: "rgba(239, 68, 68, 0.1)",
              borderRadius: "8px",
              borderLeft: "3px solid #ef4444",
            }}
          >
            <h5 style={{ color: "#ef4444", marginBottom: "0.5rem" }}>
              Frozen Assets
            </h5>
            <div
              style={{ fontSize: "1.5rem", fontWeight: 600, color: "#ffffff" }}
            >
              93%
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#9ca3af",
                marginTop: "0.25rem",
              }}
            >
              No venue to sell, 14 months frozen
            </p>
          </div>

          <div
            style={{
              padding: "1rem",
              background: "rgba(245, 158, 11, 0.1)",
              borderRadius: "8px",
              borderLeft: "3px solid #f59e0b",
            }}
          >
            <h5 style={{ color: "#f59e0b", marginBottom: "0.5rem" }}>
              Liquid Assets
            </h5>
            <div
              style={{ fontSize: "1.5rem", fontWeight: 600, color: "#ffffff" }}
            >
              4%
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#9ca3af",
                marginTop: "0.25rem",
              }}
            >
              ADA + Cash (further diminished as ADA fell to $0.15)
            </p>
          </div>

          <div
            style={{
              padding: "1rem",
              background: "rgba(34, 197, 94, 0.1)",
              borderRadius: "8px",
              borderLeft: "3px solid #22c55e",
            }}
          >
            <h5 style={{ color: "#22c55e", marginBottom: "0.5rem" }}>
              Income Generating
            </h5>
            <div
              style={{ fontSize: "1.5rem", fontWeight: 600, color: "#ffffff" }}
            >
              3%
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#9ca3af",
                marginTop: "0.25rem",
              }}
            >
              Staking rewards only
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "rgba(245, 158, 11, 0.05)",
            borderRadius: "8px",
            fontSize: "0.85rem",
            color: "#9ca3af",
          }}
        >
          <strong style={{ color: "#f59e0b" }}>Critical Note:</strong> The 93%
          NFT figure is a model valuation (40% ADA price, 30% liquidity
          discount, 30% asset floor). With JPG Store closed since May 23, 2026,
          there is no marketplace to back up the 35% floor, so we no longer
          treat it as reliable. Our realistic estimate of forced-sale value is
          down to about 5-10% of the portfolio, well below what the model
          shows.
        </div>
      </div>
    </motion.div>
  );
}

// Score description helper function
function getScoreDescription(score, metric) {
  if (metric === "Risk") {
    if (score >= 90) return "Critical risk - unable to exit positions";
    if (score >= 75) return "Very high risk exposure";
    if (score >= 60) return "High risk exposure";
    if (score >= 45) return "Moderate risk exposure";
    if (score >= 30) return "Low risk exposure";
    return "Very low risk exposure";
  }

  if (score >= 90) return "Exceptional";
  if (score >= 75) return "Very high";
  if (score >= 60) return "High";
  if (score >= 45) return "Moderate";
  if (score >= 30) return "Below average";
  if (score >= 15) return "Low";
  return "Critically impaired";
}
