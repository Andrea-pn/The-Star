import React from 'react';
import { motion } from 'framer-motion';
import separatorImage from "../assets/section-separator.png";

type SectionSeparatorProps = {
  className?: string;
  color?: string;
};

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ 
  className = '',
  color = 'white' 
}) => {
  return (
    <div 
      className={`relative w-full overflow-hidden h-16 ${className}`} 
      style={{ backgroundColor: color }}
    >
      <motion.div 
        className="w-full h-full bg-no-repeat bg-center bg-contain"
        style={{ 
          backgroundImage: `url(${separatorImage})`, 
          backgroundSize: '100% auto',
          backgroundPosition: 'center bottom'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default SectionSeparator;