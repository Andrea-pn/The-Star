import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
  formatFn = (val) => val.toString(),
  className = '',
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  
  // Reset counter when value changes or when first in view
  useEffect(() => {
    if (!inView) return;
    
    let startTime: number | null = null;
    let animationFrameId: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * value);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };
    
    animationFrameId = requestAnimationFrame(step);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration, inView]);
  
  return (
    <motion.div 
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix}{formatFn(count)}{suffix}
    </motion.div>
  );
};

export default AnimatedCounter;