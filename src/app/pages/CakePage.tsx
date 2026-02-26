import { motion, useAnimation } from 'motion/react';
import { useState } from 'react';
import { CakeSlice, Sparkles, Wind } from 'lucide-react';
import Confetti from 'react-confetti';
import { MilkAndMochaBear } from '../components/MilkAndMochaBear';
import { FloatingHearts } from '../components/FloatingHearts';
import { BottomNav } from '../components/BottomNav';

export function CakePage() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const controls = useAnimation();

  const blowCandles = async () => {
    if (!candlesLit) return;

    // Animate flames disappearing
    await controls.start({
      scale: [1, 1.5, 0],
      opacity: [1, 0.5, 0],
      transition: { duration: 1 },
    });

    setCandlesLit(false);
    setShowConfetti(true);

    // Stop confetti after 8 seconds
    setTimeout(() => setShowConfetti(false), 8000);
  };

  const relightCandles = () => {
    setCandlesLit(true);
    setShowConfetti(false);
    controls.start({
      scale: 1,
      opacity: 1,
    });
  };

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
        {/* Header */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CakeSlice className="w-8 h-8 text-pink-600" />
            <Sparkles className="w-6 h-6 text-purple-500" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Make a Wish! 🎂
          </h1>
          <p className="text-pink-700">
            {candlesLit ? 'Blow out the candles and make your birthday wish!' : 'Your wish has been made! 🌟'}
          </p>
        </motion.div>

        {/* Bears Celebrating */}
        <motion.div
          className="flex justify-center gap-8 mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        >
          <motion.div
            animate={!candlesLit ? { rotate: [0, -10, 10, -10, 0], y: [0, -10, 0] } : {}}
            transition={{ duration: 0.5, repeat: !candlesLit ? 3 : 0 }}
          >
            <MilkAndMochaBear type="milk" size={80} holding="gift" />
          </motion.div>
          <motion.div
            animate={!candlesLit ? { rotate: [0, 10, -10, 10, 0], y: [0, -10, 0] } : {}}
            transition={{ duration: 0.5, repeat: !candlesLit ? 3 : 0, delay: 0.1 }}
          >
            <MilkAndMochaBear type="mocha" size={80} holding="heart" />
          </motion.div>
        </motion.div>

        {/* Cake */}
        <motion.div
          className="max-w-md mx-auto mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
        >
          <div className="backdrop-blur-xl bg-white/30 border-2 border-white/50 rounded-3xl p-8 shadow-xl">
            {/* Cake SVG */}
            <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto">
              {/* Candles */}
              {[60, 100, 140].map((x, index) => (
                <g key={index}>
                  {/* Candle stick */}
                  <rect
                    x={x - 3}
                    y="40"
                    width="6"
                    height="25"
                    fill={index % 2 === 0 ? '#FFB6C1' : '#DDA0DD'}
                    rx="2"
                  />
                  {/* Flame */}
                  {candlesLit && (
                    <motion.g animate={controls}>
                      <motion.ellipse
                        cx={x}
                        cy={35}
                        rx={5}
                        ry={8}
                        fill="#FFA500"
                        animate={{
                          ry: [8, 10, 8],
                          opacity: [1, 0.8, 1],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: index * 0.1,
                        }}
                      />
                      <motion.ellipse
                        cx={x}
                        cy={33}
                        rx={3}
                        ry={5}
                        fill="#FFD700"
                        animate={{
                          ry: [5, 6, 5],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: index * 0.1,
                        }}
                      />
                    </motion.g>
                  )}
                </g>
              ))}

              {/* Top layer */}
              <ellipse cx="100" cy="65" rx="70" ry="15" fill="#FF69B4" />
              <rect x="30" y="65" width="140" height="30" fill="#FF69B4" />
              <ellipse cx="100" cy="95" rx="70" ry="15" fill="#E91E63" />

              {/* Middle layer */}
              <ellipse cx="100" cy="95" rx="80" ry="18" fill="#FFB6C1" />
              <rect x="20" y="95" width="160" height="35" fill="#FFB6C1" />
              <ellipse cx="100" cy="130" rx="80" ry="18" fill="#FF69B4" />

              {/* Bottom layer */}
              <ellipse cx="100" cy="130" rx="90" ry="20" fill="#FFC0CB" />
              <rect x="10" y="130" width="180" height="40" fill="#FFC0CB" />
              <ellipse cx="100" cy="170" rx="90" ry="20" fill="#FFB6C1" />

              {/* Decorations */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180;
                const x = 100 + Math.cos(angle) * 50;
                const y = 80 + Math.sin(angle) * 10;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={4}
                    fill="#FFF"
                    opacity="0.8"
                  />
                );
              })}
            </svg>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          className="max-w-md mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {candlesLit ? (
            <motion.button
              onClick={blowCandles}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow-lg flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Wind className="w-6 h-6" />
              Blow the Candles
            </motion.button>
          ) : (
            <motion.button
              onClick={relightCandles}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              Light the Candles Again
            </motion.button>
          )}
        </motion.div>

        {/* Wish Message */}
        {!candlesLit && (
          <motion.div
            className="max-w-2xl mx-auto mt-8 backdrop-blur-xl bg-gradient-to-br from-pink-200/40 to-purple-200/40 border-2 border-white/50 rounded-3xl p-8 shadow-xl"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
          >
            <p className="text-center text-pink-900 font-medium leading-relaxed text-lg">
              May all your wishes come true! 🌟 May this year bring you endless joy, love,
              and all the happiness you deserve. You are truly special, and the world is
              brighter with you in it! 💖✨
            </p>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
