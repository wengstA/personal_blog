"use client";

import { useEffect } from 'react';

// This component fixes hydration issues by ensuring styles are applied only on the client
export function FixHydration() {
  useEffect(() => {
    // Apply the overscroll behavior using camelCase in pure JS after hydration
    document.body.style.overscrollBehaviorX = 'auto';
  }, []);
  
  return null; // This component doesn't render anything
}
