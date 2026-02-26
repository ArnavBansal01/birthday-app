import { motion, useAnimation } from 'motion/react';
import { useState, useRef } from 'react';
import { CakeSlice, Sparkles, Hand } from 'lucide-react';
import Confetti from 'react-confetti';
import { MilkAndMochaBear } from '../components/MilkAndMochaBear';
import { PhysicsBackground } from '../components/PhysicsBackground';
import { GlowingBottomNav } from '../components/GlowingBottomNav';
import { useAudio } from '../context/AudioContext';

export function EnhancedCakePage() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isBlowing, setIsBlowing] = useState(false);
  const { setTrack, play } = useAudio();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const flame1Controls = useAnimation();
  const flame2Controls = useAnimation();
  const flame3Controls = useAnimation();
  const cakeControls = useAnimation();

  const blowCandles = async () => {
    if (!candlesLit || isBlowing) return;
    
    setIsBlowing(true);

    // Staggered flame exit animation
    flame1Controls.start({
      scale: [1, 1.3, 0],
      opacity: [1, 0.8, 0],
      y: [-5, -15],
      transition: { duration: 0.6, ease: 'easeOut' },
    });

    await new Promise(resolve => setTimeout(resolve, 200));
    
    flame2Controls.start({
      scale: [1, 1.3, 0],
      opacity: [1, 0.8, 0],
      y: [-5, -15],
      transition: { duration: 0.6, ease: 'easeOut' },
    });

    await new Promise(resolve => setTimeout(resolve, 200));
    
    flame3Controls.start({
      scale: [1, 1.3, 0],
      opacity: [1, 0.8, 0],
      y: [-5, -15],
      transition: { duration: 0.6, ease: 'easeOut' },
    });

    await new Promise(resolve => setTimeout(resolve, 400));
    
    setCandlesLit(false);
    setShowConfetti(true);
    setIsBlowing(false);
    
    // Switch global music to birthday song
    setTrack('birthday');
    play();

    // Cake celebration animation
    cakeControls.start({
      scale: [1, 1.05, 1],
      rotate: [0, -2, 2, -2, 0],
      transition: { duration: 0.8 },
    });

    // Play "Yay!" sound (placeholder - you can add actual audio)
    try {
      if (audioRef.current && audioRef.current.readyState >= 2) {
        audioRef.current.play();
      }
    } catch (e) {
      console.log('Audio play failed:', e);
    }

    // Stop confetti after 8 seconds
    setTimeout(() => setShowConfetti(false), 8000);
  };

  const relightCandles = () => {
    setCandlesLit(true);
    setShowConfetti(false);
    flame1Controls.start({ scale: 1, opacity: 1, y: 0 });
    flame2Controls.start({ scale: 1, opacity: 1, y: 0 });
    flame3Controls.start({ scale: 1, opacity: 1, y: 0 });
  };

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
          numberOfPieces={600}
          colors={['#FFB6C1', '#FF69B4', '#DDA0DD', '#E6E6FA', '#FFC0CB', '#F0E6FF']}
          gravity={0.3}
        />
      )}

      {/* Hidden audio element for "Yay!" sound */}
      <audio ref={audioRef} src="data:audio/wav;base64,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" />

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
          
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent px-4">
            Make a Wish! 🎂
          </h1>
          <p className="text-sm md:text-base text-pink-700 px-6">
            {candlesLit ? 'Tap to blow out the candles!' : 'Your wish has been made! 🌟'}
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
            animate={!candlesLit ? { 
              rotate: [0, -10, 10, -10, 0], 
              y: [0, -10, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 0.5, repeat: !candlesLit ? 3 : 0 }}
          >
            <MilkAndMochaBear type="milk" size={80} holding="gift" />
          </motion.div>
          <motion.div
            animate={!candlesLit ? { 
              rotate: [0, 10, -10, 10, 0], 
              y: [0, -10, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 0.5, repeat: !candlesLit ? 3 : 0, delay: 0.1 }}
          >
            <MilkAndMochaBear type="mocha" size={80} holding="heart" />
          </motion.div>
        </motion.div>

        {/* Cake */}
        <motion.div
          className="max-w-[280px] md:max-w-md mx-auto mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
        >
          {/* Glassmorphism 2.0 wrapper */}
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
            
            <motion.div 
              className="relative backdrop-blur-2xl bg-white/20 rounded-3xl p-8 shadow-xl cursor-pointer"
              animate={cakeControls}
              onClick={blowCandles}
              whileHover={candlesLit ? { scale: 1.02 } : {}}
              whileTap={candlesLit ? { scale: 0.98 } : {}}
            >
              {/* Cake SVG */}
              <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto">
                {/* Candles with staggered flames */}
                {[
                  { x: 60, controls: flame1Controls },
                  { x: 100, controls: flame2Controls },
                  { x: 140, controls: flame3Controls }
                ].map((candle, index) => (
                  <g key={index}>
                    {/* Candle stick */}
                    <motion.rect
                      x={candle.x - 3}
                      y="40"
                      width="6"
                      height="25"
                      fill={index % 2 === 0 ? '#FFB6C1' : '#DDA0DD'}
                      rx="2"
                      animate={candlesLit ? {} : { opacity: 0.5 }}
                    />
                    {/* Flame */}
                    {candlesLit && (
                      <motion.g animate={candle.controls}>
                        <motion.ellipse
                          cx={candle.x}
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
                            delay: index * 0.15,
                          }}
                        />
                        <motion.ellipse
                          cx={candle.x}
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
                            delay: index * 0.15,
                          }}
                        />
                        {/* Glow effect */}
                        <motion.circle
                          cx={candle.x}
                          cy={35}
                          r={8}
                          fill="#FFA500"
                          opacity="0.3"
                          animate={{
                            r: [8, 12, 8],
                            opacity: [0.3, 0.1, 0.3],
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: index * 0.15,
                          }}
                        />
                      </motion.g>
                    )}
                    {/* Smoke after blowing */}
                    {!candlesLit && (
                      <motion.g>
                        {[0, 1, 2].map((puff) => (
                          <motion.ellipse
                            key={puff}
                            cx={candle.x}
                            cy="35"
                            rx="3"
                            ry="2"
                            fill="#9CA3AF"
                            opacity="0.5"
                            initial={{ y: 0, opacity: 0.5 }}
                            animate={{
                              y: -20 - puff * 10,
                              opacity: [0.5, 0],
                              rx: [3, 5],
                            }}
                            transition={{
                              duration: 1.5,
                              delay: puff * 0.2,
                              repeat: Infinity,
                            }}
                          />
                        ))}
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

                {/* Decorations - frosting swirls */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x = 100 + Math.cos(angle) * 60;
                  const y = 80 + Math.sin(angle) * 12;
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={4}
                      fill="#FFF"
                      opacity="0.9"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  );
                })}

                {/* Sprinkles */}
                {[...Array(20)].map((_, i) => {
                  const x = 30 + Math.random() * 140;
                  const y = 65 + Math.random() * 60;
                  const colors = ['#FF1493', '#FFD700', '#00CED1', '#FF69B4', '#DDA0DD'];
                  return (
                    <rect
                      key={`sprinkle-${i}`}
                      x={x}
                      y={y}
                      width="3"
                      height="8"
                      fill={colors[i % colors.length]}
                      opacity="0.8"
                      rx="1"
                      transform={`rotate(${Math.random() * 360} ${x} ${y})`}
                    />
                  );
                })}
              </svg>
            </motion.div>
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
              disabled={isBlowing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow-lg flex items-center justify-center gap-3 relative overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <Hand className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Tap to Blow the Candles</span>
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
              Light the Candles Again ✨
            </motion.button>
          )}
        </motion.div>

        {/* Wish Message */}
        {!candlesLit && (
          <motion.div
            className="max-w-2xl mx-auto mt-8 backdrop-blur-2xl bg-gradient-to-br from-pink-200/40 to-purple-200/40 border-2 border-white/50 rounded-3xl p-6 md:p-8 shadow-xl mx-4"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 1 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.p 
                className="text-pink-900 font-bold leading-relaxed text-base md:text-lg mb-4"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌟 May all your wishes come true! 🌟
              </motion.p>
              <p className="text-pink-800 text-sm md:text-base leading-relaxed">
                May this year bring you endless joy, love, and all the happiness you deserve.
                You are truly special, and the world is brighter with you in it! 💖✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>

      <GlowingBottomNav />
    </div>
  );
}
