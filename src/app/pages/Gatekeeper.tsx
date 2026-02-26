import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Heart, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

// Set birthday to 10 seconds in the future for demo purposes
// In production, this would be: new Date("2026-02-25T00:00:00")
const BIRTHDAY_DATE = new Date(Date.now() + 5000); 

export function Gatekeeper() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isUnlocked, setIsUnlocked] = useState(false);
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  function calculateTimeLeft() {
    const difference = +BIRTHDAY_DATE - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
        return null; // Time is up
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const tl = calculateTimeLeft();
      setTimeLeft(tl);
      if (!tl) {
          setIsUnlocked(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      {isUnlocked && <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />}
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* Floating background elements */}
         {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-200/50"
              initial={{ y: "100vh", x: Math.random() * 100 + "%" }}
              animate={{ 
                y: "-10vh", 
                x: `calc(${Math.random() * 100}% + ${Math.random() * 200 - 100}px)`
              }}
              transition={{ 
                duration: 10 + Math.random() * 10, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
              }}
            >
              <Heart size={40 + Math.random() * 60} fill="currentColor" />
            </motion.div>
         ))}
      </div>

      <motion.div 
        className="z-10 p-8 md:p-12 bg-white/30 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-md w-full mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ rotate: [-5, 5, -5, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                className="mb-6 bg-white/50 p-6 rounded-full shadow-inner"
              >
                <Lock size={48} className="text-pink-500" />
              </motion.div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-2 font-serif">Wait for it...</h1>
              <p className="text-gray-600 mb-8">The magic begins in:</p>
              
              <div className="flex gap-4 mb-8">
                {timeLeft && Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="flex flex-col items-center bg-white/60 p-3 rounded-xl min-w-[70px]">
                    <span className="text-2xl font-bold text-pink-600 font-mono">
                      {String(value).padStart(2, '0')}
                    </span>
                    <span className="text-xs uppercase text-gray-500 tracking-wider">{unit}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-sm text-gray-500 italic flex items-center gap-2">
                <Heart size={14} className="animate-pulse text-pink-400" fill="currentColor"/>
                Patience is a virtue
                <Heart size={14} className="animate-pulse text-pink-400" fill="currentColor"/>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              className="flex flex-col items-center"
            >
               <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mb-6 bg-pink-100 p-6 rounded-full shadow-lg"
              >
                <Sparkles size={48} className="text-pink-500" />
              </motion.div>

              <h1 className="text-4xl font-bold text-gray-800 mb-4 font-serif">It's Time!</h1>
              <p className="text-gray-600 mb-8 text-lg">Happy Birthday, Saara! ✨</p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/home")}
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow-lg shadow-pink-500/30 flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  Enter the Celebration <ArrowRight size={20} />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
