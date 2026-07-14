import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Auth({ setInvestmentTier }) {
  const [passcode, setPasscode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!passcode) {
      setError('Please enter your passcode');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      const tiers = {
        'VERSO75': 7500,
        'VERSO15': 15000,
        'VERSO16': 16800,
        'VERSO20': 20000,
        'VERSO30': 30000,
      };
      
      const tier = tiers[passcode] || null;
      
      if (tier) {
        setInvestmentTier(tier);
      } else {
        setError('Invalid passcode. Please try again or contact support.');
      }
      
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div style={styles.authContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.authInner}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={styles.authContent}
        >
          {/* Logo from public folder */}
          <div style={styles.authLogo}>
          <img 
  src="/verso-capital-dashboard/logo.png" 
  alt="Verso Logo" 
  style={{
    width: '90px',
    height: 'auto',
    filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.4))'
  }} 
/>
          </div>
        
          <h1 style={styles.authTitle}>VERSO</h1>
          <p style={styles.authSubtitle}>Investment Dashboard</p>
          
          <label style={styles.authInputLabel}>Investor Passcode</label>
          <input
            type="password"
            placeholder="Enter your passcode"
            style={styles.authInput}
            value={passcode}
            onChange={(e) => setPasscode(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            autoFocus
          />
          
          {error && <p style={styles.errorMessage}>{error}</p>}
          
          <button
            onClick={handleLogin}
            disabled={isLoading}
            style={styles.authButtonPrimary}
          >
            {isLoading ? (
              <div style={styles.buttonContent}>
                <div style={styles.loadingSpinner}></div>
                <span>Verifying...</span>
              </div>
            ) : "Access Dashboard"}
          </button>
          
          <div style={styles.authDivider}>
            <span>or</span>
          </div>
          
          <button
            onClick={() => window.open('mailto:support@versocapital.com')}
            style={styles.authButton}
          >
            Contact Support
          </button>
        </motion.div>
        
        <div style={styles.authFooter}>
          <p>© 2025 Verso Capital · <a href="#" style={styles.footerLink}>Privacy Policy</a> · <a href="#" style={styles.footerLink}>Terms of Service</a></p>
        </div>
      </motion.div>
    </div>
  );
}

// Inline styles
const styles = {
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#0a0f1a',
  },
  authInner: {
    backgroundColor: '#111827',
    borderRadius: '1.5rem',
    padding: '3rem',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  authContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  authLogo: {
    margin: '0 auto 1.5rem',
  },
  authTitle: {
    fontSize: '2.5rem',
    letterSpacing: '0.1em',
    fontWeight: 700,
    color: '#f3f4f6',
    marginBottom: '0.5rem',
  },
  authSubtitle: {
    color: '#9ca3af',
    fontSize: '1rem',
    marginBottom: '2rem',
  },
  authInputLabel: {
    display: 'block',
    textAlign: 'left',
    marginBottom: '0.5rem',
    color: '#9ca3af',
    fontSize: '0.875rem',
  },
  authInput: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    backgroundColor: '#1f2937',
    color: '#f3f4f6',
    fontSize: '1rem',
    outline: 'none',
    marginBottom: '1.5rem',
    transition: 'border-color 0.2s ease',
  },
  authButton: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    backgroundColor: '#1f2937',
    color: '#f3f4f6',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  authButtonPrimary: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: '#f3f4f6',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  authDivider: {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem 0',
    position: 'relative',
  },
  authFooter: {
    marginTop: 'auto',
    color: '#6b7280',
    fontSize: '0.75rem',
  },
  footerLink: {
    color: '#6b7280',
    textDecoration: 'none',
  },
  errorMessage: {
    color: '#f87171',
    textAlign: 'left',
    fontSize: '0.8rem',
    marginBottom: '1rem',
  },
  loadingSpinner: {
    width: '1rem',
    height: '1rem',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: '#fff',
    animation: 'spin 1s ease-in-out infinite',
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  }
};