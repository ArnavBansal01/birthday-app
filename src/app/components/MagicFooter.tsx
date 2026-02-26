import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function MagicFooter() {
  const location = useLocation();
  const isGatekeeper = location.pathname === '/';

  return (
    <div className={`fixed ${isGatekeeper ? 'bottom-6' : 'bottom-24 md:bottom-6'} right-4 md:right-6 z-[60] pointer-events-none`}>
      <motion.div 
        className="backdrop-blur-xl bg-white/40 border border-white/60 rounded-full px-4 py-1.5 md:px-6 md:py-2 shadow-lg shadow-pink-200/50 flex items-center gap-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-pink-500" />
        </motion.div>
        <span className="text-pink-700 text-[10px] md:text-sm font-bold tracking-tight">
          A little magic by Arnav
        </span>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />
        </motion.div>
      </motion.div>
    </div>
  );
}
