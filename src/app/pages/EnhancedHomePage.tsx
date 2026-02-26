import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX, Sparkles, Star } from 'lucide-react';
import Confetti from 'react-confetti';
import { MilkAndMochaBear } from '../components/MilkAndMochaBear';
import { PhysicsBackground } from '../components/PhysicsBackground';
import { GlowingBottomNav } from '../components/GlowingBottomNav';
import { useAudio } from '../context/AudioContext';

export function EnhancedHomePage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const { isPlaying, togglePlay, currentTrack } = useAudio();
  const [windowSize, setWindowSize] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Stop confetti after 10 seconds
    const timer = setTimeout(() => setShowConfetti(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 pb-60 relative overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <PhysicsBackground />
      </div>
      
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={800}
          colors={['#FFB6C1', '#FF69B4', '#DDA0DD', '#E6E6FA', '#FFC0CB', '#F0E6FF']}
          gravity={0.15}
        />
      )}

      <div className="relative z-10 px-4 pt-12">
        {/* Sparkle decoration */}
        <motion.div
          className="flex justify-center gap-4 mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <Sparkles className="w-10 h-10 text-pink-400" />
          </motion.div>
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2.5, repeat: Infinity }
            }}
          >
            <Star className="w-8 h-8 text-purple-400 fill-purple-400" />
          </motion.div>
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, delay: 0.5 }
            }}
          >
            <Sparkles className="w-10 h-10 text-pink-400" />
          </motion.div>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <motion.h1
            className="text-3xl md:text-7xl font-bold mb-2 md:mb-4 px-2"
            style={{
              background: 'linear-gradient(90deg, #EC4899, #A855F7, #EC4899, #A855F7)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Happy Birthday,
          </motion.h1>
          
          <motion.h2
            className="text-5xl md:text-8xl font-bold mb-4 md:mb-6 text-pink-600 relative"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Saara!
            <motion.span
              className="inline-block ml-2 text-3xl md:text-6xl"
              animate={{ 
                rotate: [0, 20, -20, 20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎉
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-sm md:text-xl text-pink-700 max-w-sm md:max-w-md mx-auto font-medium px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Welcome to your special celebration ✨
          </motion.p>
        </motion.div>

        {/* Bears Dancing */}
        <motion.div
          className="flex justify-center gap-6 md:gap-12 mb-8 md:mb-12 scale-75 md:scale-100"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -5, 5, -5, 0]
            }}
            transition={{ 
              y: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' },
              rotate: { duration: 2, repeat: Infinity }
            }}
          >
            <MilkAndMochaBear type="milk" size={window.innerWidth < 768 ? 100 : 120} holding="gift" />
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 5, 0]
            }}
            transition={{ 
              y: { duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: 0.3 },
              rotate: { duration: 2, repeat: Infinity, delay: 0.2 }
            }}
          >
            <MilkAndMochaBear type="mocha" size={window.innerWidth < 768 ? 100 : 120} holding="heart" />
          </motion.div>
        </motion.div>

        {/* Music Toggle - Glassmorphism 2.0 */}
        <motion.div
          className="max-w-md mx-auto mb-8"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
        >
          <div className="relative rounded-3xl overflow-hidden p-[3px]">
            {/* Moving gradient border */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, #FFB6C1, #DDA0DD, #E6E6FA, #FFB6C1)',
                backgroundSize: '300% 100%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            <div className="relative backdrop-blur-2xl bg-white/20 rounded-3xl p-4 md:p-6 shadow-2xl">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 md:gap-3">
                  <motion.div
                    animate={isPlaying ? { rotate: 360 } : {}}
                    transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
                  >
                    <Music className="w-5 h-5 md:w-7 md:h-7 text-pink-600" />
                  </motion.div>
                  <div className="max-w-[150px] md:max-w-none">
                    <h3 className="font-bold text-pink-900 text-sm md:text-lg truncate">
                      {currentTrack === 'lofi' ? 'Lo-fi Birthday Vibes' : 'Birthday Celebration'}
                    </h3>
                    <p className="text-[10px] md:text-xs text-pink-600">
                      {currentTrack === 'lofi' ? 'Relaxing celebration music' : 'Happy Birthday Song'}
                    </p>
                  </div>
                </div>
                
                <motion.button
                  onClick={togglePlay}
                  className="p-3 md:p-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 text-white shadow-xl relative overflow-hidden flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying && (
                    <motion.div
                      className="absolute inset-0 bg-white"
                      animate={{ opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                  {isPlaying ? (
                    <Volume2 className="w-6 h-6 relative z-10" />
                  ) : (
                    <VolumeX className="w-6 h-6 relative z-10" />
                  )}
                </motion.button>
              </div>
              
              {isPlaying && (
                <motion.div
                  className="mt-6 flex gap-1 justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {[...Array(24)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-gradient-to-t from-pink-400 via-purple-400 to-pink-300 rounded-full"
                      animate={{
                        height: [12, 35, 12],
                      }}
                      transition={{
                        duration: 0.6 + Math.random() * 0.4,
                        repeat: Infinity,
                        delay: i * 0.03,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Welcome Message - Glassmorphism 2.0 */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.7 }}
        >
          <div className="relative rounded-3xl overflow-hidden p-[3px]">
            {/* Moving gradient border */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, #DDA0DD, #FFB6C1, #E6E6FA, #DDA0DD)',
                backgroundSize: '300% 100%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            <div className="relative backdrop-blur-2xl bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-3xl p-6 md:p-8 shadow-2xl">
              <motion.div
                className="flex justify-center mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-pink-500" />
              </motion.div>
              
              <h3 className="text-xl md:text-3xl font-bold text-pink-900 mb-4 text-center">
                Your Special Day 💝
              </h3>
              <p className="text-pink-800 leading-relaxed text-center mb-4 text-sm md:text-lg">
                Today is all about celebrating the amazing person you are! Explore this interactive
                journey filled with memories, reasons why you're loved, and special surprises.
              </p>
              <p className="text-pink-700 text-center font-bold text-xs md:text-base">
                Use the glowing navigation below to explore! 🎊
              </p>
              
              {/* Decorative hearts */}
              <div className="flex justify-center gap-3 mt-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-pink-400" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating action hint */}
        <motion.div
          className="max-w-md mx-auto mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        >
          <p className="text-pink-600 text-sm font-medium">
            ✨ Swipe through memories, flip the cards, blow the candles... ✨
          </p>
        </motion.div>
      </div>

      <GlowingBottomNav />
    </div>
  );
}
