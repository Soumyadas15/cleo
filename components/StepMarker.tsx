import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StepMarkerProps {
    step: number;
    currentStep: number;
}
export const StepMarker = ({ 
    step, 
    currentStep 
}: StepMarkerProps) => {
  const isCompleted = step <= currentStep;
  return (
    <div className="absolute -top-8 text-sm">
      <AnimatePresence exitBeforeEnter>
        {isCompleted ? (
          <motion.span
            key="tick"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-green-500"
          >
            ✓
          </motion.span>
        ) : (
          <motion.span
            key="number"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-blue-500"
          >
            {step}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
