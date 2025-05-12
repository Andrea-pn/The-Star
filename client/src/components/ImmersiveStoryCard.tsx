import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ImmersiveStoryCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  category: string;
  link: string;
  featured?: boolean;
  direction?: 'left' | 'right';
}

const ImmersiveStoryCard = ({
  title,
  excerpt,
  imageUrl,
  date,
  category,
  link,
  featured = false,
  direction = 'left',
}: ImmersiveStoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const imageOffset = useTransform(
    scrollYProgress, 
    [0, 1],
    [direction === 'left' ? 40 : -40, 0]
  );
  
  const contentOffset = useTransform(
    scrollYProgress, 
    [0, 1],
    [direction === 'left' ? -40 : 40, 0]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    [0, 1, 1]
  );

  if (featured) {
    return (
      <motion.div
        ref={cardRef}
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white h-[500px] group"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background image with parallax effect */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: imageOffset }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.7s ease-out'
            }}
          />
        </motion.div>
        
        {/* Content */}
        <motion.div 
          className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12"
          style={{ y: contentOffset, opacity }}
        >
          <div className="mb-4">
            <Badge className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 text-sm mb-4">
              {category}
            </Badge>
          </div>
          
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl mb-4 max-w-lg">
            {title}
          </h2>
          
          <p className="text-gray-200 mb-6 max-w-lg line-clamp-2">
            {excerpt}
          </p>
          
          <div className="flex items-center text-sm text-gray-300 mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{date}</span>
          </div>
          
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <a
              href={link}
              className="inline-flex items-center text-white text-lg font-medium hover:text-blue-300 transition-colors"
            >
              Read Full Story <ArrowRight className="ml-2" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      ref={cardRef}
      className={`flex flex-col md:flex-row ${direction === 'right' ? 'md:flex-row-reverse' : ''} gap-6 md:gap-10 relative overflow-hidden`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <motion.div 
        className="md:w-1/2 relative overflow-hidden rounded-xl"
        style={{ y: imageOffset }}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 aspect-video md:aspect-square"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.7s ease-out'
          }}
        />
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="md:w-1/2 flex flex-col justify-center"
        style={{ y: contentOffset, opacity }}
      >
        <div className="flex items-center mb-3">
          <Badge variant="outline" className="mr-2">
            {category}
          </Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{date}</span>
          </div>
        </div>
        
        <h2 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-6 line-clamp-3">
          {excerpt}
        </p>
        
        <motion.div
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href={link}
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            Read Full Story <ArrowRight className="ml-2" />
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ImmersiveStoryCard;