// FearGreedIndex.jsx - Updated July 2026: sentiment recovered to Neutral, ADA/NFTs left behind
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Clock,
  AlertTriangle,
  BarChart,
  ChevronUp,
  ChevronDown,
  Bookmark,
  Calendar,
  TrendingDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";

export default function FearGreedIndex() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isGaugeAnimated, setIsGaugeAnimated] = useState(false);

  // Trigger gauge animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGaugeAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Current date - July 14, 2026 (noon anchor avoids UTC-parse rolling back a day)
  const currentDate = new Date("2026-07-14T12:00:00");
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(currentDate);

  // Market data - Updated for July 2026: broad sentiment recovered to Neutral
  const data = {
    current: {
      score: 48, // Neutral
      label: "Neutral",
      change: +18, // Recovered sharply from ~30 last week
      date: formattedDate,
    },
    history: {
      recently: { score: 44, label: "Neutral" },
      lastWeek: { score: 30, label: "Fear" },
      lastMonth: { score: 15, label: "Extreme Fear" }, // mid-June was still deep fear
    },
    extremes: {
      high: { score: 88, label: "Extreme Greed", date: "Oct 5, 2025" }, // Pre-crash peak
      low: { score: 5, label: "Extreme Fear", date: "Feb 6, 2026" }, // ALL-TIME HISTORIC LOW
    },
    // Full historical data from May 2025 through July 2026
    chartData: [
      { date: "May 25", score: 58, label: "Greed" },
      { date: "Jul 25", score: 45, label: "Neutral" },
      { date: "Sep", score: 71, label: "Greed" },
      { date: "Oct 25", score: 85, label: "Extreme Greed" },
      { date: "Nov", score: 19, label: "Extreme Fear" },
      { date: "Dec", score: 22, label: "Extreme Fear" },
      { date: "Jan 26", score: 26, label: "Fear" },
      { date: "Feb 6", score: 5, label: "Extreme Fear" }, // ALL-TIME LOW
      { date: "Mar", score: 12, label: "Extreme Fear" },
      { date: "Apr", score: 15, label: "Extreme Fear" },
      { date: "May", score: 18, label: "Extreme Fear" },
      { date: "Jun", score: 16, label: "Extreme Fear" },
      { date: "Jul 1", score: 15, label: "Extreme Fear" },
      { date: "Jul 14", score: 48, label: "Neutral" }, // Current
    ],
    // Detailed last ~60 days showing the recovery off the bottom
    lastMonth: [
      { day: "May 23", score: 16 }, // JPG Store shutdown — deep fear
      { day: "Jun 1", score: 17 },
      { day: "Jun 9", score: 15 },
      { day: "Jun 20", score: 18 },
      { day: "Jul 1", score: 15 }, // early-July re-test of extreme fear
      { day: "Jul 5", score: 22 },
      { day: "Jul 8", score: 31 },
      { day: "Jul 11", score: 41 },
      { day: "Jul 14", score: 48 }, // Current — Neutral
    ],
  };

  // Get sentiment color based on score
  const getSentimentColor = (score) => {
    if (score >= 75) return "#22c55e"; // Extreme Greed
    if (score >= 60) return "#4ade80"; // Greed
    if (score >= 45) return "#facc15"; // Neutral
    if (score >= 35) return "#f59e0b"; // Neutral-Fear
    if (score >= 25) return "#f97316"; // Fear
    if (score >= 10) return "#ef4444"; // Extreme Fear
    return "#dc2626"; // Panic
  };

  // Get label based on score
  const getSentimentLabel = (score) => {
    if (score >= 75) return "Extreme Greed";
    if (score >= 60) return "Greed";
    if (score >= 45) return "Neutral";
    if (score >= 35) return "Neutral";
    if (score >= 25) return "Fear";
    if (score >= 10) return "Extreme Fear";
    return "Panic";
  };

  // Calculate needle position angle for gauge
  const calculateRotation = (score) => {
    return -90 + score * 1.8;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const score = payload[0].value;
      return (
        <div
          style={{
            background: "#1f2937",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            color: "white",
            fontSize: "0.875rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ color: getSentimentColor(score), fontWeight: 600 }}>
            {getSentimentLabel(score)}
          </div>
          <div style={{ marginTop: "0.5rem" }}>
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
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      {/* Main Card with Gauge */}
      <section style={cardStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <AlertTriangle
              size={18}
              style={{ color: "#ef4444", marginRight: "0.75rem" }}
            />
            <h2 style={titleStyle}>Fear & Greed Index</h2>
            {/* Sentiment Badge */}
            <span
              style={{
                marginLeft: "1rem",
                fontSize: "0.75rem",
                padding: "0.25rem 0.5rem",
                background: "rgba(250, 204, 21, 0.1)",
                color: "#facc15",
                borderRadius: "4px",
                fontWeight: 600,
              }}
            >
              SENTIMENT: NEUTRAL
            </span>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {["overview", "history"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  cursor: "pointer",
                  color: activeTab === tab ? "#3b82f6" : "#6b7280",
                  fontWeight: activeTab === tab ? 600 : 400,
                  fontSize: "0.875rem",
                  textTransform: "capitalize",
                  background: "transparent",
                  border: "none",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  ...(activeTab === tab
                    ? {
                        background: "rgba(59, 130, 246, 0.1)",
                      }
                    : {}),
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "overview" ? (
          <>
            {/* Market Sentiment Note */}
            <div
              style={{
                background: "rgba(250, 204, 21, 0.08)",
                border: "1px solid rgba(250, 204, 21, 0.3)",
                borderRadius: "8px",
                padding: "0.75rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <TrendingUp size={20} style={{ color: "#facc15" }} />
              <div>
                <div
                  style={{
                    color: "#facc15",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  Sentiment Recovered to Neutral, but ADA and NFTs Got Left Behind
                </div>
                <div
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.8rem",
                    marginTop: "0.25rem",
                  }}
                >
                  Overall crypto sentiment has climbed from February's low of 5
                  to Neutral (48) by mid-July. That is good for the market as a
                  whole, but it did not reach Cardano. ADA made new lows near
                  $0.15, and after JPG Store closed on May 23, the NFTs have no
                  marketplace to recover into.
                </div>
              </div>
            </div>

            {/* Date Display */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.875rem",
                color: "#9ca3af",
                marginBottom: "1.5rem",
              }}
            >
              <Calendar size={14} style={{ marginRight: "0.5rem" }} />
              <span>Last updated: {data.current.date}</span>
            </div>

            {/* Gauge Visualization */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "200px",
                  marginBottom: "0.5rem",
                }}
              >
                <svg viewBox="0 0 200 120">
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient
                      id="gauge-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#dc2626" />
                      <stop offset="15%" stopColor="#ef4444" />
                      <stop offset="30%" stopColor="#f97316" />
                      <stop offset="50%" stopColor="#facc15" />
                      <stop offset="70%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>

                    {/* Shadow filter for the needle */}
                    <filter
                      id="needle-shadow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="2"
                        stdDeviation="2"
                        floodOpacity="0.3"
                      />
                    </filter>
                  </defs>

                  {/* Gauge background */}
                  <path
                    d="M10,110 A90,90 0 0,1 190,110"
                    fill="none"
                    stroke="url(#gauge-gradient)"
                    strokeWidth="22"
                    strokeLinecap="round"
                  />

                  {/* Danger zone highlight */}
                  <path
                    d="M10,110 A90,90 0 0,1 50,50"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="24"
                    strokeLinecap="round"
                    opacity="0.3"
                    strokeDasharray="2 2"
                  />

                  {/* Gauge labels */}
                  <text
                    x="5"
                    y="120"
                    fontSize="11"
                    fill="#dc2626"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    0
                  </text>
                  <text
                    x="50"
                    y="75"
                    fontSize="11"
                    fill="#f97316"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    25
                  </text>
                  <text
                    x="100"
                    y="50"
                    fontSize="11"
                    fill="#facc15"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    50
                  </text>
                  <text
                    x="150"
                    y="75"
                    fontSize="11"
                    fill="#4ade80"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    75
                  </text>
                  <text
                    x="195"
                    y="120"
                    fontSize="11"
                    fill="#22c55e"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    100
                  </text>

                  {/* Animated Needle */}
                  <g
                    transform={`rotate(${
                      isGaugeAnimated
                        ? calculateRotation(data.current.score)
                        : -90
                    }, 100, 110)`}
                    style={{
                      transition:
                        "transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      filter: "url(#needle-shadow)",
                    }}
                  >
                    <line
                      x1="100"
                      y1="110"
                      x2="100"
                      y2="30"
                      stroke={getSentimentColor(data.current.score)}
                      strokeWidth="3"
                    />
                    <circle
                      cx="100"
                      cy="110"
                      r="8"
                      fill={getSentimentColor(data.current.score)}
                    />
                  </g>

                  {/* Current Sentiment Label */}
                  <text
                    x="100"
                    y="140"
                    fontSize="14"
                    fill={getSentimentColor(data.current.score)}
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    {data.current.label.toUpperCase()}
                  </text>
                </svg>
              </div>
            </div>

            {/* Score Display */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "2rem",
                position: "relative",
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                style={{
                  fontSize: "4.5rem",
                  fontWeight: 700,
                  color: getSentimentColor(data.current.score),
                  marginRight: "1.5rem",
                  lineHeight: 1,
                  textShadow: "0 0 20px rgba(239, 68, 68, 0.3)",
                }}
              >
                {data.current.score}
              </motion.div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: getSentimentColor(data.current.score),
                  }}
                >
                  {data.current.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: data.current.change >= 0 ? "#f59e0b" : "#ef4444",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  }}
                >
                  {data.current.change >= 0 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  <span>
                    {Math.abs(data.current.change)} points from last week
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Historical Comparison */}
            <div>
              <h4
                style={{
                  ...subtitleStyle,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#e2e8f0",
                  marginBottom: "1rem",
                }}
              >
                <Clock
                  size={16}
                  style={{ marginRight: "0.5rem", color: "#3b82f6" }}
                />
                Historical Sentiment
              </h4>
              <div
                style={{
                  ...gridStyle,
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                }}
              >
                {Object.entries(data.history).map(([period, info]) => (
                  <motion.div
                    key={period}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay:
                        Object.keys(data.history).indexOf(period) * 0.1 + 1.2,
                    }}
                    style={{
                      ...infoCardStyle,
                      borderTop: `3px solid ${getSentimentColor(info.score)}`,
                      padding: "1rem 1.25rem",
                    }}
                  >
                    <h5
                      style={{
                        fontSize: "0.875rem",
                        color: "#9ca3af",
                        marginBottom: "0.5rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {period.replace(/([a-z])([A-Z])/g, "$1 $2")}
                    </h5>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        color: getSentimentColor(info.score),
                      }}
                    >
                      {info.score}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: getSentimentColor(info.score),
                      }}
                    >
                      {info.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Extremes Section */}
            <div style={{ marginTop: "1.5rem" }}>
              <h4
                style={{
                  ...subtitleStyle,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#e2e8f0",
                  marginBottom: "1rem",
                }}
              >
                <Bookmark
                  size={16}
                  style={{ marginRight: "0.5rem", color: "#3b82f6" }}
                />
                Recent Extremes
              </h4>
              <div
                style={{
                  ...gridStyle,
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                }}
              >
                {Object.entries(data.extremes).map(([key, info]) => (
                  <motion.div
                    key={key}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay:
                        Object.keys(data.extremes).indexOf(key) * 0.1 + 1.4,
                    }}
                    style={{
                      ...infoCardStyle,
                      borderLeft: `3px solid ${getSentimentColor(info.score)}`,
                      padding: "1rem 1.25rem",
                    }}
                  >
                    <h5
                      style={{
                        fontSize: "0.875rem",
                        color: "#9ca3af",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {key === "high" ? "Recent High" : "Recent Low"}
                    </h5>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        color: getSentimentColor(info.score),
                      }}
                    >
                      {info.score}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: getSentimentColor(info.score),
                      }}
                    >
                      {info.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        marginTop: "0.35rem",
                      }}
                    >
                      {info.date}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* History Tab Content */}
            <div>
              <h4
                style={{
                  ...subtitleStyle,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#e2e8f0",
                  marginBottom: "1rem",
                }}
              >
                <TrendingUp
                  size={16}
                  style={{ marginRight: "0.5rem", color: "#3b82f6" }}
                />
                Fear & Greed: May 2025 – July 2026
              </h4>

              <div style={{ height: "300px", marginBottom: "2rem" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.chartData}>
                    <defs>
                      <linearGradient
                        id="colorGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ef4444"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="date"
                      stroke="#9ca3af"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      domain={[0, 100]}
                      stroke="#9ca3af"
                      ticks={[0, 20, 40, 60, 80, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine
                      y={50}
                      stroke="#facc15"
                      strokeDasharray="3 3"
                    />
                    <ReferenceLine
                      y={25}
                      stroke="#ef4444"
                      strokeDasharray="3 3"
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#ef4444"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <h4
                style={{
                  ...subtitleStyle,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#e2e8f0",
                  marginBottom: "1rem",
                }}
              >
                <BarChart
                  size={16}
                  style={{ marginRight: "0.5rem", color: "#3b82f6" }}
                />
                The Recovery Off the Bottom (May – Jul 2026)
              </h4>

              <div style={{ height: "220px", marginBottom: "1.5rem" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.lastMonth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="day"
                      stroke="#9ca3af"
                      angle={-45}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis
                      domain={[0, 100]}
                      stroke="#9ca3af"
                      ticks={[0, 20, 40, 60, 80, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine
                      y={25}
                      stroke="#ef4444"
                      strokeDasharray="3 3"
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#ef4444"
                      strokeWidth={2.5}
                      dot={{
                        stroke: "#ef4444",
                        strokeWidth: 2,
                        r: 4,
                        fill: "#111827",
                      }}
                      activeDot={{
                        stroke: "#ef4444",
                        strokeWidth: 2,
                        r: 6,
                        fill: "#ef4444",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div
                style={{
                  ...infoCardStyle,
                  borderLeft: "3px solid #ef4444",
                  padding: "1.25rem",
                }}
              >
                <h4
                  style={{
                    fontSize: "0.95rem",
                    color: "#f3f4f6",
                    marginBottom: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  Sentiment Analysis: Recovery Off a Historic Bottom
                </h4>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#9ca3af",
                    lineHeight: "1.6",
                  }}
                >
                  The crypto market went through the longest stretch of Extreme
                  Fear in the index's history. It crashed from 85 (Extreme
                  Greed) in October 2025 to an all-time low of 5 on February 6,
                  2026, which was worse than Terra/Luna (6), the COVID crash
                  (8), and the FTX collapse (10). It stayed near the bottom
                  through the spring, dipped back to about 15 in early July,
                  then jumped to Neutral (48) by mid-July as Bitcoin steadied.
                  None of that recovery reached Cardano, though. ADA made new
                  lows near $0.15 and its NFT marketplace closed in May. The
                  overall mood can improve while one corner of the market keeps
                  sinking.
                </p>
              </div>
            </div>
          </>
        )}
      </section>

      {/* What This Means */}
      <section style={cardStyle}>
        <h4
          style={{
            ...subtitleStyle,
            display: "flex",
            alignItems: "center",
            fontSize: "1rem",
            fontWeight: 600,
            color: "#e2e8f0",
            marginBottom: "1rem",
          }}
        >
          <BarChart
            size={16}
            style={{ marginRight: "0.5rem", color: "#3b82f6" }}
          />
          Market Implications for Your Portfolio
        </h4>

        <div
          style={{
            ...infoCardStyle,
            padding: "1.25rem",
            borderLeft: "3px solid #ef4444",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <h5
                style={{
                  color: "#f3f4f6",
                  marginBottom: "0.5rem",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                }}
              >
                Current Market Sentiment: NEUTRAL (48)
              </h5>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#9ca3af",
                  lineHeight: "1.6",
                }}
              >
                Overall crypto sentiment is back to{" "}
                <strong style={{ color: "#facc15" }}>Neutral</strong> at 48, up
                sharply from about 15 in early July and far above the all-time
                low of 5 on February 6, 2026. This is a real improvement across
                the market. It has not reached our holdings, though. ADA sits
                near $0.15 (down 82% from May 2025), and after JPG Store closed
                on May 23, the Cardano NFT market has no venue to recover into
                after 14 months frozen.
              </p>
            </div>

            <div>
              <h5
                style={{
                  color: "#f3f4f6",
                  marginBottom: "0.5rem",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                }}
              >
                Portfolio Impact
              </h5>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#9ca3af",
                  lineHeight: "1.6",
                }}
              >
                Your portfolio is down about 78% after 14 months of extreme
                conditions. With more than 90% of it stuck in NFTs that now
                have no marketplace to sell into, and ADA at multi-year lows,
                it has not shared in the market's recovery. The takeaway this
                quarter is simple: a broad improvement in sentiment does not
                automatically reach every asset, and Cardano and its NFTs were
                left behind.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              ...infoCardStyle,
              borderTop: "3px solid #22c55e",
              padding: "1.25rem",
            }}
          >
            <h5
              style={{
                color: "#22c55e",
                marginBottom: "0.75rem",
                fontSize: "0.95rem",
                fontWeight: 500,
              }}
            >
              Constructive Signs
            </h5>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.25rem",
                color: "#9ca3af",
                fontSize: "0.875rem",
                lineHeight: "1.6",
              }}
            >
              <li>The index recovered to Neutral (48) from February's all-time low of 5</li>
              <li>Bitcoin steadied in the $58-62k area after failing to hold $70k</li>
              <li>The broad panic across the market has clearly eased</li>
              <li>Sentiment usually has to recover before prices do</li>
            </ul>
          </div>

          <div
            style={{
              ...infoCardStyle,
              borderTop: "3px solid #ef4444",
              padding: "1.25rem",
            }}
          >
            <h5
              style={{
                color: "#ef4444",
                marginBottom: "0.75rem",
                fontSize: "0.95rem",
                fontWeight: 500,
              }}
            >
              Current Risks
            </h5>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.25rem",
                color: "#9ca3af",
                fontSize: "0.875rem",
                lineHeight: "1.6",
              }}
            >
              <li>The sentiment recovery skipped ADA and the NFTs completely</li>
              <li>The Cardano NFT market has no marketplace after JPG Store closed</li>
              <li>ADA is near $0.15 with no clear catalyst, and the BTC rotation stalled</li>
              <li>A neutral index does not bring back a market that no longer exists</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "rgba(245, 158, 11, 0.1)",
            borderRadius: "8px",
            borderLeft: "3px solid #f59e0b",
          }}
        >
          <h5
            style={{
              color: "#f59e0b",
              marginBottom: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            Strategic Recommendation
          </h5>
          <p
            style={{ fontSize: "0.85rem", color: "#9ca3af", lineHeight: "1.5" }}
          >
            The recovery in overall sentiment is welcome, but it does not
            change our main problem. After JPG Store closed, there is no venue
            to sell the NFTs into at any price, and ADA is at multi-year lows.
            Selling now would lock in catastrophic losses. So we keep holding
            because we have to, and we protect the liquid assets we have left.
            The thing we are watching for has changed, from whether Bitcoin
            holds $70k to whether a working marketplace comes back. We still
            cannot put a date on recovery.
          </p>
        </div>
      </section>
    </motion.div>
  );
}

// Styles
const cardStyle = {
  background: "#111827",
  borderRadius: "20px",
  padding: "1.75rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "1rem",
};

const infoCardStyle = {
  background: "#1f2937",
  borderRadius: "12px",
  padding: "1rem",
  boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
};

const titleStyle = {
  fontSize: "1.35rem",
  fontWeight: 600,
  color: "#f9fafb",
};

const subtitleStyle = {
  fontSize: "1rem",
  fontWeight: 500,
  color: "#93c5fd",
  marginBottom: "0.75rem",
  display: "flex",
  alignItems: "center",
};
