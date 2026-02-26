import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Music, Music2, Pause, Play, Sparkles } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

// Placeholder for Milk & Mocha bear image
const BEAR_IMG = "https://images.unsplash.com/photo-1736247969867-d7dbb5a13a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2FydG9vbiUyMGJlYXIlMjB3aGl0ZSUyMGJyb3duJTIwcGFzdGVsfGVufDF8fHx8MTc3MjAwNTM1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Lo-fi music placeholder
const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112762.mp3"; 

export function Home() {
  const { width, height } = useWindowSize();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Auto-play attempt (might be blocked by browser policy without interaction)
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.log("Autoplay blocked, waiting for interaction");
        }
      }
    };
    playAudio();
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 pb-20 relative overflow-hidden">
      <Confetti width={width} height={height} numberOfPieces={50} gravity={0.05} />
      
      <audio ref={audioRef} src={MUSIC_URL} loop />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="mb-8 relative inline-block"
          >
             <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl relative">
                <img src={BEAR_IMG} alt="Milk and Mocha" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-pink-500/10 mix-blend-overlay" />
             </div>
             <motion.div 
                className="absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-lg text-pink-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
             >
               <Sparkles size={24} />
             </motion.div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 font-serif leading-tight">
            Happy Birthday, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Saara!
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Welcome to your digital wonderland. A place made of memories, love, and sweet moments.
          </p>

          <motion.button
            onClick={toggleMusic}
            whileTap={{ scale: 0.95 }}
            className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-3 text-gray-700 hover:text-pink-600 transition-colors mx-auto"
          >
            {isPlaying ? (
               <>
                 <Pause size={20} className="fill-current" />
                 <span className="font-medium">Pause Lo-Fi</span>
               </>
            ) : (
               <>
                 <Play size={20} className="fill-current" />
                 <span className="font-medium">Play Music</span>
               </>
            )}
            
            {isPlaying && (
              <div className="flex items-end gap-1 h-4">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-pink-400 rounded-full"
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.8, 
                      delay: i * 0.1,
                      ease: "easeInOut" 
                    }}
                  />
                ))}
              </div>
            )}
          </motion.button>
        </motion.div>

        {/* Floating elements background */}
        <div className="absolute inset-0 pointer-events-none">
           <motion.div 
             className="absolute top-20 left-10 text-pink-200"
             animate={{ y: [0, -20, 0] }}
             transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
           >
             <Music size={64} />
           </motion.div>
           <motion.div 
             className="absolute bottom-40 right-10 text-purple-200"
             animate={{ y: [0, -30, 0] }}
             transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
           >
             <Music2 size={80} />
           </motion.div>
        </div>
      </section>
      
      <section className="px-6 pb-24 max-w-md mx-auto text-center">
         <p className="text-gray-400 text-sm">Scroll or use the menu below to explore</p>
         <motion.div 
           className="mt-4 mx-auto w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1"
           animate={{ opacity: [0.5, 1, 0.5] }}
           transition={{ repeat: Infinity, duration: 2 }}
         >
            <motion.div 
              className="w-1 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
         </motion.div>
      </section>
    </div>
  );
}
