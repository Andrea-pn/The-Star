import { motion } from "framer-motion";

type TornPaperEdgeProps = {
  direction?: "top" | "bottom";
  color?: string;
};

const TornPaperEdge = ({ direction = "bottom", color = "white" }: TornPaperEdgeProps) => {
  // SVG for torn paper effect
  const svgPath = "M0,0 C120,20 280,48 420,30 C560,12 740,0 900,18 C1060,36 1320,12 1440,0 L1440,48 L0,48 Z";
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`absolute ${
        direction === "top" ? "top-0 rotate-180" : "bottom-0"
      } left-0 w-full h-12 z-10 pointer-events-none overflow-hidden`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="absolute w-full h-full"
      >
        <path d={svgPath} fill={color} />
      </svg>
    </motion.div>
  );
};

export default TornPaperEdge;
