import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const EMBED_ITEMS = [
  {
    type: 'tweet',
    tweetId: '1913272517126480069', // Bitcoin DeFi on Cardano
    analysis: {
      summary: 'Cardano positioning to become a leading platform for Bitcoin DeFi indicates potential growth in cross-chain utility, though timing amid current market conditions remains challenging.',
      impact: 'Medium — Long-term strategic positioning despite short-term market volatility.',
    }
  },
  {
    type: 'tweet',
    tweetId: '1913323323355709501', // Hoskinson on BTC $250k prediction
    analysis: {
      summary: 'While Hoskinson and his optimistic price targets provide a bullish long-term thesis, investors should balance such projections against current geopolitical headwinds and market reality.',
      impact: 'Mixed — Positive long-term outlook must be tempered with near-term caution.',
    }
  },
  {
    type: 'tweet',
    tweetId: '1910019757853618248', // ADA Mastercard
    analysis: {
      summary: 'Mastercard integration represents significant real-world adoption milestone. Such infrastructure developments often provide foundation for recovery once market sentiment improves.',
      impact: 'Positive — Strategic partnership enhancing fundamental value proposition.',
    }
  },
  {
    type: 'tweet',
    tweetId: '1909677090439315684', // ADA dominance
    analysis: {
      summary: 'Technical analysis of ADA dominance metrics suggests potential for relative outperformance during recovery phase, though immediate price action remains subject to broader market conditions.',
      impact: 'Neutral — Constructive technicals amid challenging market environment.',
    }
  },
  {
    type: 'tweet',
    tweetId: '1897017740499767666', // ADA outperforming tech stocks
    analysis: {
      summary: 'While historical outperformance versus tech stocks is notable, recent market correction highlights crypto heightened volatility in both directions. Risk management remains essential.',
      impact: 'Mixed — Historical strength with recent significant retracement.',
    }
  },
  {
    type: 'tweet',
    tweetId: '1909229834535874833', // Ripple tweet
    analysis: {
      summary: 'Possible collaboration between Ripple and Cardano would enhance interoperability across blockchain ecosystems. Partnerships become increasingly important during market consolidation phases.',
      impact: 'Potential — Requires confirmation but aligns with cross-chain strategy.',
    }
  }
];

export default function LiveIntelCarousel() {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null); // For locked state
  const tweetContainerRef = useRef(null);
  const timerRef = useRef(null);
  const scriptRef = useRef(null);
  const twitterReadyRef = useRef(false);

  const currentItem = EMBED_ITEMS[selectedItemIndex !== null ? selectedItemIndex : index];

  // Function to safely load Twitter widgets script
  const loadTwitterScript = () => {
    return new Promise((resolve) => {
      // Clear existing script if needed
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current);
        scriptRef.current = null;
      }

      // Don't reload if window.twttr is already defined and ready
      if (window.twttr && window.twttr.widgets) {
        twitterReadyRef.current = true;
        return resolve();
      }

      // Create new script element
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      
      // Set up load callback
      script.onload = () => {
        twitterReadyRef.current = true;
        resolve();
      };
      
      script.onerror = () => {
        console.error('Failed to load Twitter widgets script');
        resolve(); // Resolve anyway to prevent blocking
      };
      
      // Add script to document
      document.head.appendChild(script);
      scriptRef.current = script;
    });
  };

  // Function to render a tweet
  const renderTweet = async (tweetId) => {
    const container = tweetContainerRef.current;
    if (!container) return;

    // Clear existing content
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    setIsLoading(true);
    
    try {
      // Make sure Twitter script is loaded
      if (!twitterReadyRef.current) {
        await loadTwitterScript();
      }
      
      // Wait a short delay to ensure Twitter widgets is fully initialized
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (!window.twttr || !window.twttr.widgets) {
        console.error('Twitter widgets not available');
        setIsLoading(false);
        return;
      }
      
      // Create placeholder for tweet
      const tweetContainer = document.createElement('div');
      tweetContainer.style.minHeight = '250px';
      container.appendChild(tweetContainer);
      
      // Render tweet in placeholder
      await window.twttr.widgets.createTweet(
        tweetId,
        tweetContainer,
        { 
          theme: 'dark',
          dnt: true,
          align: 'center'
        }
      );
    } catch (error) {
      console.error('Error rendering tweet:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initialize Twitter widgets when component mounts
  useEffect(() => {
    loadTwitterScript()
      .then(() => {
        renderTweet(currentItem.tweetId);
      });
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Handle change of displayed tweet
  useEffect(() => {
    if (currentItem.type === 'tweet') {
      renderTweet(currentItem.tweetId);
    } else {
      setIsLoading(false);
    }
  }, [index, selectedItemIndex]);
  
  // Setup auto-rotation timer
  useEffect(() => {
    if (selectedItemIndex === null) {
      timerRef.current = setTimeout(() => {
        setIndex(prev => (prev + 1) % EMBED_ITEMS.length);
      }, 15000);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [index, selectedItemIndex]);

  // Handle tweet container click
  const handleTweetClick = () => {
    if (currentItem.type !== 'tweet') return;
    
    if (selectedItemIndex === index) {
      setSelectedItemIndex(null);
    } else {
      setSelectedItemIndex(index);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  };

  // Navigation handlers
  const handlePrev = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((prev) => (prev - 1 + EMBED_ITEMS.length) % EMBED_ITEMS.length);
    } else {
      setIndex((prev) => (prev - 1 + EMBED_ITEMS.length) % EMBED_ITEMS.length);
    }
  };
  
  const handleNext = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((prev) => (prev + 1) % EMBED_ITEMS.length);
    } else {
      setIndex((prev) => (prev + 1) % EMBED_ITEMS.length);
    }
  };

  // Get the current display index (either locked or auto-rotating)
  const displayIndex = selectedItemIndex !== null ? selectedItemIndex : index;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: '#111827',
        padding: '2rem',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h3 style={{ color: '#f3f4f6', fontSize: '1.25rem', fontWeight: 600 }}>
            🔍 Market Intelligence Feed
          </h3>
          {selectedItemIndex !== null && (
            <span style={{
              fontSize: '0.7rem',
              padding: '0.2rem 0.5rem',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#f59e0b',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#f59e0b'
              }}></span>
              LOCKED
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>
            {displayIndex + 1}/{EMBED_ITEMS.length}
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '0.5rem' }}>
            <button onClick={handlePrev} style={navButtonStyle}>⟨</button>
            <button onClick={handleNext} style={navButtonStyle}>⟩</button>
            {selectedItemIndex !== null && (
              <button 
                onClick={() => setSelectedItemIndex(null)} 
                style={{
                  ...navButtonStyle,
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#f59e0b'
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Embed Block */}
      <div 
        style={{
          background: '#1f2937',
          borderRadius: '12px',
          padding: '1rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
          minHeight: '300px',
          position: 'relative',
          overflow: 'hidden',
          cursor: selectedItemIndex === null && currentItem.type === 'tweet' ? 'pointer' : 'default'
        }}
        onClick={handleTweetClick}
      >
        {isLoading && (
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            color: '#6b7280',
            zIndex: 10
          }}>
            Loading...
          </div>
        )}
        
        <div 
          ref={tweetContainerRef}
          style={{ 
            width: '100%',
            height: '100%',
            position: 'relative',
            minHeight: '250px'
          }}
        />
        
        {!isLoading && selectedItemIndex === null && currentItem.type === 'tweet' && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            zIndex: 5
          }}>
            Click to lock view
          </div>
        )}
        
        {currentItem.type === 'news' && (
          <div style={{ padding: '1rem' }}>
            <a href={currentItem.url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '1rem', fontWeight: 600, color: '#3b82f6', textDecoration: 'none' }}
            >
              {currentItem.title}
            </a>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.5rem' }}>
              {currentItem.excerpt}
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Insight Block */}
      <div style={{
        background: '#1e293b',
        padding: '1rem',
        borderRadius: '12px',
        fontSize: '0.875rem',
        color: '#d1d5db'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem'
        }}>
          <h4 style={{ fontSize: '0.95rem', color: '#f3f4f6', fontWeight: 500 }}>
            Market Context
          </h4>
          <span style={{
            fontSize: '0.7rem',
            padding: '0.1rem 0.5rem',
            borderRadius: '4px',
            background: getImpactBackground(currentItem.analysis.impact),
            color: getImpactColor(currentItem.analysis.impact)
          }}>
            {currentItem.analysis.impact.split(' — ')[0]}
          </span>
        </div>
        <p style={{ marginBottom: '0.75rem', lineHeight: '1.5' }}>{currentItem.analysis.summary}</p>
        <p style={{ fontSize: '0.8rem', color: '#9ca3af', borderTop: '1px solid rgba(75, 85, 99, 0.4)', paddingTop: '0.75rem' }}>
          <span style={{ fontWeight: 500, color: '#d1d5db' }}>Insight:</span> {currentItem.analysis.impact.split(' — ')[1] || 'Analysis ongoing.'}
        </p>
      </div>
    </motion.div>
  );
}

// Helper function to get impact color
function getImpactColor(impact) {
  const impactType = impact.split(' — ')[0].toLowerCase();
  
  if (impactType.includes('high') || impactType.includes('positive')) return '#22c55e';
  if (impactType.includes('medium') || impactType.includes('neutral')) return '#f59e0b';
  if (impactType.includes('low') || impactType.includes('negative')) return '#ef4444';
  if (impactType.includes('mixed')) return '#a78bfa';
  if (impactType.includes('potential')) return '#3b82f6';
  
  return '#6b7280';
}

// Helper function to get impact background
function getImpactBackground(impact) {
  const impactType = impact.split(' — ')[0].toLowerCase();
  
  if (impactType.includes('high') || impactType.includes('positive')) return 'rgba(34, 197, 94, 0.1)';
  if (impactType.includes('medium') || impactType.includes('neutral')) return 'rgba(245, 158, 11, 0.1)';
  if (impactType.includes('low') || impactType.includes('negative')) return 'rgba(239, 68, 68, 0.1)';
  if (impactType.includes('mixed')) return 'rgba(167, 139, 250, 0.1)';
  if (impactType.includes('potential')) return 'rgba(59, 130, 246, 0.1)';
  
  return 'rgba(107, 114, 128, 0.1)';
}

const navButtonStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: 'none',
  color: '#f9fafb',
  fontSize: '1rem',
  borderRadius: '8px',
  padding: '0.25rem 0.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px'
};