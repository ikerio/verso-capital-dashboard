// PerformanceChart.jsx — updated July 2026: 14-month illiquidity, JPG Store shutdown
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
} from "recharts";

export default function PerformanceChart() {
  const [hoveredData, setHoveredData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [activePeriod, setActivePeriod] = useState("All Time");

  // Enhanced dataset including the "Valley of Uncertainty" period
  const fullData = [
    {
      period: "Initial",
      quarter: "",
      value: 100,
      event: "Initial Investment",
      detail:
        "Starting point of capital allocation with diversified positions across core cryptocurrencies, NFTs, and staking positions.",
      yearEnd: null,
      technicalAnalysis: null,
      fundamentalInsights:
        "Initial allocation strategy focused on balancing growth potential with risk management through position sizing and asset selection.",
      keyEvents: null,
      riskAssessment:
        "Balanced risk profile with primary exposure to blue-chip crypto assets.",
      recommendations: null,
    },
    {
      period: "Y1",
      quarter: "Q1",
      value: 20,
      event: "FTX Collapse",
      detail:
        "Portfolio suffered significant drawdown during the FTX collapse and subsequent market contagion.",
      yearEnd: null,
      technicalAnalysis:
        "Market experienced major support level breakdown with multiple death crosses on daily and weekly timeframes.",
      fundamentalInsights:
        "Systemic risk exposure highlighted the importance of self-custody and platform diversification.",
      keyEvents:
        "FTX bankruptcy filing on Nov 11, Alameda Research insolvency revealed, and widespread exchange withdrawals triggering liquidity crises across the industry.",
      riskAssessment:
        "High market-wide counterparty risk with cascading liquidations affecting even fundamentally sound projects.",
      recommendations:
        "Focus on capital preservation, increase stablecoin allocations, and prioritize assets held in cold storage.",
    },
    {
      period: "Y1",
      quarter: "Q2",
      value: 45,
      event: "Partial Recovery",
      detail:
        "Strategic portfolio restructuring and selective buying opportunities during market lows allowed for partial recovery.",
      yearEnd: null,
      technicalAnalysis:
        "Initial accumulation phase with higher lows forming on Bitcoin dominance chart, suggesting rotation back into crypto majors.",
      fundamentalInsights:
        "Core infrastructure projects continued development despite market turmoil, creating value disconnects between price and progress.",
      keyEvents:
        "Regulatory clarity initiatives began taking shape across multiple jurisdictions, providing early signs of institutional re-engagement.",
      riskAssessment:
        "Reduced systemic risk as weaker projects and overleveraged entities were cleared from the ecosystem.",
      recommendations:
        "Begin strategic re-entry into oversold quality assets while maintaining higher-than-normal cash reserves.",
    },
    {
      period: "Y1",
      quarter: "Q3",
      value: 50,
      event: "Market Stabilization",
      detail:
        "Volatility declined as market found equilibrium and trading ranges established across major assets.",
      yearEnd: null,
      technicalAnalysis:
        "Bitcoin establishing strong support at the 200-week moving average, historically a key accumulation zone.",
      fundamentalInsights:
        "On-chain metrics showed increasing accumulation by long-term holders while short-term speculators were largely flushed out.",
      keyEvents:
        "Major protocol upgrades across Ethereum and Cardano ecosystems improved scalability and attracted renewed developer interest.",
      riskAssessment:
        "Moderate risk environment with potential for range-bound trading to continue as market heals.",
      recommendations:
        "Continue dollar-cost averaging into core positions and begin exploring staking opportunities for yield generation.",
    },
    {
      period: "Y1",
      quarter: "Q4",
      value: 60,
      event: "Year-End Position",
      detail:
        "60% of initial capital recovered through strategic rebalancing and market recovery.",
      yearEnd: 60,
      technicalAnalysis:
        "Bitcoin and Ethereum both reclaimed key moving averages, with Cardano showing particularly strong relative strength.",
      fundamentalInsights:
        "Major crypto projects continued shipping updates, with network activity metrics gradually recovering despite lower asset prices.",
      keyEvents:
        "Institutional investment began cautiously returning with several public companies adding small Bitcoin positions to their treasuries.",
      riskAssessment:
        "Reduced systemic risk but continued volatility likely in the mid-term as the market processes macroeconomic headwinds.",
      recommendations:
        "Maintain balanced exposure with focus on quality projects demonstrating real-world adoption and strong tokenomics.",
    },
    {
      period: "Y2",
      quarter: "Q1",
      value: 55,
      event: "Mild Dip",
      detail:
        "Temporary retracement due to broader market uncertainty and profit-taking.",
      yearEnd: null,
      technicalAnalysis:
        "Higher low compared to previous market bottom, indicating strengthening technicals despite short-term weakness.",
      fundamentalInsights:
        "Developer activity reaching all-time highs across major blockchains, particularly in Cardano's ecosystem as DeFi projects expanded.",
      keyEvents:
        "Federal Reserve hawkish stance on interest rates created headwinds for risk assets, including the crypto sector.",
      riskAssessment:
        "Moderate short-term volatility but improving long-term outlook as fundamentals continued to strengthen.",
      recommendations:
        "Use dips to add to core positions, particularly focusing on projects with growing adoption metrics.",
    },
    {
      period: "Y2",
      quarter: "Q2",
      value: 65,
      event: "Uptrend",
      detail:
        "Regained momentum with sustainable growth patterns across multiple sectors.",
      yearEnd: null,
      technicalAnalysis:
        "Bitcoin successfully tested previous resistance turned support, establishing a solid foundation for continued upward movement.",
      fundamentalInsights:
        "NFT market showing signs of maturation beyond pure speculation with more utility-focused projects gaining traction.",
      keyEvents:
        "Several major institutional players launched crypto custody services, signaling growing mainstream acceptance.",
      riskAssessment:
        "Improving risk-reward profile as technical structure strengthened and new capital entered the market.",
      recommendations:
        "Increase exposure to Cardano ecosystem projects showing strong fundamentals and user growth.",
    },
    {
      period: "Y2",
      quarter: "Q3",
      value: 75,
      event: "Growth Phase",
      detail:
        "Consistent upward trend across portfolio assets, led by layer-1 ecosystem growth.",
      yearEnd: null,
      technicalAnalysis:
        "Most major assets broke out of long-term downtrend lines, with increasing volume supporting price movements.",
      fundamentalInsights:
        "Cardano network transactions reached new all-time highs, indicating growing adoption and usage.",
      keyEvents:
        "Major partnerships announced between blockchain projects and traditional finance players, expanding real-world use cases.",
      riskAssessment:
        "Reduced downside risk as market structure improved, though potential for overheating in certain sectors required monitoring.",
      recommendations:
        "Begin taking partial profits on significantly appreciated positions while maintaining core holdings in quality assets.",
    },
    {
      period: "Y2",
      quarter: "Q4",
      value: 95,
      event: "Recovery Complete",
      detail:
        "Nearly full return to initial investment value, signaling successful portfolio management through the bear market.",
      yearEnd: 95,
      technicalAnalysis:
        "Bitcoin reclaimed key psychological level of $30,000, triggering cascade of technical breakouts across the market.",
      fundamentalInsights:
        "Total value locked (TVL) in DeFi protocols showing healthy growth, particularly in the Cardano ecosystem as it matured.",
      keyEvents:
        "Regulatory clarity improved in multiple jurisdictions, removing uncertainty that had previously constrained institutional adoption.",
      riskAssessment:
        "Balanced risk profile with strong technical structure, though monitoring for signs of excessive leverage remained important.",
      recommendations:
        "Maintain current allocation with selective rebalancing to ensure risk remains distributed appropriately across the portfolio.",
    },
    {
      period: "Y3",
      quarter: "Q1",
      value: 105,
      event: "Surpass Initial",
      detail:
        "Portfolio value exceeded initial investment for the first time since the market downturn.",
      yearEnd: null,
      technicalAnalysis:
        "Altcoin season beginning with Cardano leading the performance among top 10 cryptocurrencies.",
      fundamentalInsights:
        "ADA staking participation rate reached 75%, indicating strong holder conviction and reduced circulating supply.",
      keyEvents:
        "Major protocol upgrade for Cardano implemented successfully, increasing transaction throughput and reducing fees.",
      riskAssessment:
        "Positive risk-reward profile with strong fundamentals supporting continued upside potential.",
      recommendations:
        "Maintain core position in ADA while exploring opportunities in the growing Cardano DeFi ecosystem.",
    },
    {
      period: "Y3",
      quarter: "Q2",
      value: 75,
      event: "Market Correction",
      detail:
        "Portfolio declined to 75% (-25%) as ADA price fell from $1.20 to $0.82 in May 2025, marking the start of a liquidity crisis.",
      yearEnd: null,
      technicalAnalysis:
        "Breaking below 100-day moving average on declining volume, suggesting lack of buying interest rather than active selling.",
      fundamentalInsights:
        "NFT trading volume began showing concerning signs with daily volumes dropping below $100k on major Cardano marketplaces.",
      keyEvents:
        "Early signs of US-China trade tensions emerged, creating risk-off sentiment across global markets including crypto.",
      riskAssessment:
        "Elevated risk as market structure deteriorated, with particular concern about NFT market liquidity drying up.",
      recommendations:
        "Increase cash reserves and prepare for potential extended period of market weakness.",
    },

    // The "Valley of Uncertainty" - June to November 2025
    {
      period: "Y3",
      quarter: "Jun",
      value: 65,
      event: "Liquidity Collapse",
      detail:
        "NFT market volume collapsed 97% from peak. Despite ADA dropping to $0.625, portfolio valued using Mark-to-Model approach as no real market existed.",
      yearEnd: null,
      markToModel: true,
      illiquidPeriod: true,
      technicalAnalysis:
        "Complete breakdown of NFT market microstructure with bid-ask spreads widening to 60-70%, making price discovery impossible.",
      fundamentalInsights:
        "JPG Store daily volume dropped to under $10k with only 100-200 active wallets, insufficient for any meaningful portfolio exits.",
      keyEvents:
        "Cardano NFT volume dropped from $1B annually to $50M, representing a 95% decline. Major NFT lending protocols shut down.",
      riskAssessment:
        "CRITICAL: Zero market liquidity means any attempted exit would require 60-70% discounts to floor prices.",
      recommendations:
        "HOLD all positions. Any sales at current liquidity levels would result in catastrophic losses. Wait for market recovery.",
      marketContext:
        "While ADA price was $0.625, NFT values completely decoupled from underlying token due to absence of buyers.",
    },
    {
      period: "Y3",
      quarter: "Jul",
      value: 62,
      event: "False Recovery Signal",
      detail:
        "ADA price increased to $0.734 but NFT market remained frozen. Portfolio continued declining as illiquidity discount deepened.",
      yearEnd: null,
      markToModel: true,
      illiquidPeriod: true,
      technicalAnalysis:
        "ADA price recovery not reflected in NFT values due to complete absence of market makers and collectors.",
      fundamentalInsights:
        "NFT sales in July hit $574M globally but Cardano captured less than 1% due to ecosystem-specific challenges.",
      keyEvents:
        "Despite some chains seeing NFT recovery, Cardano NFT daily volume remained under $8k with no improvement in market depth.",
      riskAssessment:
        "Extreme illiquidity risk. Premium collections would require 70% discounts for immediate sales.",
      recommendations:
        "Continue holding. Market conditions do not support fair value realization.",
      marketContext:
        "The divergence between ADA price ($0.734) and NFT values widened as speculators avoided illiquid assets.",
    },
    {
      period: "Y3",
      quarter: "Aug",
      value: 58,
      event: "Peak Divergence",
      detail:
        'ADA reached $0.925 (+13% from May) but portfolio value declined further. The "phantom recovery" - prices up but no volume to realize gains.',
      yearEnd: null,
      markToModel: true,
      illiquidPeriod: true,
      technicalAnalysis:
        "Classic liquidity trap: asset prices recovering on paper but zero market depth prevents any realization of gains.",
      fundamentalInsights:
        "The cruel irony: ADA price suggested recovery but NFT holders faced worst liquidity conditions in Cardano history.",
      keyEvents:
        "Major NFT platforms like X2Y2 shut down, GameStop exited NFTs, signaling broader ecosystem challenges beyond just Cardano.",
      riskAssessment:
        "Maximum divergence between paper gains (ADA up) and realizable value (NFTs down 80% if sold).",
      recommendations:
        "DO NOT attempt to sell into phantom recovery. No real buyers exist at these levels.",
      marketContext:
        'This month proved the thesis: "We didn\'t miss the exit - there was no exit." ADA at $0.925 meant nothing without NFT liquidity.',
    },
    {
      period: "Y3",
      quarter: "Sep",
      value: 52,
      event: "Reality Sets In",
      detail:
        "ADA declined to $0.889 and portfolio marked down further as even OTC buyers disappeared from the market.",
      yearEnd: null,
      markToModel: true,
      illiquidPeriod: true,
      technicalAnalysis:
        "Complete capitulation in NFT markets with even blue-chip collections seeing no bids at 50% below floor prices.",
      fundamentalInsights:
        'Cardano NFT ecosystem entered "survival mode" with only core believers remaining, all speculative capital had fled.',
      keyEvents:
        "NFT lending market completely collapsed from $1B to $50M globally, with Cardano NFT lending essentially going to zero.",
      riskAssessment:
        "Extreme systemic risk in NFT sector. Even premium assets unmarketable except at distressed prices.",
      recommendations:
        "Preservation mode: Hold all assets, maintain liquidity reserves, wait for market structure to rebuild.",
      marketContext:
        "September marked acceptance that this wasn't a dip but a structural breakdown of the NFT market.",
    },
    {
      period: "Y3",
      quarter: "Oct",
      value: 48,
      event: "Continued Deterioration",
      detail:
        "ADA at $0.70 and NFT market conditions worsened. Mark-to-Model valuation adjusted downward on zero volume environment.",
      yearEnd: null,
      markToModel: true,
      illiquidPeriod: true,
      technicalAnalysis:
        "No technical analysis possible in zero-volume market. Price discovery mechanism completely broken.",
      fundamentalInsights:
        "Only 116 active wallets on JPG Store with $7.8k daily volume - less than a single NFT sale from 2021 peaks.",
      keyEvents:
        "US-China trade war escalation added macro pressure, pushing all risk assets lower including already-damaged NFT sector.",
      riskAssessment:
        "Portfolio effectively frozen. No viable exit strategy exists at any reasonable price level.",
      recommendations:
        "Continue preservation strategy. Market will eventually recover but timing impossible to predict.",
      marketContext:
        "October confirmed the new reality: NFT market needed complete restructuring before recovery possible.",
    },
    {
      period: "Y3",
      quarter: "Nov",
      value: 31,
      event: "November Report",
      detail:
        "ADA at $0.405 (-50.7% from May). Portfolio at 30.9% using Mark-to-Model. Investor report issued acknowledging -69.1% loss.",
      yearEnd: null,
      markToModel: true,
      illiquidPeriod: true,
      technicalAnalysis:
        "Six months of nearly zero NFT volume with no historical comparison. Market microstructure completely broken.",
      fundamentalInsights:
        "Despite 97% volume collapse, premium NFT assets retain theoretical value of 35-40% when presented to serious collectors via private sales.",
      keyEvents:
        "Investor report issued. JPG Store at $7.8k daily volume, broader Cardano NFT ecosystem in deepest liquidity crisis ever recorded.",
      riskAssessment:
        "Risk paradox: Extreme short-term risk (illiquid) but potentially asymmetric long-term opportunity (oversold).",
      recommendations:
        "HOLD through the valley. Recovery estimated at 3-6 months based on historical patterns.",
      marketContext:
        "November 2025: The portfolio came through a perfect storm, with ADA down 51% and NFT volume down 97%. Just surviving it counts for something.",
    },
    {
      period: "Y3",
      quarter: "Dec",
      value: 28,
      event: "Continued Decline",
      detail:
        "ADA fell to $0.33 (-18% from November). Broader crypto market continued deteriorating with BTC sliding below $80k territory. No improvement in NFT liquidity.",
      yearEnd: 28,
      markToModel: true,
      illiquidPeriod: true,
      technicalAnalysis:
        "ADA broke below $0.35 support with no meaningful buying volume. Technical indicators uniformly bearish across all timeframes.",
      fundamentalInsights:
        "Cardano development activity continued but market completely disconnected from fundamentals. NFT marketplace activity near zero.",
      keyEvents:
        "Year-end selling pressure across crypto markets. Institutional outflows accelerated as funds closed year-end positions.",
      riskAssessment:
        "Portfolio continues deteriorating. The 3-6 month recovery thesis from November is being tested as conditions worsen rather than improve.",
      recommendations:
        "Continue preservation strategy. No market conditions exist that would allow exits at reasonable valuations.",
      marketContext:
        "December 2025: The bear market deepened heading into year-end, dashing hopes for a Santa rally in crypto markets.",
    },
    {
      period: "Y4",
      quarter: "Jan",
      value: 27,
      event: "New Year, Same Crisis",
      detail:
        "ADA at $0.29 as 2026 opened with continued selling pressure. Portfolio now at 26.7%. NFT market remained completely frozen entering its 8th month of illiquidity.",
      yearEnd: null,
      markToModel: true,
      illiquidPeriod: true,
      technicalAnalysis:
        "ADA forming lower lows with each bounce attempt rejected at declining resistance levels. No support held.",
      fundamentalInsights:
        "Cardano staking rate remained high (72%+) indicating holder conviction, but this hasn't translated to NFT ecosystem recovery.",
      keyEvents:
        "Fear & Greed Index dropped to 20 on January 26. Market sentiment entering dangerous territory with capitulation selling increasing.",
      riskAssessment:
        "The 3-6 month recovery window from November has expired without improvement. Extended crisis now the base case.",
      recommendations:
        "HOLD. Forced selling into an 8-month-old liquidity crisis would destroy remaining value. Patience is the only strategy.",
      marketContext:
        "January 2026: No new year rally materialized. The market entered 2026 with the same structural problems that plagued late 2025.",
    },
    {
      period: "Y4",
      quarter: "Feb",
      value: 26,
      event: "Historic Fear Bottom",
      detail:
        "ADA hit $0.22 on Feb 6, the same day the Fear & Greed Index recorded an all-time low of 5, the worst reading in its entire history since 2018.",
      yearEnd: null,
      markToModel: true,
      illiquidPeriod: true,
      technicalAnalysis:
        "ADA briefly touched $0.22 on Feb 6, its lowest level in over two years. Panic selling across all crypto assets created cascading liquidations.",
      fundamentalInsights:
        "The Feb 6 capitulation event was worse than Terra/Luna (index: 6), COVID crash (8), and FTX collapse (10). Unprecedented market pessimism.",
      keyEvents:
        "Fear & Greed Index hit ALL-TIME LOW of 5 on February 6, 2026. 46+ consecutive days of Extreme Fear began. BTC dropped toward $65k territory.",
      riskAssessment:
        "Peak pessimism. Readings this extreme have usually come before recoveries, though the timing is impossible to predict.",
      recommendations:
        "DO NOT SELL at historic fear levels. This is capitulation territory. Any sales would almost certainly be at or near the absolute bottom.",
      marketContext:
        "February 2026: The market hit rock bottom in sentiment terms. The question became whether this was the floor for prices too.",
    },
    {
      period: "Y4",
      quarter: "Mar",
      value: 25,
      event: "Grinding Lower",
      detail:
        "ADA at $0.24. Markets stabilized slightly but without conviction. Fear & Greed remained at 10-14 (Extreme Fear). NFT market showed zero recovery signs.",
      yearEnd: null,
      markToModel: true,
      illiquidPeriod: true,
      technicalAnalysis:
        "ADA price formed a potential base around $0.24 but without volume confirmation. Selling exhaustion possible but not confirmed.",
      fundamentalInsights:
        "10 months of NFT illiquidity. Premium floor assumption of 35% increasingly questionable as no OTC buyers materialized.",
      keyEvents:
        "Extreme Fear zone persisted for 46+ consecutive days, the longest such streak on record. Market participants largely capitulated or went dormant.",
      riskAssessment:
        "Portfolio approaching forced-liquidation territory. Model valuations may be overstating actual recoverable value.",
      recommendations:
        "Continue holding but begin critically reassessing the premium floor assumption in the valuation model.",
      marketContext:
        "March 2026: The extended crisis entered its 10th month. Recovery predictions from November proved overly optimistic.",
    },
    {
      period: "Y4",
      quarter: "Apr",
      value: 25,
      event: "April Report",
      detail:
        "ADA at $0.25 (down 69.5% from May 2025). Portfolio at 25.3% on the model. April report issued at -74.7%. On April 23, JPG Store started a restriction period ahead of a full shutdown, an early warning sign for NFT liquidity.",
      yearEnd: null,
      markToModel: true,
      illiquidPeriod: true,
      technicalAnalysis:
        "ADA showing slight stabilization around $0.25 with BTC recovering to $71k. The tentative bottom would prove short-lived over the following quarter.",
      fundamentalInsights:
        "After 11 months of zero NFT liquidity, the premium floor assumption is under serious strain. Theoretical collector interest has not materialized into actual bids.",
      keyEvents:
        "BTC recovered to $71k on ETF inflows. ADA held near $0.25. Fear & Greed at 15. JPG Store announced a restriction period on April 23 ahead of closure.",
      riskAssessment:
        "Critical. Portfolio at -74.7% with no viable exit path. Model valuation may overstate actual recoverable value by significant margin.",
      recommendations:
        "We hold because we have to, not because we are optimistic. The market needs to rebuild before selling makes any sense. Focus on protecting the liquid assets we have left.",
      marketContext:
        "April 2026: 11 months into the worst NFT liquidity crisis in Cardano history. The portfolio has survived, but the path to recovery remains unclear.",
    },

    // The quarter that broke the recovery thesis — May to July 2026
    {
      period: "Y4",
      quarter: "May",
      value: 24,
      event: "Marketplace Shutdown",
      detail:
        "On May 23, 2026, JPG Store, the largest Cardano NFT marketplace since 2021, closed for good, saying it could not keep operating in such a low-volume market. The main place to sell the NFTs stopped existing.",
      yearEnd: null,
      markToModel: true,
      illiquidPeriod: true,
      technicalAnalysis:
        "ADA held near $0.24 in May as BTC briefly pushed back to ~$73k, but neither move helped the NFT sleeve, which lost its trading venue entirely.",
      fundamentalInsights:
        "The shutdown converts illiquidity from cyclical to structural. On-chain price discovery for Cardano NFTs effectively ended; remaining chain-wide volume fell to ~$3.5k/day with fewer than 30 buyers.",
      keyEvents:
        "JPG Store closed May 23, 2026. Nifty Gateway and Immutable's marketplace also wound down. Cardano DeFi TVL slid to ~$130M.",
      riskAssessment:
        "Severe. With no marketplace, the NFT positions can no longer be priced or exited on-chain. The 35% model floor is no longer supportable.",
      recommendations:
        "Hold; there is now nowhere to sell. Protect the liquid ADA and cash. Start lowering the floor in our model.",
      marketContext:
        "May 2026: JPG Store closing was the most important event of the whole crisis. It removed the market that our recovery plan depended on.",
    },
    {
      period: "Y4",
      quarter: "Jun",
      value: 22,
      event: "BTC Rotation Fails",
      detail:
        "ADA fell to about $0.17 as Bitcoin failed to hold $70k, sliding from around $73k to the low $60,000s on ETF selling. Our April idea, that altcoins might follow if BTC held $70k, was tested and did not hold.",
      yearEnd: null,
      markToModel: true,
      illiquidPeriod: true,
      technicalAnalysis:
        "BTC lost the $70k level and rolled over toward $62k with dominance near 58%, squeezing altcoins. ADA broke below its April base with no volume support.",
      fundamentalInsights:
        "The hoped-for altcoin rotation never began. Capital that returned to crypto stayed in BTC; ADA and NFTs saw none of it.",
      keyEvents:
        "Bitcoin ETF flows reversed to outflows in June. ADA slid ~30% intra-quarter. No new Cardano NFT venue emerged to replace JPG Store.",
      riskAssessment:
        "High and building. ADA, the only liquid crypto asset in the portfolio, lost roughly a third of its value in the quarter.",
      recommendations:
        "Continue holding. Preserve remaining liquidity. Do not deploy into a falling market with no catalyst.",
      marketContext:
        "June 2026: The one hopeful sign from April, a Bitcoin-led recovery, faded and took ADA lower with it.",
    },
    {
      period: "Y4",
      quarter: "Jul",
      value: 21,
      event: "Current Position",
      detail:
        "ADA at about $0.15 (down 82% from May 2025). Portfolio at about 21.6% on the model, with realistic recoverable value now put at 5-10%. 14 months of frozen NFT markets, and now no marketplace at all.",
      yearEnd: null,
      markToModel: true,
      illiquidPeriod: true,
      currentPosition: true,
      technicalAnalysis:
        "ADA near multi-year lows around $0.15. BTC steadied near $58-62k and bounced a little. Overall Fear & Greed recovered to Neutral (48), but the buying has not reached ADA or the NFTs.",
      fundamentalInsights:
        "With JPG Store gone, we can no longer defend the 35% floor. The NFTs are still in your own wallet, owned but unsellable until a new venue appears.",
      keyEvents:
        "Fear & Greed recovered from an early-July re-test of ~15 to Neutral (48). ADA ~$0.15, BTC ~$62k. Cardano NFT volume near zero with no active marketplace.",
      riskAssessment:
        "Critical. Portfolio at about -78% on model values, with realistic value 5-10%. There is no way to sell more than 90% of the holdings.",
      recommendations:
        "HOLD by necessity. Preserve liquid ADA, cash, and staking yield. Monitor for a new marketplace or OTC channel. Report the revised floor transparently.",
      marketContext:
        "July 2026: 14 months in. Broad sentiment has stabilized, but Cardano NFTs lost their marketplace and ADA made new lows. Recovery now depends on infrastructure being rebuilt.",
    },
  ];

  // Filter data based on selected period
  const filteredData = useMemo(() => {
    if (activePeriod === "All Time") {
      return fullData;
    } else if (activePeriod === "Crisis Period") {
      // Show from May 2025 through July 2026 (the full illiquidity period)
      const mayIndex = fullData.findIndex(
        (d) => d.period === "Y3" && d.quarter === "Q2"
      );
      return fullData.slice(mayIndex);
    } else if (activePeriod === "Last 6 Months") {
      // Show from Feb 2026 through July 2026
      const startIndex = fullData.findIndex(
        (d) => d.period === "Y4" && d.quarter === "Feb"
      );
      return fullData.slice(startIndex);
    } else if (activePeriod === "Year 3") {
      return [
        {
          period: "Initial",
          quarter: "",
          value: 100,
          event: "Initial Investment",
          detail: "Starting point for comparison.",
          yearEnd: null,
        },
        ...fullData.filter((item) => item.period === "Y3"),
      ];
    } else if (activePeriod === "Year 2") {
      return [
        {
          period: "Initial",
          quarter: "",
          value: 100,
          event: "Initial Investment",
          detail: "Starting point for comparison.",
          yearEnd: null,
        },
        ...fullData.filter((item) => item.period === "Y2"),
      ];
    } else if (activePeriod === "Year 1") {
      return [
        {
          period: "Initial",
          quarter: "",
          value: 100,
          event: "Initial Investment",
          detail: "Starting point for comparison.",
          yearEnd: null,
        },
        ...fullData.filter((item) => item.period === "Y1"),
      ];
    }
    return fullData;
  }, [activePeriod]);

  // Calculate Y-axis ticks
  const yAxisTicks = useMemo(() => {
    const maxValue = Math.max(...filteredData.map((d) => d.value));
    const tickStep = 50;
    const maxTick = Math.ceil(maxValue / tickStep) * tickStep;

    let ticks = [];
    for (let i = 0; i <= maxTick; i += tickStep) {
      ticks.push(i);
    }

    return ticks;
  }, [filteredData]);

  // Handle dot click to lock/unlock selection
  const handleDotClick = (data) => {
    if (
      selectedData &&
      selectedData.period === data.period &&
      selectedData.quarter === data.quarter
    ) {
      setSelectedData(null);
    } else {
      setSelectedData(data);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div
          style={{
            background: "#1e1e1e",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            color: "white",
            fontSize: "0.875rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
            maxWidth: "280px",
          }}
        >
          <strong>
            {d.period} {d.quarter}
          </strong>
          <br />
          <span style={{ color: "#3b82f6" }}>{d.event}</span>
          <br />
          <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>
            {d.value}%
          </span>
          {d.markToModel && (
            <div
              style={{
                marginTop: "0.5rem",
                padding: "0.5rem",
                background: "rgba(245, 158, 11, 0.2)",
                borderRadius: "4px",
                fontSize: "0.75rem",
                color: "#f59e0b",
              }}
            >
              ⚠️ Mark-to-Model Valuation
              <div style={{ color: "#9ca3af", marginTop: "0.25rem" }}>
                Actual market value unavailable due to zero liquidity
              </div>
            </div>
          )}
          <div
            style={{
              fontSize: "0.75rem",
              marginTop: "0.5rem",
              color: "#9ca3af",
            }}
          >
            Click to view detailed analysis
          </div>
        </div>
      );
    }
    return null;
  };

  // Define the default content when no point is selected
  const defaultAnalysisContent = {
    title: "Current Market Reality: 14 Months, and Now No Marketplace",
    sections: [
      {
        heading: "The Marketplace Shut Down (May 23, 2026)",
        content:
          "The big event this quarter: JPG Store, the largest Cardano NFT marketplace since 2021, closed for good on May 23, 2026, saying it could not keep operating with so little trading. The main place the portfolio's NFTs could be priced or sold is gone. That turns the illiquidity from a quiet market into a lost one. Trading across the whole chain is now about $3.5k a day, with fewer than 30 buyers.",
      },
      {
        heading: "The Recovery Bet Was Tested, and It Failed",
        content:
          "Our April report offered one cautious hope: if Bitcoin held above $70k, altcoins might eventually follow. Bitcoin touched about $73k in late May, then fell back to the low $60,000s by July as ETF money left. The rotation never started. ADA dropped from $0.25 to about $0.15 (82% below its May 2025 level), making new multi-year lows.",
      },
      {
        heading: "The Model, and an Honest Markdown",
        content:
          "Our model (40% ADA price, 30% liquidity discount, 30% NFT floor) now works out to about 21.6% of the original investment. But with the marketplace gone, we can no longer support the 35% floor. We are lowering our estimate of what could realistically be recovered to about 5-10%, since the model figure now sits well above what we could actually get.",
      },
      {
        heading: "Why We Still Hold",
        content:
          "For the NFTs, holding is no longer a choice, because there is nowhere to sell them at any price. They are still in your own wallet, owned and intact, but they cannot be sold until the market is rebuilt. For the liquid ADA and cash, we hold to keep our options open rather than lock in losses at multi-year lows.",
      },
      {
        heading: "Honest Outlook",
        content:
          "There are a couple of small positives. Overall Fear & Greed has recovered from February's low of 5 to Neutral (48), and Bitcoin steadied near $58-62k. But that improvement skipped Cardano and the NFTs. An NFT recovery now depends on a new marketplace, aggregator, or OTC channel showing up, and none exists today. We will not set a timeline we cannot keep.",
      },
    ],
  };

  // Define period options
  const periodOptions = [
    "All Time",
    "Crisis Period",
    "Last 6 Months",
    "Year 3",
    "Year 2",
    "Year 1",
  ];

  // Determine which data to display in details panel
  const displayData = selectedData || hoveredData;

  // Reset selected data when changing time period
  React.useEffect(() => {
    setSelectedData(null);
  }, [activePeriod]);

  return (
    <motion.div
      className="performance-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      {/* ────── CHART PANEL ────── */}
      <div
        style={{
          background: "#111827",
          borderRadius: "20px",
          padding: "1.5rem",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#fff" }}>
            Investment Performance Timeline
            {(activePeriod === "Crisis Period" || activePeriod === "Last 6 Months") && (
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#f59e0b",
                  fontWeight: 400,
                  marginLeft: "1rem",
                }}
              >
                (The Valley of Uncertainty, 14 Months)
              </span>
            )}
          </h3>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              fontSize: "0.75rem",
              color: "#6b7280",
            }}
          >
            {periodOptions.map((period) => (
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

        <div style={{ width: "100%", height: "320px" }}>
          <ResponsiveContainer>
            <AreaChart
              data={filteredData}
              onMouseMove={(e) => {
                if (!selectedData && e?.activePayload?.[0]?.payload) {
                  setHoveredData(e.activePayload[0].payload);
                }
              }}
              onMouseLeave={() => {
                if (!selectedData) {
                  setHoveredData(null);
                }
              }}
              onClick={(e) => {
                if (e?.activePayload?.[0]?.payload) {
                  handleDotClick(e.activePayload[0].payload);
                }
              }}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="illiquidGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />

              {/* Add reference area for illiquid period */}
              {activePeriod === "All Time" && (
                <ReferenceArea
                  x1="Y3 Jun"
                  x2="Y4 Jul"
                  fill="#f59e0b"
                  fillOpacity={0.05}
                  strokeOpacity={0.3}
                  stroke="#f59e0b"
                />
              )}

              <XAxis
                dataKey="quarter"
                stroke="#6b7280"
                tickFormatter={(_, i) => {
                  const item = filteredData[i];
                  if (!item) return "";
                  if (item.illiquidPeriod) {
                    return item.quarter; // Just show month for illiquid period
                  }
                  return item.quarter
                    ? `${item.period} ${item.quarter}`
                    : item.period;
                }}
                angle={activePeriod === "Last 6 Months" ? -45 : 0}
                textAnchor={activePeriod === "Last 6 Months" ? "end" : "middle"}
                height={activePeriod === "Last 6 Months" ? 60 : 30}
              />
              <YAxis
                stroke="#6b7280"
                tickFormatter={(val) => `${val}%`}
                domain={[0, Math.max(...yAxisTicks)]}
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
                strokeDasharray={(dot) => (dot.markToModel ? "5 5" : "0")}
                activeDot={(props) => {
                  const isSelected =
                    selectedData &&
                    selectedData.period === props.payload.period &&
                    selectedData.quarter === props.payload.quarter;

                  const isIlliquid = props.payload.markToModel;

                  return (
                    <circle
                      {...props}
                      r={isSelected ? 8 : 6}
                      stroke={isIlliquid ? "#f59e0b" : "#ffffff"}
                      strokeWidth={isSelected ? 3 : 2}
                      fill={
                        isSelected
                          ? "#f59e0b"
                          : isIlliquid
                          ? "#f59e0b"
                          : "#3b82f6"
                      }
                      style={{ cursor: "pointer" }}
                    />
                  );
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            fontSize: "0.75rem",
            color: "#6b7280",
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Portfolio Value (% of Initial Investment)</span>

          {/* Legend for chart */}
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div
                style={{ width: "20px", height: "2px", background: "#3b82f6" }}
              ></div>
              <span>Verified Value</span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div
                style={{
                  width: "20px",
                  height: "2px",
                  background: "#f59e0b",
                  borderStyle: "dashed",
                  borderWidth: "1px 0 0 0",
                }}
              ></div>
              <span>Mark-to-Model</span>
            </div>
          </div>

          {/* Lock indicator */}
          {selectedData && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#f59e0b",
                fontSize: "0.75rem",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#f59e0b",
                }}
              ></div>
              <span>
                {selectedData.period} {selectedData.quarter} locked
              </span>
              <button
                onClick={() => setSelectedData(null)}
                style={{
                  background: "rgba(245, 158, 11, 0.1)",
                  border: "none",
                  borderRadius: "4px",
                  padding: "2px 6px",
                  fontSize: "0.7rem",
                  color: "#f59e0b",
                  cursor: "pointer",
                  marginLeft: "4px",
                }}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ────── DATA PANEL ────── */}
      <div
        style={{
          background: "#111827",
          borderRadius: "20px",
          padding: "1.5rem",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
          color: "#f3f4f6",
        }}
      >
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 600,
            marginBottom: "1.5rem",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {displayData ? (
            <>
              <span>
                {displayData.period} {displayData.quarter}
              </span>
              <span
                style={{
                  fontSize: "0.8rem",
                  backgroundColor: displayData.markToModel
                    ? "rgba(245, 158, 11, 0.2)"
                    : selectedData
                    ? "rgba(245, 158, 11, 0.2)"
                    : "rgba(59, 130, 246, 0.2)",
                  color: displayData.markToModel
                    ? "#f59e0b"
                    : selectedData
                    ? "#f59e0b"
                    : "#60a5fa",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "4px",
                }}
              >
                {displayData.event}
              </span>

              {displayData.markToModel && (
                <span
                  style={{
                    fontSize: "0.7rem",
                    backgroundColor: "rgba(245, 158, 11, 0.1)",
                    color: "#f59e0b",
                    padding: "0.15rem 0.35rem",
                    borderRadius: "4px",
                    marginLeft: "auto",
                  }}
                >
                  Mark-to-Model
                </span>
              )}
            </>
          ) : (
            defaultAnalysisContent.title
          )}
        </h3>

        {displayData ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Main details */}
            <p
              style={{
                fontSize: "0.9rem",
                color: "#e2e8f0",
                lineHeight: "1.5",
              }}
            >
              {displayData.detail}
            </p>

            {/* Market context for illiquid period */}
            {displayData.marketContext && (
              <div
                style={{
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  borderLeft: "3px solid #f59e0b",
                  padding: "0.75rem 1rem",
                  borderRadius: "0 4px 4px 0",
                }}
              >
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#f59e0b",
                    fontWeight: 500,
                    marginBottom: "0.25rem",
                  }}
                >
                  Market Context
                </p>
                <p style={{ fontSize: "0.875rem", color: "#e2e8f0" }}>
                  {displayData.marketContext}
                </p>
              </div>
            )}

            {/* Year-end position if available */}
            {displayData.yearEnd && (
              <div
                style={{
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderLeft: "3px solid #3b82f6",
                  padding: "0.75rem 1rem",
                  borderRadius: "0 4px 4px 0",
                }}
              >
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#93c5fd",
                    fontWeight: 500,
                    marginBottom: "0.25rem",
                  }}
                >
                  Year-End Position
                </p>
                <p style={{ fontSize: "0.875rem", color: "#e2e8f0" }}>
                  {displayData.yearEnd}% of initial capital{" "}
                  {displayData.yearEnd >= 100 ? "gained" : "recovered"}.
                </p>
              </div>
            )}

            {/* Analysis sections */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {displayData.technicalAnalysis && (
                <AnalysisCard
                  title="Technical Analysis"
                  content={displayData.technicalAnalysis}
                  iconColor="#f59e0b"
                />
              )}

              {displayData.fundamentalInsights && (
                <AnalysisCard
                  title="Fundamental Insights"
                  content={displayData.fundamentalInsights}
                  iconColor="#10b981"
                />
              )}
            </div>

            {/* Key events and recommendations */}
            {(displayData.keyEvents || displayData.recommendations) && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                {displayData.keyEvents && (
                  <AnalysisCard
                    title="Key Events"
                    content={displayData.keyEvents}
                    iconColor="#8b5cf6"
                  />
                )}

                {displayData.recommendations && (
                  <AnalysisCard
                    title="Advisor Recommendations"
                    content={displayData.recommendations}
                    iconColor="#3b82f6"
                  />
                )}
              </div>
            )}

            {/* Risk assessment */}
            {displayData.riskAssessment && (
              <AnalysisCard
                title="Risk Assessment"
                content={displayData.riskAssessment}
                iconColor="#ef4444"
                fullWidth
              />
            )}
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {defaultAnalysisContent.sections.map((section, index) => (
              <div key={index}>
                <h4
                  style={{
                    fontSize: "0.95rem",
                    color: "#3b82f6",
                    marginBottom: "0.75rem",
                  }}
                >
                  {section.heading}
                </h4>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#9ca3af",
                    lineHeight: "1.6",
                  }}
                >
                  {section.content}
                </p>
              </div>
            ))}

            <div
              style={{
                marginTop: "0.5rem",
                padding: "1rem",
                background: "rgba(245, 158, 11, 0.05)",
                borderRadius: "8px",
                borderLeft: "3px solid #f59e0b",
              }}
            >
              <h4
                style={{
                  fontSize: "0.95rem",
                  color: "#f59e0b",
                  marginBottom: "0.5rem",
                }}
              >
                The Path Forward
              </h4>
              <ul
                style={{
                  fontSize: "0.875rem",
                  color: "#9ca3af",
                  lineHeight: "1.6",
                  paddingLeft: "1.5rem",
                  margin: "0.5rem 0",
                }}
              >
                <li>Keep holding the NFTs; with JPG Store closed, there is nowhere to sell them</li>
                <li>Watch for a new Cardano marketplace, aggregator, or OTC channel to bring back a bid</li>
                <li>Lower the floor in our model; realistic value is now about 5-10%</li>
                <li>Protect the remaining liquid assets (ADA, cash, and staking income)</li>
                <li>The April bet on a Bitcoin-led recovery was tested and did not hold</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Analysis Card Component
function AnalysisCard({ title, content, iconColor, fullWidth = false }) {
  return (
    <div
      style={{
        gridColumn: fullWidth ? "1 / -1" : "auto",
        background: "#1e293b",
        borderRadius: "8px",
        padding: "0.75rem 1rem",
      }}
    >
      <h5
        style={{
          fontSize: "0.875rem",
          color: iconColor,
          marginBottom: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: iconColor,
          }}
        ></span>
        {title}
      </h5>
      <p style={{ fontSize: "0.8rem", color: "#94a3b8", lineHeight: "1.5" }}>
        {content}
      </p>
    </div>
  );
}
