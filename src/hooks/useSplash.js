import { useState, useEffect } from 'react';


/**
 * useSplash — Controls one-time splash screen display.
 *
 * Best-practice rules:
 *  1. Only shows the splash ONCE per browser session (sessionStorage guard).
 *  2. On subsequent navigations / remounts it immediately returns false.
 *  3. Cleans up the timer on unmount to prevent memory leaks.
 *
 * @param {number} delay - Duration in ms before hiding the splash (default: 3000)
 * @returns {boolean} true while splash should be visible, false when done
 */
const useSplash = (delay = 3000) => {
  // If splash was already shown this session, skip it immediately

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  },);

  return isLoading;
};

export default useSplash;
