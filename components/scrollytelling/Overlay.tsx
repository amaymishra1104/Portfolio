'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: 0% to 20% scroll
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Section 2: 30% to 50% scroll
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.3, 0.5], [50, 0, -50]);

  // Section 3: 60% to 80% scroll
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.6, 0.8], [50, 0, -50]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 font-sans">
      {/* Section 1 */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-white"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">My Name</h1>
        <p className="text-xl md:text-2xl mt-4 text-gray-300 font-light tracking-wide">Creative Developer.</p>
      </motion.div>

      {/* Section 2 */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-start justify-center text-white px-10 md:px-32"
      >
        <h2 className="text-4xl md:text-6xl font-medium max-w-lg leading-tight tracking-tight">
          I build digital experiences.
        </h2>
      </motion.div>

      {/* Section 3 */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-end justify-center text-white px-10 md:px-32"
      >
        <h2 className="text-4xl md:text-6xl font-medium max-w-lg leading-tight text-right tracking-tight">
          Bridging design and engineering.
        </h2>
      </motion.div>
    </div>
  );
}
