import { motion } from 'motion/react';
import { Heart, Lock, Unlock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MilkAndMochaBear } from '../components/MilkAndMochaBear';

export function GatekeeperPage() {
  const navigate = useNavigate();
  
  // Set the birthday date here (YYYY, MM-1, DD) - Currently set to allow immediate access for demo
  // Change this to the actual birthday date: new Date(2026, 2, 25) for March 25, 2026
  const birthdayDate = new Date(2026, 1, 25); // February 25, 2026 (adjust as needed)
  const now = new Date();
  
  const [isUnlocked, setIsUnlocked] = useState(now >= birthdayDate);
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

    return () => clearInterval(timer);
  }, [birthdayDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <Heart className="w-16 h-16 fill-pink-300/30 stroke-pink-400/40" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20"
          animate={{ rotate: -360, scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
          <Heart className="w-20 h-20 fill-purple-300/30 stroke-purple-400/40" />
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 max-w-md w-full"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <div className="backdrop-blur-2xl bg-white/40 border-2 border-white/60 rounded-3xl shadow-2xl p-8">
          {/* Bears */}
          <div className="flex justify-center gap-4 mb-6">
            <MilkAndMochaBear type="milk" size={70} holding="heart" />
            <MilkAndMochaBear type="mocha" size={70} holding="heart" />
          </div>

          {/* Title */}
          <motion.h1
            className="text-3xl font-bold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Something Special Awaits...
          </motion.h1>

          <p className="text-center text-pink-700 mb-6">
            A birthday celebration for Saara
          </p>

          {!isUnlocked ? (
            <>
              {/* Countdown */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="backdrop-blur-xl bg-gradient-to-br from-pink-200/50 to-purple-200/50 rounded-2xl p-3 border border-white/50"
                  >
                    <div className="text-2xl font-bold text-pink-900 text-center">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-pink-600 text-center">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Locked State */}
              <motion.div
                className="flex items-center justify-center gap-2 text-pink-700"
                animate={{ x: [-3, 3, -3] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Lock className="w-5 h-5" />
                <span className="font-medium">Celebration Locked</span>
              </motion.div>
            </>
          ) : (
            <>
              {/* Unlocked State */}
              <motion.div
                className="text-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <Unlock className="w-16 h-16 mx-auto text-pink-600 mb-2" />
                <p className="text-pink-700 font-medium">🎉 It's time to celebrate! 🎉</p>
              </motion.div>

              {/* Enter Button */}
              <motion.button
                onClick={() => navigate('/home')}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Enter the Celebration
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
