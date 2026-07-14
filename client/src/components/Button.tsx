// components/Button.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 4 } },
    hover: {
      scale: 1.05,
      boxShadow: '1px 1px 13px #20232e, -1px -1px 13px #545b78',
      color: '#d6d6d6',
      transition: { duration: 0.5 },
    },
    tap: {
      scale: 0.95,
      boxShadow: '1px 1px 13px #20232e, -1px -1px 33px #545b78',
      color: '#d6d6d6',
      transition: { duration: 0.1 },
    },
  };

  return (
    <motion.button
      className="codepen-button"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
    >
      <span>{label}</span>
    </motion.button>
  );
};

export default Button;