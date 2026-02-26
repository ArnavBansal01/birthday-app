import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Gift, Calendar, Music, Home } from 'lucide-react';
import useSound from 'react-use/lib/useAudio'; // Or just native Audio

// Using native Audio for simplicity and global persistence
// But managing it in React is better. Let's create a context later or just state here.

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isGatekeeper = location.pathname === '/';
  
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  
  // We'll use a ref to hold the audio object to persist across renders
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    // Using a public domain lo-fi track or similar placeholder
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lo-fi-beat-chill-11111.mp3'); 
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed (user interaction needed):", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMusic = () => setIsPlaying(!isPlaying);

  // Navigation Items
  const navItems = [
    { icon: Home, path: '/home', label: 'Home' },
    { icon: Calendar, path: '/timeline', label: 'Timeline' },
    { icon: Heart, path: '/reasons', label: 'Reasons' },
    { icon: Gift, path: '/cake', label: 'Cake' },
  ];

  return (
    <div className="min-h-screen bg-pink-50 font-sans text-slate-800 overflow-hidden relative">
      {/* Background Gradient / Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-20%] w-[50%] h-[50%] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-full"
          >
            <Outlet context={{ isPlaying, toggleMusic }} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Music Toggle (Visible everywhere except maybe Gatekeeper if desired, but good to have) */}
      {!isGatekeeper && (
         <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMusic}
            className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg backdrop-blur-md transition-colors ${isPlaying ? 'bg-pink-400 text-white' : 'bg-white/50 text-pink-400'}`}
         >
           <Music size={20} className={isPlaying ? "animate-pulse" : ""} />
         </motion.button>
      )}

      {/* Bottom Navigation */}
      {!isGatekeeper && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
          <div className="bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg rounded-2xl flex justify-around items-center p-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative p-2 rounded-xl transition-colors duration-300 flex flex-col items-center gap-1 ${
                    isActive ? 'text-pink-600' : 'text-slate-500 hover:text-pink-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -bottom-1 w-1 h-1 bg-pink-600 rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
