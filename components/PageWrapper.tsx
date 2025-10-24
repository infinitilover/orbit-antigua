'use client';

import { motion } from 'framer-motion';
import React from 'react';

const PageWrapper = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className={`flex-grow pt-20 ${className}`}
    >
      {children}
    </motion.main>
  );
};

export default PageWrapper;