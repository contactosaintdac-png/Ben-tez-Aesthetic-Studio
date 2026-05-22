import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({ 
  children, 
  type = "button", 
  disabled = false, 
  className = "", 
  onClick,
  animate = {},
  transition = {}
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // 0.22 multiplier provides a subtle and elegant magnetic pull 
    setPosition({ x: x * 0.22, y: y * 0.22 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ ...animate, x: position.x, y: position.y }}
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 12, 
        mass: 0.1,
        ...transition 
      }}
      className={`${className} relative`}
    >
      {children}
    </motion.button>
  );
}
