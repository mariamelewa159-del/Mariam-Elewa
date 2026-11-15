import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface PageTransitionCurtainProps {
  isVisible: boolean;
}

export const PageTransitionCurtain: React.FC<PageTransitionCurtainProps> = ({ isVisible }) => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Upper Charcoal Curtain Panel */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 top-0 h-1/2 border-b border-[#C8A15A]/45 bg-[#121110]"
          />

          {/* Lower Charcoal Curtain Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 bottom-0 h-1/2 border-t border-[#C8A15A]/45 bg-[#121110]"
          />

          {/* Center Emblem Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.28, delay: 0.08 }}
            className="relative z-10 flex flex-col items-center gap-2 text-center"
          >
            <div className="h-px w-14 bg-[#C8A15A]/70" />
            <span className="font-display text-2xl font-semibold tracking-wider text-[#F5EFE6] sm:text-3xl">
              {t.brand}
            </span>
            <div className="h-px w-14 bg-[#C8A15A]/70" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
