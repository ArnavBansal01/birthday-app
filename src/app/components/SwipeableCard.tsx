import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { useState, forwardRef } from 'react';
import { MilkAndMochaBear } from './MilkAndMochaBear';

interface Memory {
  id: number;
  title: string;
  description: string;
  date: string;
  imageColor: string;
}

interface SwipeableCardProps {
  memory: Memory;
  onSwipe: (direction: 'left' | 'right') => void;
  index: number;
  preferredDirection?: 'left' | 'right';
}

export const SwipeableCard = forwardRef<HTMLDivElement, SwipeableCardProps>(
  ({ memory, onSwipe, index, preferredDirection }, ref) => {
  const [exitDirection, setExitDirection] = useState<'left' | 'right'>('right');
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-35, 35]);
  const opacity = useTransform(x, [-400, -200, 0, 200, 400], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      const dir = info.offset.x > 0 ? 'right' : 'left';
      setExitDirection(dir);
      onSwipe(dir);
    }
  };

  const handleTap = () => {
    const dir = preferredDirection || 'right';
    setExitDirection(dir);
    onSwipe(dir);
  };

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 w-full"
      style={{
        x,
        rotate,
        opacity,
        zIndex: 10 - index,
      }}
      initial={{ scale: 0.95 - index * 0.05, y: index * 10, opacity: 0 }}
      animate={{
        scale: 1 - index * 0.05,
        y: index * -10,
        opacity: 1 - index * 0.3,
      }}
      exit={{ 
        x: exitDirection === 'right' ? 1000 : -1000, 
        opacity: 0, 
        scale: 0.5, 
        rotate: exitDirection === 'right' ? 45 : -45 
      }}
      transition={{
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      drag={index === 0 ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onTap={index === 0 ? handleTap : undefined}
      whileTap={index === 0 ? { cursor: 'grabbing', scale: 1.02 } : {}}
      layout
    >
      {/* Polaroid Card */}
      <div className="backdrop-blur-2xl bg-white/90 border-4 border-white shadow-2xl rounded-2xl p-4 cursor-grab active:cursor-grabbing">
        {/* Image Area */}
        <div
          className={`w-full aspect-square ${memory.imageColor} rounded-xl mb-4 flex items-center justify-center relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <Heart className="w-20 h-20 fill-white/40 stroke-white/60" />
          </motion.div>
          
          {/* Swipe Indicators & Bear Reactions */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
            style={{
              opacity: useTransform(x, [0, 100], [0, 1]),
              scale: useTransform(x, [0, 100], [0.5, 1]),
            }}
          >
            <MilkAndMochaBear type="milk" size={window.innerWidth < 768 ? 120 : 160} holding="heart" animate={true} />
            <div className="backdrop-blur-xl bg-white/90 text-pink-600 px-4 py-2 mt-2 rounded-full font-bold text-sm md:text-lg shadow-xl">
              Love This! 💕
            </div>
          </motion.div>
          
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
            style={{
              opacity: useTransform(x, [-100, 0], [1, 0]),
              scale: useTransform(x, [-100, 0], [1, 0.5]),
            }}
          >
            <MilkAndMochaBear type="mocha" size={window.innerWidth < 768 ? 120 : 160} holding="heart" animate={true} />
            <div className="backdrop-blur-xl bg-white/90 text-purple-600 px-4 py-2 mt-2 rounded-full font-bold text-sm md:text-lg shadow-xl">
              Mwah! 😘
            </div>
          </motion.div>
        </div>

        {/* Caption Area */}
        <div className="text-center space-y-2">
          <p className="text-xs text-pink-600 font-medium">{memory.date}</p>
          <h3 className="font-bold text-pink-900">{memory.title}</h3>
          <p className="text-sm text-pink-700">{memory.description}</p>
        </div>

        {/* Decorative tape */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-gradient-to-r from-pink-200/60 to-purple-200/60 backdrop-blur-sm border border-white/40 rotate-3" />
      </div>
    </motion.div>
  );
});

SwipeableCard.displayName = 'SwipeableCard';

function Heart({ className, ...props }: { className?: string; [key: string]: any }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
