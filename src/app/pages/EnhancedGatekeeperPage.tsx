import { motion, useAnimation } from 'motion/react';
import { Lock, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MilkAndMochaBear } from '../components/MilkAndMochaBear';
import { useAudio } from '../context/AudioContext';

export function EnhancedGatekeeperPage() {
  const navigate = useNavigate();
  const shakeControls = useAnimation();
  const gateControls = useAnimation();
  const mochaControls = useAnimation();
  
  // Set the birthday date here (adjust as needed)
  const birthdayDate = new Date(2026, 1, 25, 0, 0, 0); // February 25, 2026
  const now = new Date();
  
  const [isUnlocked, setIsUnlocked] = useState(now >= birthdayDate);
  const [isDissolving, setIsDissolving] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showBigHeart, setShowBigHeart] = useState(false);
  const { play } = useAudio();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = birthdayDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setIsUnlocked(true);
        clearInterval(timer);
      }
    }, 1000);

    // Entry animation
    gateControls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    });

    return () => clearInterval(timer);
  }, [birthdayDate, gateControls]);

  const handleEarlyClick = async () => {
    if (isUnlocked) {
      // Dissolve animation
      setIsDissolving(true);
      setShowHearts(true);
      setShowBigHeart(true);
      play(); // Start music on enter

      // 2. Complex enhanced animation sequence (2 seconds)
      Promise.all([
        gateControls.start({
          opacity: [1, 1, 0],
          scale: [1, 1.1, 0.8],
          rotate: [0, 5, -5],
          filter: ['blur(0px)', 'blur(10px)', 'blur(30px)'],
          transition: { duration: 2, ease: [0.4, 0, 0.2, 1] },
        }),
        mochaControls.start({
          y: [0, -40, 100],
          opacity: [1, 1, 0],
          scale: [1, 1.4, 0],
          rotate: [0, 10, -10],
          transition: { duration: 1.8, ease: 'backIn' }
        })
      ]);

      // Navigation after the 2-second animation
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } else {
      // Shake heart and trigger "shhh" animation
      shakeControls.start({
        x: [-10, 10, -10, 10, 0],
        rotate: [-5, 5, -5, 5, 0],
        transition: { duration: 0.5 },
      });
      
      mochaControls.start({
        scale: [1, 1.1, 1],
        rotate: [0, -5, 5, -5, 0],
        transition: { duration: 0.6 },
      });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(255, 182, 193, 0.3), transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(221, 160, 221, 0.3), transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(255, 182, 193, 0.3), transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating hearts on unlock */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: -100,
                scale: [0, 1.5, 0.8],
                opacity: [1, 1, 0],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
            >
              <Heart className="w-8 h-8 fill-pink-400 stroke-pink-500" />
            </motion.div>
          ))}
          
          {/* Lace effect */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`lace-${i}`}
              className="absolute w-2 h-2 bg-white/60 rounded-full"
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                scale: 0,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [0, 1, 0],
                opacity: [1, 0.5, 0],
              }}
              transition={{
                duration: 1.5 + Math.random(),
                delay: Math.random() * 0.3,
              }}
            />
          ))}
        </div>
      )}

      {/* Big Growing Heart Effect */}
      {showBigHeart && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[50] pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1], scale: [0, 10, 100] }}
          transition={{ duration: 2, ease: "easeIn" }}
        >
          <Heart className="w-full h-full fill-pink-300 opacity-90" />
        </motion.div>
      )}

      <motion.div
        className="relative z-10 max-w-md w-full"
        animate={gateControls}
        initial={{ scale: 0.8, opacity: 0 }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        >
          {/* Glassmorphism 2.0 card */}
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
            
            <div className="relative backdrop-blur-2xl bg-white/20 rounded-3xl shadow-2xl p-8">
              {/* Mocha Bear Guard */}
              <motion.div
                className="flex justify-center mb-4 md:mb-6"
                animate={mochaControls}
              >
                <MilkAndMochaBear type="mocha" size={window.innerWidth < 768 ? 80 : 100} holding="heart" />
                
                {/* "Shhh" speech bubble */}
                {!isUnlocked && (
                  <motion.div
                    className="absolute -right-4 top-0"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="backdrop-blur-xl bg-white/90 rounded-2xl px-4 py-2 shadow-lg relative">
                      <p className="text-2xl">🤫</p>
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white/90 border-b-8 border-b-transparent" />
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-2xl md:text-3xl font-bold text-center mb-1 md:mb-2 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% auto' }}
              >
                {isUnlocked ? '🎉 Time to Celebrate!' : '✨ Locked Until...'}
              </motion.h1>

              <p className="text-center text-sm md:text-base text-pink-700 mb-4 md:mb-6 font-medium">
                {isUnlocked ? "Saara's Birthday Celebration" : "Saara's Special Day"}
              </p>

              {!isUnlocked ? (
                <>
                  {/* Countdown */}
                  <div className="grid grid-cols-4 gap-2 md:gap-3 mb-6">
                    {[
                      { label: 'Days', value: timeLeft.days },
                      { label: 'Hrs', value: timeLeft.hours },
                      { label: 'Mins', value: timeLeft.minutes },
                      { label: 'Secs', value: timeLeft.seconds },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        className="backdrop-blur-xl bg-gradient-to-br from-pink-200/50 to-purple-200/50 rounded-xl md:rounded-2xl p-2 md:p-3 border-2 border-white/50 shadow-lg"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 200,
                          delay: index * 0.1,
                        }}
                      >
                        <motion.div
                          className="text-xl md:text-2xl font-bold text-pink-900 text-center"
                          key={item.value}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          {item.value.toString().padStart(2, '0')}
                        </motion.div>
                        <div className="text-[10px] md:text-xs text-pink-600 text-center font-medium">
                          {item.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Locked Heart */}
                  <motion.div
                    className="flex items-center justify-center gap-2 mb-4"
                    animate={shakeControls}
                  >
                    <Lock className="w-5 h-5 text-pink-600" />
                    <Heart className="w-6 h-6 fill-pink-400 stroke-pink-600" />
                    <Lock className="w-5 h-5 text-pink-600" />
                  </motion.div>
                </>
              ) : (
                <motion.div
                  className="text-center mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Heart className="w-16 h-16 mx-auto fill-pink-500 stroke-pink-600 mb-2" />
                  </motion.div>
                  <p className="text-pink-700 font-semibold">The gate is open! 💖</p>
                </motion.div>
              )}

              {/* Enter Button */}
              <motion.button
                onClick={handleEarlyClick}
                className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 text-white'
                    : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isDissolving}
              >
                {isUnlocked ? '✨ Enter Celebration ✨' : '🔒 Not Yet...'}
              </motion.button>

              {!isUnlocked && (
                <motion.p
                  className="text-center text-xs text-pink-600 mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Mocha is keeping watch... 🐻
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
