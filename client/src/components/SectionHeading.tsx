import { motion } from "framer-motion";

type SectionHeadingProps = {
  children: React.ReactNode;
  color?: "dark" | "white";
  className?: string;
};

const SectionHeading = ({ children, color = "dark", className = "" }: SectionHeadingProps) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`font-montserrat font-black text-5xl md:text-6xl uppercase mb-12 ${
        color === "white" ? "text-white" : "text-dark"
      } ${className}`}
    >
      {children}
    </motion.h2>
  );
};

export default SectionHeading;
