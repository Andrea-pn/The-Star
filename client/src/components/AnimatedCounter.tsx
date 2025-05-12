import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedCounterProps {
  value: number;
  duration?: number; // in seconds
  prefix?: string;
  suffix?: string;
  formatFn?: (value: number) => string;
  className?: string;
}

export const AnimatedCounter = ({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  formatFn,
  className = '',
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useIntersectionObserver();
  const countRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  
  const formatValue = (val: number): string => {
    if (formatFn) {
      return formatFn(val);
    }
    
    if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + 'M';
    } else if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'K';
    }
    
    return val.toString();
  };
  
  useEffect(() => {
    // Reset animation if value changes
    setHasAnimated(false);
    countRef.current = 0;
    setCount(0);
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, [value]);
  
  useEffect(() => {
    // Only start animation when in view and hasn't animated yet
    if (inView && !hasAnimated) {
      setHasAnimated(true);
      
      const startTime = performance.now();
      const endTime = startTime + duration * 1000;
      
      const updateCount = (currentTime: number) => {
        if (currentTime >= endTime) {
          setCount(value);
          return;
        }
        
        const progress = (currentTime - startTime) / (duration * 1000);
        const easedProgress = easeOutCubic(progress);
        const nextCount = Math.min(Math.floor(value * easedProgress), value);
        
        if (countRef.current !== nextCount) {
          countRef.current = nextCount;
          setCount(nextCount);
        }
        
        rafRef.current = requestAnimationFrame(updateCount);
      };
      
      rafRef.current = requestAnimationFrame(updateCount);
      
      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };
    }
  }, [inView, hasAnimated, value, duration]);
  
  // Easing function for smoother animation
  const easeOutCubic = (x: number): number => {
    return 1 - Math.pow(1 - x, 3);
  };
  
  return (
    <div ref={ref} className={className}>
      <span className="animate-pulse-slow">
        {prefix}
        {formatValue(count)}
        {suffix}
      </span>
    </div>
  );
};

export default AnimatedCounter;