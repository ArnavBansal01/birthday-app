import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import { MilkAndMochaBear } from '../components/MilkAndMochaBear';
import { FloatingHearts } from '../components/FloatingHearts';
import { BottomNav } from '../components/BottomNav';

export function HomePage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Stop confetti after 8 seconds
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 pb-24 overflow-hidden relative">
      <FloatingHearts />
      
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={['#FFB6C1', '#FF69B4', '#DDA0DD', '#E6E6FA', '#FFC0CB']}
        />
      )}

      <div className="relative z-10 px-4 pt-8">
        {/* Hero Section */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {/* Sparkle decoration */}
          <motion.div
            className="flex justify-center gap-4 mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-8 h-8 text-pink-400" />
            <Sparkles className="w-6 h-6 text-purple-400" />
            <Sparkles className="w-8 h-8 text-pink-400" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: '200% auto' }}
          >
            Happy Birthday,
          </motion.h1>
          
          <motion.h2
            className="text-6xl md:text-7xl font-bold mb-6 text-pink-600"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Saara! 🎉
          </motion.h2>

          <motion.p
            className="text-lg text-pink-700 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Welcome to a special celebration made just for you! ✨
          </motion.p>
        </motion.div>

        {/* Bears Dancing */}
        <motion.div
          className="flex justify-center gap-8 mb-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
          >
            <MilkAndMochaBear type="milk" size={100} holding="gift" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: 0.3 }}
          >
            <MilkAndMochaBear type="mocha" size={100} holding="heart" />
          </motion.div>
        </motion.div>

        {/* Music Toggle */}
        <motion.div
          className="max-w-md mx-auto backdrop-blur-xl bg-white/30 border-2 border-white/50 rounded-3xl p-6 shadow-xl mb-8"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Music className="w-6 h-6 text-pink-600" />
              <div>
                <h3 className="font-semibold text-pink-900">Lo-fi Birthday Vibes</h3>
                <p className="text-xs text-pink-600">Relaxing celebration music</p>
              </div>
            </div>
            
            <motion.button
              onClick={() => setIsMusicPlaying(!isMusicPlaying)}
              className="p-3 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 text-white shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMusicPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </motion.button>
          </div>
          
          {isMusicPlaying && (
            <motion.div
              className="mt-4 flex gap-1 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-pink-400 to-purple-400 rounded-full"
                  animate={{
                    height: [10, 30, 10],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          className="max-w-2xl mx-auto backdrop-blur-xl bg-gradient-to-br from-pink-200/40 to-purple-200/40 border-2 border-white/50 rounded-3xl p-8 shadow-xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-pink-900 mb-4 text-center">
            Your Special Day 💝
          </h3>
          <p className="text-pink-800 leading-relaxed text-center mb-4">
            Today is all about celebrating the amazing person you are! Explore this interactive
            journey filled with memories, reasons why you're loved, and special surprises.
          </p>
          <p className="text-pink-700 text-center font-medium">
            Use the navigation below to explore everything we've prepared for you! 🎊
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
