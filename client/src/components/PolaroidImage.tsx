import { useState } from "react";
import { motion } from "framer-motion";

type PolaroidImageProps = {
  src: string;
  alt: string;
  caption: string;
  rotation?: number;
};

const PolaroidImage = ({ src, alt, caption, rotation = 0 }: PolaroidImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate a random rotation between -3 and 3 degrees if not provided
  const randomRotation = rotation || Math.floor(Math.random() * 7 - 3);
  
  return (
    <motion.div
      className="bg-white p-3 pb-10 shadow-lg relative cursor-pointer"
      style={{ transformOrigin: "center" }}
      initial={{ rotate: randomRotation }}
      whileHover={{ 
        rotate: 0,
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.3 }}
    >
      <div className="overflow-hidden">
        <motion.img 
          src={src} 
          alt={alt}
          className="w-full h-64 object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="text-center font-montserrat mt-3 text-lg leading-tight">{caption}</p>
    </motion.div>
  );
};

export default PolaroidImage;
