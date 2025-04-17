import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMBED_ITEMS = [
  {
    type: 'tweet',
    tweetId: '1910019757853618248', // ADA Mastercard
    analysis: {
      summary: 'Cardano expanding into global payments via Mastercard integration, significantly increasing ADA utility.',
      impact: 'High — Mainstream adoption through 150M+ merchant access points.',
    }
  },
  {
    type: 'tweet',
    tweetId: '1909677090439315684', // ADA dominance
    analysis: {
      summary: 'Technical analysis showing positive trend in ADA market dominance, suggesting bullish price action.',
      impact: 'Medium — Technical indicators support long-term price appreciation.',
    }
  },
  {
    type: 'tweet',
    tweetId: '1897017740499767666', // ADA outperforming tech stocks
    analysis: {
      summary: 'ADA has outperformed major tech stocks by over 100% in a 6-month period.',
      impact: 'High — Demonstrates cryptos potential for outsized returns versus traditional investments.',
    }
  },
  {
    type: 'tweet',
    tweetId: '1909229834535874833', // Ripple tweet
    analysis: {
      summary: 'Tokenization is emerging as the next macro megatrend...',
      impact: 'High — Ripple shows a coin with the Cardano logo at the beginning of the video hinting a potential partnership.',
    }
  },
  {
    type: 'news',
    url: 'https://cryptobriefing.com/cardano-announces-smart-city-pilot/',
    title: 'Cardano Announces Smart City Pilot Program',
    excerpt: 'A landmark move for blockchain-based governance...',
    analysis: {
      summary: 'Cardano continues positioning itself in public infrastructure.',
      impact: 'Medium — Signals real-world utility adoption.',
    },
  }
];

export default function LiveIntelCarousel() {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const tweetContainersRef = useRef({});
  const isFirstRender = useRef(true);
  const autoRotateRef = useRef(true);
  const timerRef = useRef(null);

  const currentItem = EMBED_ITEMS[index];

  // Initialize tweet containers for each tweet
  useEffect(() => {
    // Create refs for all tweet containers
    EMBED_ITEMS.forEach((item, i) => {
      if (item.type === 'tweet') {
        tweetContainersRef.current[i] = tweetContainersRef.current[i] || React.createRef();
      }
    });
    
    // Load Twitter script if not already loaded
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      
      // Add script to document
      document.head.appendChild(script);
      
      script.onload = () => {
        // Load all tweets initially (pre-cache them)
        EMBED_ITEMS.forEach((item, i) => {
          if (item.type === 'tweet' && tweetContainersRef.current[i]?.current) {
            loadTweet(item.tweetId, tweetContainersRef.current[i].current, i === index);
          }
        });
      };
    } else if (window.twttr?.widgets) {
      // If Twitter is already loaded, initialize tweets
      EMBED_ITEMS.forEach((item, i) => {
        if (item.type === 'tweet' && tweetContainersRef.current[i]?.current) {
          loadTweet(item.tweetId, tweetContainersRef.current[i].current, i === index);
        }
      });
    }
    
    isFirstRender.current = false;
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Function to load a tweet
  const loadTweet = (tweetId, container, isVisible) => {
    if (!container || !window.twttr?.widgets) return;
    
    // Clear the container first
    container.innerHTML = '';
    
    if (isVisible) {
      setIsLoading(true);
    }
    
    // Create the tweet
    window.twttr.widgets.createTweet(
      tweetId,
      container,
      { 
        theme: 'dark',
        dnt: true,
        align: 'center'
      }
    ).then(() => {
      if (isVisible) {
        setIsLoading(false);
      }
    }).catch(err => {
      console.error('Error loading tweet:', tweetId, err);
      if (isVisible) {
        setIsLoading(false);
      }
    });
  };

  // Update visibility when index changes
  useEffect(() => {
    // Only show current tweet
    EMBED_ITEMS.forEach((item, i) => {
      if (tweetContainersRef.current[i]?.current) {
        if (i === index) {
          tweetContainersRef.current[i].current.style.display = 'block';
          
          // Make sure the tweet is loaded
          if (item.type === 'tweet') {
            loadTweet(item.tweetId, tweetContainersRef.current[i].current, true);
          } else {
            setIsLoading(false);
          }
        } else {
          tweetContainersRef.current[i].current.style.display = 'none';
        }
      }
    });
  }, [index]);
  
  // Auto cycle through items
  useEffect(() => {
    if (autoRotateRef.current) {
      timerRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % EMBED_ITEMS.length);
      }, 15000); // Increased time to 15 seconds to give tweets more time to load
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [index]);

  const handlePrev = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    autoRotateRef.current = false;
    setIndex((prev) => (prev - 1 + EMBED_ITEMS.length) % EMBED_ITEMS.length);
  };
  
  const handleNext = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    autoRotateRef.current = false;
    setIndex((prev) => (prev + 1) % EMBED_ITEMS.length);
  };

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
        <h3 style={{ color: '#f3f4f6', fontSize: '1.25rem', fontWeight: 600 }}>
          🔍 Live Market Intelligence
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>
            {index + 1}/{EMBED_ITEMS.length}
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '0.5rem' }}>
            <button onClick={handlePrev} style={navButtonStyle}>⟨</button>
            <button onClick={handleNext} style={navButtonStyle}>⟩</button>
          </div>
        </div>
      </div>

      {/* Embed Block */}
      <div style={{
        background: '#1f2937',
        borderRadius: '12px',
        padding: '1rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
        minHeight: '300px',
        position: 'relative',
        overflow: 'hidden',
      }}>
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
        
        {/* Pre-render all tweets but hide them */}
        {EMBED_ITEMS.map((item, i) => (
          <div 
            key={i} 
            ref={item.type === 'tweet' ? tweetContainersRef.current[i] : null}
            style={{ 
              display: i === index ? 'block' : 'none',
              minHeight: item.type === 'tweet' ? '250px' : 'auto', 
              width: '100%',
              marginTop: item.type === 'tweet' ? '10px' : '0',
            }}
          >
            {item.type === 'news' && (
              <div style={{ padding: '1rem' }}>
                <a href={item.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '1rem', fontWeight: 600, color: '#3b82f6', textDecoration: 'none' }}
                >
                  {item.title}
                </a>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                  {item.excerpt}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Insight Block */}
      <div style={{
        background: '#1e293b',
        padding: '1rem',
        borderRadius: '12px',
        fontSize: '0.875rem',
        color: '#d1d5db'
      }}>
        <p><strong>Why this matters:</strong> {currentItem.analysis.summary}</p>
        <p><strong>Projected Impact:</strong> <span style={{ color: '#3b82f6' }}>{currentItem.analysis.impact}</span></p>
      </div>
    </motion.div>
  );
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