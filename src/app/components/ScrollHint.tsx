import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function ScrollHint() {
  return (
    <motion.div
      className="fixed bottom-28 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="backdrop-blur-xl bg-white/30 border-2 border-white/50 rounded-full px-4 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-pink-700">Scroll for more</span>
          <ChevronDown className="w-4 h-4 text-pink-600" />
        </div>
      </div>
    </motion.div>
  );
}
