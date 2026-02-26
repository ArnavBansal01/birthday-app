import { motion } from 'motion/react';
import { useState } from 'react';
import { MilkAndMochaBear } from './MilkAndMochaBear';

interface FlipCardProps {
  reason: string;
  bearType: 'milk' | 'mocha';
}

export function FlipCard({ reason, bearType }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full aspect-square cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-pink-200/40 to-purple-200/40 border-2 border-white/50 rounded-3xl shadow-xl flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <MilkAndMochaBear type={bearType} holding="heart" size={60} />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-purple-200/40 to-pink-200/40 border-2 border-white/50 rounded-3xl shadow-xl flex items-center justify-center p-4"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-center text-sm font-medium text-pink-900">{reason}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
