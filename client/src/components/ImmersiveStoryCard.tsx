import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CalendarDays, ExternalLink } from 'lucide-react';
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
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Create parallax effect for the text content
  const textX = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'left' ? [-50, 50] : [50, -50]
  );
  
  // Create parallax effect for the image
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  
  // Layer opacity effect
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);
  
  return (
    <motion.div
      ref={cardRef}
      className="relative w-full overflow-hidden rounded-xl shadow-xl h-[500px] group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      {/* Background image with parallax effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ scale: imageScale, y: imageY }}
      >
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700"
        />
      </motion.div>
      
      {/* Gradient overlay */}
      <motion.div 
        className={`absolute inset-0 ${
          direction === 'left' 
            ? 'bg-gradient-to-r from-black via-black/70 to-transparent' 
            : 'bg-gradient-to-l from-black via-black/70 to-transparent'
        }`}
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Content */}
      <motion.div
        className={`absolute inset-0 flex items-center ${direction === 'left' ? 'justify-start' : 'justify-end'} p-8 text-white`}
        style={{ x: textX }}
      >
        <div className={`max-w-md ${direction === 'right' ? 'text-right' : 'text-left'}`}>
          <div className="mb-4 flex items-center space-x-2">
            <Badge variant="outline" className="border-white text-white">
              {category}
            </Badge>
            {featured && (
              <Badge className="bg-[hsl(var(--primary-yellow))] text-black font-medium">
                Featured
              </Badge>
            )}
          </div>
          
          <h3 className="text-3xl font-bold mb-3 leading-tight">{title}</h3>
          
          <div className="flex items-center text-sm text-gray-300 mb-4">
            <CalendarDays className="w-4 h-4 mr-2" />
            <span>{date}</span>
          </div>
          
          <p className="text-gray-200 mb-6 line-clamp-3">
            {excerpt}
          </p>
          
          <motion.a
            href={link}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors duration-300"
            whileHover={{ x: direction === 'left' ? 5 : -5 }}
          >
            Read Full Story
            <ExternalLink className="w-4 h-4 ml-2" />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImmersiveStoryCard;