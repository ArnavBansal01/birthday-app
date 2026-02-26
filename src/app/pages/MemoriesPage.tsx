import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { RotateCcw, Sparkles, Heart } from 'lucide-react';
import { SwipeableCard } from '../components/SwipeableCard';
import { PhysicsBackground } from '../components/PhysicsBackground';
import { GlowingBottomNav } from '../components/GlowingBottomNav';
import { MilkAndMochaBear } from '../components/MilkAndMochaBear';

const memories = [
  {
    id: 1,
    title: 'The Day We Met',
    description: 'Your smile was the first thing I noticed',
    date: 'A Beautiful Beginning',
    imageColor: 'bg-gradient-to-br from-pink-300 to-rose-300',
  },
  {
    id: 2,
    title: 'Our First Adventure',
    description: 'Getting lost never felt so right',
    date: 'An Unforgettable Journey',
    imageColor: 'bg-gradient-to-br from-purple-300 to-pink-300',
  },
  {
    id: 3,
    title: 'Late Night Talks',
    description: 'When sunrise found us still talking',
    date: 'Deep Connections',
    imageColor: 'bg-gradient-to-br from-blue-300 to-purple-300',
  },
  {
    id: 4,
    title: 'Your Biggest Achievement',
    description: 'I was so proud to witness your success',
    date: 'A Moment of Pride',
    imageColor: 'bg-gradient-to-br from-yellow-300 to-pink-300',
  },
  {
    id: 5,
    title: 'The Silly Moments',
    description: 'When we laughed until our stomachs hurt',
    date: 'Pure Joy',
    imageColor: 'bg-gradient-to-br from-green-300 to-teal-300',
  },
  {
    id: 6,
    title: 'You Being You',
    description: 'Every day you show me what kindness means',
    date: 'Always',
    imageColor: 'bg-gradient-to-br from-pink-300 to-purple-300',
  },
];

export function MemoriesPage() {
  const [cards, setCards] = useState(memories);
  const [nextDirection, setNextDirection] = useState<'left' | 'right'>('right');

  const handleSwipe = (direction: 'left' | 'right') => {
    setNextDirection(direction === 'right' ? 'left' : 'right');
    setCards((current) => current.slice(1));
  };

  const resetDeck = () => {
    setCards(memories);
    setNextDirection('right');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 pb-48 relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <PhysicsBackground />
      </div>
      
      {/* Floating background hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              scale: 0.8 + Math.random() * 0.5 
            }}
            animate={{ 
              y: -150,
              rotate: [0, 90, 180, 360],
              opacity: [0.1, 0.4, 0.4, 0.1],
            }}
            transition={{ 
              duration: 10 + Math.random() * 15, 
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear"
            }}
          >
            <Heart className="w-12 h-12 fill-pink-500/20 text-pink-500/10" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 px-4 pt-8">
        {/* Header */}
        <motion.div
          className="max-w-md mx-auto text-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-pink-600" />
            <Sparkles className="w-6 h-6 text-purple-500" />
          </motion.div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Memory Deck
          </h1>
          <p className="text-sm md:text-base text-pink-700 mb-2">
            Swipe through our favorite moments together
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-pink-600">
            <div className="flex items-center gap-1">
              <span>👉</span>
              <span>Milk loves it!</span>
            </div>
            <div className="flex items-center gap-1">
              <span>👈</span>
              <span>Mocha sends kisses!</span>
            </div>
          </div>
        </motion.div>

        {/* Card Stack */}
        <div className="w-[85vw] max-w-sm mx-auto relative h-[360px] md:h-[500px] z-10 mb-8">
          <AnimatePresence mode="popLayout">
            {cards.length === 0 ? (
              <motion.div
                key="finale"
                className="flex flex-col items-center justify-center py-8 relative z-[100]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="backdrop-blur-3xl bg-white/80 border-4 md:border-8 border-white shadow-[0_0_80px_rgba(236,72,153,0.5)] rounded-[40px] md:rounded-[60px] p-8 md:p-16 text-center relative overflow-hidden w-[90vw] max-w-2xl max-h-[85vh] flex flex-col justify-center items-center"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 60 }}
                >
                  {/* Decorative background sparks */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.5, 0.5],
                        x: [0, (i % 3 - 1) * 200],
                        y: [0, (Math.floor(i / 3) - 1.5) * 200]
                      }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                    >
                      <Sparkles className="w-10 h-10 text-pink-400" />
                    </motion.div>
                  ))}

                  <div className="flex justify-center gap-8 md:gap-16 mb-6 md:mb-12 relative z-10">
                    <motion.div
                      animate={{ 
                        rotate: [0, -20, 20, -20, 0],
                        y: [0, -20, 0],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <MilkAndMochaBear type="milk" size={window.innerWidth < 768 ? 130 : 200} holding="heart" />
                    </motion.div>
                    <motion.div
                      animate={{ 
                        rotate: [0, 20, -20, 20, 0],
                        y: [0, -20, 0],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                    >
                      <MilkAndMochaBear type="mocha" size={window.innerWidth < 768 ? 130 : 200} holding="heart" />
                    </motion.div>
                  </div>
                  
                  <motion.h3 
                    className="text-2xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 md:mb-6 tracking-tight px-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      filter: ["drop-shadow(0 0 10px rgba(236,72,153,0.3))", "drop-shadow(0 0 20px rgba(236,72,153,0.5))", "drop-shadow(0 0 10px rgba(236,72,153,0.3))"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Our Story Continues... ✨
                  </motion.h3>
                  <p className="text-pink-800 text-sm md:text-xl font-bold mb-6 md:mb-10 leading-relaxed px-4">
                    Every second with you is a new favorite memory.<br/>
                    I can't wait to create thousands more together! ❤️
                  </p>
                  
                  <motion.button
                    onClick={resetDeck}
                    className="flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="w-5 h-5" />
                    Relive the Memories
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              cards.slice(0, 3).map((memory, index) => (
                <SwipeableCard
                  key={memory.id}
                  memory={memory}
                  onSwipe={handleSwipe}
                  index={index}
                  preferredDirection={nextDirection}
                />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Counter & Instructions */}
        <motion.div
          className="max-w-sm mx-auto mt-24 md:mt-28 text-center space-y-6 md:space-y-8 px-4 relative z-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="backdrop-blur-xl bg-white/30 border-2 border-white/40 rounded-full px-6 py-2 inline-block shadow-lg">
            <p className="text-pink-700 font-bold text-sm">
              {cards.length} / {memories.length} memories remaining
            </p>
          </div>

          {cards.length > 0 && (
            <motion.div
              className="backdrop-blur-xl bg-gradient-to-br from-pink-200/40 to-purple-200/40 border-2 border-white/50 rounded-2xl p-4 shadow-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-pink-900 text-xs leading-relaxed">
                💡 <strong>Swipe right</strong> to show Milk love, or <strong>swipe left</strong> for
                Mocha's kisses! ✨
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <GlowingBottomNav />
    </div>
  );
}
