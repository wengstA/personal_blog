"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  return (
    <div className="group relative rounded-2xl overflow-hidden">
      {/* Enhanced frosted glass background with subtle gradient border for dark mode */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-slate-800/30 dark:to-slate-900/30 opacity-80 dark:opacity-90"></div>
      
      {/* Subtle glow effect for dark mode to make cards stand out */}
      <div className="absolute -inset-0.5 dark:bg-gradient-to-r dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-2xl blur opacity-0 dark:group-hover:opacity-100 transition duration-300"></div>
      
      <motion.div
        className={cn(
          "relative rounded-2xl overflow-hidden backdrop-blur-lg border flex flex-col", 
          "bg-white/70 dark:bg-slate-900/60 dark:backdrop-blur-xl",
          "dark:border-slate-700/40 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]",
          className
        )}
        whileHover={{
          y: -10,
          boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
          transition: { duration: 0.3, ease: 'easeOut' }
        }}
        initial={{
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)'
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
