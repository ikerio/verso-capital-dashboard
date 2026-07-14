// MarketInsights.jsx - Updated July 2026: structural NFT breakdown, JPG Store closed
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LiveIntelCarousel from './LiveIntelCarousel';

export default function MarketInsights() {
  // Add state for selected market analysis
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  // Expert analysis sections — July 2026 update
  const marketAnalysis = [
    {
      id: 'macro',
      title: 'Macroeconomic Factors',
      icon: '📊',
      color: '#60a5fa',
      insights: [
        {
          title: 'Sentiment Stabilizes, Prices Stay Soft',
          content: 'Overall crypto sentiment has recovered a good deal: the Fear & Greed Index climbed from February\'s low of 5 to Neutral (48) by mid-July. The recovery was uneven, though. It lifted Bitcoin off its lows but did nothing for altcoins or NFTs. The mood is less panicked than in April, but people are still not taking on much risk.',
          impact: 'Mixed',
          impactColor: '#f59e0b'
        },
        {
          title: 'Institutional Flows Reversed',
          content: 'The Bitcoin ETF buying that helped April turned into net selling through June, and BTC could not hold $70k. Big investors still have almost no interest in altcoins or NFTs. The money that stayed in crypto piled into Bitcoin (about 58% of the market), which squeezed everything below it.',
          impact: 'Negative',
          impactColor: '#ef4444'
        },
        {
          title: 'Geopolitics and Risk Appetite',
          content: 'Ongoing geopolitical uncertainty keeps demand low for speculative, hard-to-sell assets, which is exactly what our NFTs are. Buyers have not come back to niche collectible markets, and the companies that ran those markets are getting out of the business.',
          impact: 'Negative',
          impactColor: '#ef4444'
        }
      ]
    },
    {
      id: 'crypto',
      title: 'Crypto Market Status',
      icon: '🔄',
      color: '#f59e0b',
      insights: [
        {
          title: 'BTC Rotation Thesis Failed',
          content: 'In April we said that if BTC held above $70k, money might start rotating into altcoins. BTC touched about $73k in late May, then fell back to around $62k as ETF money left. The rotation never started. ADA at about $0.15 is down 82% from May 2025, while BTC is down about 44% from its $111k high, so the gap between them got wider, not narrower.',
          impact: 'Negative for Portfolio',
          impactColor: '#ef4444'
        },
        {
          title: 'ADA: New Multi-Year Lows',
          content: 'ADA has fallen from $0.82 in May 2025 to $0.405 in November, $0.25 in April, and about $0.15 now, an 82% drop. The $0.25 level from April did not hold. The network\'s own numbers have stayed steady, but they have been disconnected from the price for over a year now.',
          impact: 'Strongly Negative',
          impactColor: '#dc2626'
        },
        {
          title: 'NFT Market: The Marketplace Closed',
          content: 'The big event of the quarter: JPG Store, the largest Cardano NFT marketplace since 2021, closed for good on May 23, 2026. Cardano NFT trading is now about $3.5k a day across the whole chain, with fewer than 30 buyers. This is past being a frozen market. The main thing that made it a market is gone.',
          impact: 'Critical',
          impactColor: '#dc2626'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Analysis',
      icon: '📈',
      color: '#a78bfa',
      insights: [
        {
          title: 'ADA Price Structure',
          content: 'ADA at about $0.15 has dropped below the $0.24-0.26 range that held through the spring. Every bounce has faded on light volume. There is not much support on the chart until the last cycle\'s lows, and with so little trading, the price mostly follows sentiment.',
          impact: 'Negative',
          impactColor: '#ef4444'
        },
        {
          title: 'Sentiment vs Price Divergence',
          content: 'The Fear & Greed Index bounced hard from about 15 in early July to Neutral (48). Normally a rising index is a good sign, but ADA made new lows during that same stretch. The buying is going somewhere else, and the better mood has not turned into any real demand for ADA.',
          impact: 'Cautiously Neutral',
          impactColor: '#f59e0b'
        },
        {
          title: 'BTC Lost Its Leadership Level',
          content: 'Bitcoin could not hold $70k and slid to about $62k, then steadied in the $58-62k area. It has calmed down, but at a lower level than in April. Altcoins usually follow Bitcoin by 2-4 months, and with Bitcoin itself soft and no rotation underway, there is nothing pointing ADA higher in the near term.',
          impact: 'Negative',
          impactColor: '#ef4444'
        }
      ]
    },
    {
      id: 'recovery',
      title: 'Recovery Assessment',
      icon: '🔋',
      color: '#22c55e',
      insights: [
        {
          title: 'The Path to Recovery Changed',
          content: 'Until this quarter, recovery meant waiting for buyers to come back to the marketplace. With JPG Store closed, that path is gone. For the NFTs to recover now, something new has to be built first: a replacement marketplace, an aggregator, or a credible OTC desk, more or less from scratch.',
          impact: 'Materially Harder',
          impactColor: '#dc2626'
        },
        {
          title: 'What Recovery Now Requires',
          content: 'Three things need to happen, in order: first, a working place to price and trade Cardano NFTs again; second, collectors and money coming back to it; third, a lasting recovery in ADA and BTC prices to bring risk appetite back. None of that is here today. This is a rebuild, not a quick bounce.',
          impact: 'Not Yet Visible',
          impactColor: '#ef4444'
        },
        {
          title: 'What Remains Intact',
          content: 'The NFTs are held in your own wallet. They are still owned and intact even without a marketplace. The liquid ADA, cash, and staking income are all still accessible. We hold because selling at multi-year lows into a market that has no venue would be the worst outcome, not because we feel sure about timing.',
          impact: 'Realistic',
          impactColor: '#f59e0b'
        }
      ]
    }
  ];

  // Market drivers — July 2026 assessment
  const growthDrivers = [
    {
      title: 'JPG Store Shutdown',
      content: 'The decisive event of the quarter: JPG Store, the largest Cardano NFT marketplace since 2021, closed for good on May 23, 2026, saying it could not keep operating. Other marketplaces have shut down too (Nifty Gateway, Immutable). The place our NFTs traded in is simply gone.',
      secondary: 'This turns the problem from a quiet market into a lost market. Recovery now needs a new venue built, not just buyers coming back. It is the worst single development since June 2025.',
      metric: 'Relevance to Portfolio',
      value: 95,
      keyMetrics: [
        { label: 'Marketplace', value: 'Closed' },
        { label: 'Cardano NFT Volume', value: '~$3.5k/day' },
        { label: 'Active Buyers', value: '<30/day' }
      ]
    },
    {
      title: 'Bitcoin: Recovery Stalled',
      content: 'The Bitcoin recovery that helped in April stalled. After touching about $73k in late May, it fell back to around $62k by July as ETF money left. It steadied in the $58-62k area but never held above $70k, which is what our April view needed for altcoins to rotate.',
      secondary: 'A steadier but lower Bitcoin is not enough to lift ADA or the NFTs. Altcoins usually follow Bitcoin by 2-4 months, but that only helps when Bitcoin is trending up, and it is not. ADA and the NFTs still need their own catalysts, which are not here.',
      metric: 'Relevance to Portfolio',
      value: 25,
      keyMetrics: [
        { label: 'BTC vs April', value: '-13%' },
        { label: 'ADA Response', value: 'New lows' },
        { label: 'NFT Market Impact', value: 'None' }
      ]
    },
    {
      title: 'Cardano NFT Ecosystem',
      content: 'With its main marketplace gone, the Cardano NFT scene is at its weakest point ever. Trading is about $3.5k a day across the chain, and DeFi TVL has fallen to around $130M. Ethereum and Solana NFTs still have working marketplaces; Cardano NFTs currently have no real market at all.',
      secondary: 'The question has shifted from when it will recover to whether the market will be rebuilt at all. NFT scenes on some other chains (Tezos, Polygon) never got back to their 2021-2022 levels. Cardano now faces that same risk, and without a marketplace.',
      metric: 'Recovery Probability',
      value: 8,
      keyMetrics: [
        { label: 'Volume vs Peak', value: '-99%+' },
        { label: 'Active Marketplace', value: 'None' },
        { label: 'Months Frozen', value: '14' }
      ]
    }
  ];

  // Cardano analysis — July 2026 honest assessment
  const cardanoInsights = [
    {
      title: 'Current Market Reality',
      content: 'ADA has fallen 82% from $0.82 in May 2025 to about $0.15 in July 2026, down another 40% since our April report. The position is deep underwater. Our average entry of $0.59 is roughly 75% above where the price is now.',
      secondary: 'The slide picked back up after a short pause, from $0.82 to $0.405, $0.25, $0.24, $0.17, and now $0.15. The $0.25 level from the spring gave way once BTC failed to hold $70k and the NFT marketplace closed.',
      chart: {
        title: 'Price Decline Timeline',
        data: [
          { label: 'May 2025', value: '$0.82', impact: 'Last "normal" price' },
          { label: 'Apr 2026 (Report)', value: '$0.25', impact: '-69.5% from May' },
          { label: 'Jun 2026', value: '$0.17', impact: '-79% from May' },
          { label: 'Current (Jul)', value: '~$0.15', impact: '-82% from May' }
        ]
      }
    },
    {
      title: 'Network vs Price Disconnect',
      content: 'Cardano\'s network numbers are still fairly steady despite the price collapse, with staking near 70% and development ongoing. But that gap between the fundamentals and the price has now lasted 14 months, and DeFi TVL has slipped to about $130M as money leaves the ecosystem.',
      secondary: 'At some point, saying the fundamentals are strong stops being reassuring if it never shows up in the price or in liquidity. Good network numbers are clearly not enough on their own, and with the NFT marketplace closed, the infrastructure itself is now eroding too.',
      stat: 'Stable',
      statLabel: 'Network Metrics (Flat)',
      chart: {
        title: 'Persistent Divergence',
        data: [
          { label: 'Staking Rate', current: '~70%', growth: 'Stable' },
          { label: 'Developer Activity', current: 'Rank #5', growth: 'Slight decline' },
          { label: 'DeFi TVL', current: '~$130M', growth: 'Declining' },
          { label: 'Price Recovery', current: '~$0.15', growth: 'Not reflected' }
        ]
      }
    },
    {
      title: 'Honest Outlook',
      content: 'Our November 2025 report put ADA at $2.50-$5.00. It is at about $0.15, so those targets were off by 15 to 30 times. We are not going to publish new ones. We said in April that these assets swing on every geopolitical shock and cannot be forecast reliably, and this quarter proved the point again.',
      secondary: 'What we can honestly say is that overall sentiment has improved (Fear & Greed is back to Neutral) and Bitcoin has steadied, both of which have to happen before any recovery. But ADA has not joined in, and an NFT recovery now needs a new marketplace to even exist, which is a much higher bar than a price recovery.',
      chart: {
        title: 'Nov 2025 Projections vs Reality',
        data: [
          { label: 'Conservative Target', value: '$2.50', rationale: 'Actual: ~$0.15 (missed by ~17x)' },
          { label: 'Base Case Target', value: '$3.00', rationale: 'Actual: ~$0.15 (missed by ~20x)' },
          { label: 'Bullish Target', value: '$5.00', rationale: 'Actual: ~$0.15 (missed by ~33x)' },
          { label: 'New Target', value: 'None', rationale: 'We will not speculate on timing' }
        ]
      }
    }
  ];

  // Strategic recommendations — July 2026 (honest assessment)
  const strategicRecommendations = [
    {
      title: 'Keep Holding the NFTs',
      content: 'With JPG Store closed since May 23, 2026, there is no price at which the NFTs can be sold, because there is no marketplace. Holding them is not really a choice now. They are still in your own wallet, owned and intact, but they cannot be sold until the market is rebuilt.',
      action: 'HOLD',
      actionColor: '#3b82f6',
      targetAllocation: '93% (frozen)',
      rationale: [
        'There is no marketplace to price or sell the NFTs',
        'We have lowered our realistic recovery estimate to about 5-10%',
        'The assets are in your wallet and not lost; the option remains if a venue returns'
      ]
    },
    {
      title: 'Preserve Remaining Liquid Assets',
      content: 'Liquid ADA and cash (about 4% of the portfolio) plus staking income are the only assets we can still move. We are not putting them into new positions. These reserves are what has kept us from being forced to sell through 14 months of this.',
      action: 'PRESERVE',
      actionColor: '#f59e0b',
      targetAllocation: '~4%',
      rationale: [
        'Liquid reserves are very low and cannot be topped up',
        'Selling ADA at about $0.15, a multi-year low, would lock in the loss',
        'Keeping our options open matters more than yield at this point'
      ]
    },
    {
      title: 'Revise the Valuation Model Down',
      content: 'The 35% floor assumed collector demand that never showed up, and the marketplace that would have hosted it has now closed. We are lowering our realistic recovery estimate from 10-15% to about 5-10%, and telling you that plainly.',
      action: 'REVISE',
      actionColor: '#ef4444',
      targetAllocation: 'N/A',
      rationale: [
        'JPG Store closing removes any basis for the 35% floor',
        'The model values now sit well above what we could actually get',
        'We would rather revise this openly than quietly'
      ]
    },
    {
      title: 'Watch for New Market Infrastructure',
      content: 'The thing to watch for has changed. It is no longer whether BTC holds $70k; that did not work out. It is now whether a new Cardano NFT marketplace, aggregator, or credible OTC desk appears and creates a bid for these holdings again.',
      action: 'WATCH',
      actionColor: '#8b5cf6',
      targetAllocation: 'N/A',
      rationale: [
        'A working venue is now the first thing an NFT recovery needs',
        'Sentiment returning to Neutral helps but is not enough on its own',
        'We will let you know the moment a credible venue appears'
      ]
    }
  ];

  // Handle analysis selection
  const toggleAnalysis = (analysisId) => {
    if (selectedAnalysis === analysisId) {
      setSelectedAnalysis(null);
    } else {
      setSelectedAnalysis(analysisId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      {/* ───── MARKET REALITY ───── */}
      <section style={cardStyle}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '0.5rem'
        }}>
          <h3 style={titleStyle}>Market Reality: 14 Months, No Marketplace</h3>
          <div style={{
            padding: '0.4rem 0.8rem',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ef4444'
            }}></span>
            <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>~78% Decline</span>
          </div>
        </div>
        <p style={descStyle}>
          The portfolio has now been through 14 months of extreme conditions since the NFT market seized up in June 2025. The most important thing that happened this quarter is that JPG Store, the largest Cardano NFT marketplace, closed for good on May 23, 2026. That leaves the NFTs with nowhere to sell. ADA fell another 40% to about $0.15 (82% below its May 2025 level), and Bitcoin could not hold $70k, which was the one hopeful sign we pointed to in April. Overall sentiment did recover, with Fear & Greed climbing from February's low of 5 back to Neutral (48), but that recovery skipped ADA and the NFTs. As always, we are laying out plainly what happened and where we are genuinely unsure about what comes next.
        </p>
        
        {/* Market Analysis Tabs */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem',
            flexWrap: 'wrap',
            margin: '0 -0.25rem'
          }}>
            {marketAnalysis.map(analysis => (
              <button
                key={analysis.id}
                onClick={() => toggleAnalysis(analysis.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  background: selectedAnalysis === analysis.id ? 
                    `rgba(${hexToRgb(analysis.color)}, 0.15)` : 
                    'rgba(31, 41, 55, 0.5)',
                  border: 'none',
                  borderRadius: '8px',
                  color: selectedAnalysis === analysis.id ? analysis.color : '#9ca3af',
                  fontSize: '0.875rem',
                  fontWeight: selectedAnalysis === analysis.id ? 500 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{analysis.icon}</span>
                <span>{analysis.title}</span>
              </button>
            ))}
          </div>
          
          {/* Analysis Content Panel */}
          {selectedAnalysis && (
            <div style={{
              marginTop: '1rem',
              padding: '1.25rem',
              background: '#1f2937',
              borderRadius: '12px',
              borderLeft: `3px solid ${marketAnalysis.find(a => a.id === selectedAnalysis).color}`,
              animation: 'fadeIn 0.3s ease-in-out'
            }}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: 500,
                color: marketAnalysis.find(a => a.id === selectedAnalysis).color,
                marginBottom: '1rem'
              }}>
                {marketAnalysis.find(a => a.id === selectedAnalysis).title} Analysis
              </h4>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {marketAnalysis.find(a => a.id === selectedAnalysis).insights.map((insight, i) => (
                  <div key={i} style={{
                    padding: '0.75rem',
                    background: 'rgba(31, 41, 55, 0.5)',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <h5 style={{ fontSize: '0.95rem', color: '#e5e7eb', fontWeight: 500 }}>
                        {insight.title}
                      </h5>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.5rem',
                        background: `rgba(${hexToRgb(insight.impactColor)}, 0.1)`,
                        color: insight.impactColor,
                        borderRadius: '4px',
                        fontWeight: 500
                      }}>
                        {insight.impact}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: '1.5' }}>
                      {insight.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ───── MARKET DRIVERS ───── */}
      <section style={cardStyle}>
        <h4 style={subtitleStyle}>Key Market Factors (July 2026)</h4>
        <div style={gridStyle}>
          {growthDrivers.map((item, i) => (
            <div key={i} style={infoCardStyle}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.5rem'
              }}>
                <h4 style={{ color: '#f3f4f6' }}>{item.title}</h4>
                <div style={{
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: '#ef4444',
                  padding: '0.2rem 0.4rem',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '4px'
                }}>
                  IMPACTED
                </div>
              </div>
              <p style={cardContentStyle}>{item.content}</p>
              {item.secondary && <p style={cardContentSecondaryStyle}>{item.secondary}</p>}
              
              {/* Key metrics section */}
              <div style={{
                marginTop: '0.5rem',
                padding: '0.75rem',
                background: 'rgba(17, 24, 39, 0.6)',
                borderRadius: '8px'
              }}>
                <h5 style={{ fontSize: '0.8rem', color: '#93c5fd', marginBottom: '0.75rem' }}>
                  Current Metrics
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {item.keyMetrics.map((metric, j) => (
                    <div key={j} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{metric.label}</span>
                      <span style={{ 
                        fontSize: '0.8rem', 
                        color: metric.value.includes('-') ? '#ef4444' : '#e5e7eb', 
                        fontWeight: 500 
                      }}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ marginTop: '0.75rem' }}>
                <span style={metricLabelStyle}>{item.metric}</span>
                <div style={barOuterStyle}>
                  <div style={{ ...barFillStyle, width: `${item.value}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── CARDANO CASE ───── */}
      <section style={cardStyle}>
        <h4 style={subtitleStyle}>Cardano: Honest Assessment (July 2026)</h4>
        <div style={gridStyle}>
          {cardanoInsights.map((item, i) => (
            <div key={i} style={{
              ...infoCardStyle,
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h4 style={{ color: '#f3f4f6', marginBottom: '0.75rem' }}>{item.title}</h4>
                <p style={cardContentStyle}>{item.content}</p>
                {item.secondary && <p style={{...cardContentSecondaryStyle, marginTop: '0.75rem'}}>{item.secondary}</p>}
              </div>
              
              {item.stat && (
                <div style={{ marginTop: '1rem' }}>
                  <div style={{...statStyle, color: item.stat.includes('+') ? '#22c55e' : '#ef4444'}}>
                    {item.stat}
                  </div>
                  <div style={statLabelStyle}>{item.statLabel}</div>
                </div>
              )}
              
              {item.priceRange && (
                <div style={{ marginTop: '1rem' }}>
                  <div style={priceRangeStyle}>
                    <span>{item.priceRange[0]}</span>
                    <div style={rangeBarStyle} />
                    <span>{item.priceRange[1]}</span>
                  </div>
                  <div style={statLabelStyle}>Year-End Targets (Post-Recovery)</div>
                </div>
              )}
              
              {/* Enhanced metrics chart */}
              {item.chart && (
                <div style={{
                  marginTop: '1.25rem',
                  padding: '0.75rem 1rem',
                  background: 'rgba(17, 24, 39, 0.6)',
                  borderRadius: '8px'
                }}>
                  <h5 style={{ fontSize: '0.8rem', color: '#93c5fd', marginBottom: '0.75rem' }}>
                    {item.chart.title}
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {item.chart.data.map((dataPoint, j) => (
                      <div key={j} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.8rem'
                      }}>
                        <span style={{ color: '#9ca3af' }}>{dataPoint.label}</span>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          <span style={{ 
                            color: dataPoint.value?.includes('-') || dataPoint.current?.includes('-') ? '#ef4444' : '#e5e7eb', 
                            fontWeight: 500 
                          }}>
                            {dataPoint.value || dataPoint.current}
                          </span>
                          {dataPoint.growth && (
                            <span style={{ 
                              color: dataPoint.growth.includes('+') ? '#22c55e' : '#9ca3af', 
                              fontSize: '0.7rem', 
                              marginTop: '0.2rem' 
                            }}>
                              {dataPoint.growth}
                            </span>
                          )}
                          {(dataPoint.rationale || dataPoint.impact) && (
                            <span style={{ color: '#9ca3af', fontSize: '0.7rem', marginTop: '0.2rem' }}>
                              {dataPoint.rationale || dataPoint.impact}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ───── STRATEGIC RECOMMENDATIONS ───── */}
      <section style={cardStyle}>
        <h4 style={subtitleStyle}>Strategic Position (July 2026)</h4>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {strategicRecommendations.map((rec, i) => (
            <div key={i} style={{
              display: 'flex',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#1f2937',
            }}>
              {/* Action tag */}
              <div style={{ 
                padding: '1.25rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: rec.actionColor,
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '0.75rem',
                width: '90px',
                textAlign: 'center'
              }}>
                {rec.action}
              </div>
              
              {/* Content */}
              <div style={{ padding: '1rem 1.25rem', flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <h5 style={{ 
                    fontSize: '1rem', 
                    fontWeight: 500, 
                    marginBottom: '0.5rem',
                    color: '#ffffff'
                  }}>
                    {rec.title}
                  </h5>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.5rem',
                    color: '#9ca3af',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '4px'
                  }}>
                    Target: {rec.targetAllocation}
                  </span>
                </div>
                
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: '#9ca3af',
                  lineHeight: '1.5',
                  marginBottom: '0.75rem'
                }}>
                  {rec.content}
                </p>
                
                <div style={{
                  marginTop: '0.75rem'
                }}>
                  <h6 style={{ 
                    fontSize: '0.8rem', 
                    color: '#93c5fd',
                    marginBottom: '0.5rem'
                  }}>
                    Rationale
                  </h6>
                  <ul style={{
                    paddingLeft: '1rem',
                    marginTop: '0.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}>
                    {rec.rationale.map((point, j) => (
                      <li key={j} style={{
                        fontSize: '0.8rem',
                        color: '#9ca3af',
                        lineHeight: '1.4'
                      }}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── LIVE INTEL CAROUSEL ───── */}
      <LiveIntelCarousel />
    </motion.div>
  );
}

// Helper function to convert hex color to RGB
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

// ─── Styles
const cardStyle = {
  background: '#111827',
  padding: '2rem',
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '1.5rem'
};

const infoCardStyle = {
  background: '#1f2937',
  borderRadius: '16px',
  padding: '1rem 1.25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
};

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#f9fafb'
};

const subtitleStyle = {
  fontSize: '1.125rem',
  fontWeight: 500,
  color: '#93c5fd'
};

const descStyle = {
  fontSize: '0.95rem',
  color: '#d1d5db'
};

const cardContentStyle = {
  fontSize: '0.875rem',
  color: '#9ca3af',
  lineHeight: '1.5'
};

const cardContentSecondaryStyle = {
  fontSize: '0.8rem',
  color: '#6b7280',
  marginTop: '-0.5rem',
  lineHeight: '1.4'
};

const metricLabelStyle = {
  fontSize: '0.75rem',
  color: '#6b7280',
  marginBottom: '0.25rem'
};

const barOuterStyle = {
  height: '6px',
  width: '100%',
  background: '#374151',
  borderRadius: '999px',
  overflow: 'hidden'
};

const barFillStyle = {
  height: '100%',
  background: '#3b82f6',
  borderRadius: '999px'
};

const statStyle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#22c55e'
};

const statLabelStyle = {
  fontSize: '0.75rem',
  color: '#9ca3af',
  marginTop: '0.25rem'
};

const priceRangeStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  marginTop: '0.5rem',
  fontSize: '0.875rem',
  color: '#f3f4f6'
};

const rangeBarStyle = {
  flex: 1,
  height: '6px',
  background: 'linear-gradient(to right, #3b82f6, #2563eb)',
  borderRadius: '999px'
};

// Add animation styles
const styles = document.createElement('style');
styles.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styles);