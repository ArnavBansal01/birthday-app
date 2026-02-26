import { motion } from 'motion/react';
import { useState } from 'react';
import { Heart } from 'lucide-react';

interface TimelineCardProps {
  moment: {
    title: string;
    message: string;
    date: string;
  };
  index: number;
}

export function TimelineCard({ moment, index }: TimelineCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className={`flex items-center gap-4 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 100, delay: index * 0.1 }}
    >
      {/* Content */}
      <motion.div
        className={`flex-1 backdrop-blur-xl bg-white/30 border-2 border-white/50 rounded-3xl p-6 shadow-xl cursor-pointer ${
          isLeft ? 'text-right' : 'text-left'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="text-xs text-pink-600 font-medium mb-2">{moment.date}</div>
        <h3 className="font-semibold text-pink-900 mb-2">{moment.title}</h3>
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="overflow-hidden"
        >
          <p className="text-sm text-pink-800 mt-2">{moment.message}</p>
        </motion.div>
        <div className={`text-xs text-pink-500 mt-2 ${isLeft ? 'text-right' : 'text-left'}`}>
          {isExpanded ? 'Tap to close' : 'Tap to read more'}
        </div>
      </motion.div>

      {/* Dot */}
      <motion.div
        className="relative z-10"
        whileHover={{ scale: 1.2 }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 border-4 border-white shadow-lg flex items-center justify-center">
          <Heart className="w-4 h-4 fill-white stroke-white" />
        </div>
      </motion.div>

      {/* Spacer for alternating layout */}
      <div className="flex-1" />
    </motion.div>
  );
}
