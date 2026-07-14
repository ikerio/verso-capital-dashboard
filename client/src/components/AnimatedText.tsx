// components/AnimatedText.tsx
'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';


const AnimatedText: React.FC = () => {
  const welcomeText = 'Welcome to';
  const versoText = 'VERSO';
  const [showButtons, setShowButtons] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const handleAnimationComplete = () => {
    setShowButtons(true);
  };

  return (
    <div className="relative">
      <motion.div
        className="flex flex-col items-start justify-center space-y-2"
        variants={container}
        initial="hidden"
        animate="visible"
        onAnimationComplete={handleAnimationComplete}
      >
        <motion.h2 className={` text-4xl font-medium text-white`}>
          {welcomeText.split('').map((letter, index) => (
            <motion.span key={index} variants={child}>
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h2>
        <motion.h1
          className="text-[12rem] font-bold bg-clip-text text-transparent ml-8"
          style={{
            backgroundImage: 'linear-gradient(270deg, #8e44ad, #3498db)',
            backgroundSize: '400% 400%',
            animation: 'moveGradient 3s ease infinite',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {versoText.split('').map((letter, index) => (
            <motion.span key={index} variants={child}>
              {letter}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
      <AnimatePresence>
        {showButtons && (
          <motion.div
            className="absolute top-0 right-0 flex space-x-4 mt-8 mr-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Button label="Contact" />
            <Button label="App" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedText;