import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRightIcon, Tag } from 'lucide-react';

interface ModernContentCardProps {
  post_title: string;
  excerpt: string;
  content: string
  imageUrl: string;
  date?: string;
  category?: string;
  tags?: string[];
  link: string;
  variant?: 'default' | 'compact' | 'feature';
  aspectRatio?: 'square' | 'video' | 'wide';
}

const ModernContentCard = ({
  post_title,
  excerpt,
  content,
  imageUrl,
  date,
  category,
  tags = [],
  link,
  variant = 'default',
  aspectRatio = 'square',
}: ModernContentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[3/2]',
  };
  
  const cardVariants = {
    default: {
      card: "overflow-hidden rounded-xl shadow-lg bg-white flex flex-col",
      imageContainer: "overflow-hidden",
      image: `${aspectRatioClasses[aspectRatio]} object-cover w-full transition-transform duration-700`,
      content: "p-6 flex-1 flex flex-col",
      post_title: "font-montserrat font-bold text-xl mb-2 line-clamp-2 text-gray-800",
      excerpt: "text-gray-600 mb-4 line-clamp-3 text-sm flex-1",
      meta: "flex items-center text-xs text-gray-500 mt-auto",
    },
    compact: {
      card: "overflow-hidden rounded-lg shadow-md bg-white flex flex-row h-32",
      imageContainer: "overflow-hidden w-1/3",
      image: "h-full w-full object-cover transition-transform duration-700",
      content: "p-4 flex-1 flex flex-col",
      post_title: "font-montserrat font-bold text-lg mb-1 line-clamp-2 text-gray-800",
      excerpt: "text-gray-600 line-clamp-2 text-sm flex-1",
      meta: "flex items-center text-xs text-gray-500 mt-auto",
    },
    feature: {
      card: "overflow-hidden rounded-xl shadow-xl bg-gradient-to-br from-blue-100 to-white group flex flex-col",
      imageContainer: "overflow-hidden relative",
      image: `${aspectRatioClasses[aspectRatio]} object-cover w-full transition-transform duration-700`,
      content: "p-6 flex-1 flex flex-col relative z-10",
      post_title: "font-montserrat font-bold text-2xl mb-3 line-clamp-2 text-gray-800",
      excerpt: "text-gray-600 mb-4 line-clamp-3 flex-1",
      meta: "flex items-center text-sm text-gray-500 mt-auto",
    },
  };
  
  const styles = cardVariants[variant];
  
  return (
    <motion.div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.imageContainer}>
        <motion.img
          src={imageUrl}
          alt={post_title}
          className={styles.image}
          animate={{ scale: isHovered ? 1.05 : 1 }}
        />
        {variant === 'feature' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        {category && variant === 'feature' && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
            {category} 
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        {category && variant !== 'feature' && (
          <div className="text-xs font-medium text-blue-600 mb-1">
            {category} 
          </div>
        )}
        
        <h3 className={styles.post_title}>{post_title}</h3>
        
        <p className={styles.excerpt}>
          {content}
        </p>
        
        <div className={styles.meta}>
          {date && (
            <div className="flex items-center mr-4">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{date}</span>
            </div>
          )}
          
          {tags.length > 0 && variant !== 'compact' && (
            <div className="flex items-center">
              <Tag className="w-3 h-3 mr-1" />
              <span>{tags.slice(0, 2).join(', ')}{tags.length > 2 ? '...' : ''}</span>
            </div>
          )}
          
          <motion.div 
            className="ml-auto"
            animate={{ x: isHovered ? 3 : 0 }}
          >
            <a
              href={link}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              {variant === 'compact' ? (
                <ArrowRightIcon className="w-4 h-4" />
              ) : (
                <>
                  Read more
                  <ArrowRightIcon className="w-3 h-3 ml-1" />
                </>
              )}
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernContentCard;