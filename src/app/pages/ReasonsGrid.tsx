import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";

// Placeholder for Milk & Mocha bear holding a heart
const BEAR_CARD_IMG = "https://images.unsplash.com/photo-1736247969867-d7dbb5a13a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2FydG9vbiUyMGJlYXIlMjB3aGl0ZSUyMGJyb3duJTIwcGFzdGVsfGVufDF8fHx8MTc3MjAwNTM1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const REASONS = [
  "Your infectious laugh that lights up the room",
  "How you always know what to say",
  "Your kind and gentle heart",
  "The way you scrunch your nose when you smile",
  "Your passion for the things you love",
  "How safe I feel when I'm with you",
  "Your silly jokes that only we understand",
  "The way you support my dreams",
  "Just for being you",
];

export function ReasonsGrid() {
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  const handleCardClick = (index: number) => {
    if (flippedIndices.includes(index)) {
      setFlippedIndices(flippedIndices.filter((i) => i !== index));
    } else {
      setFlippedIndices([...flippedIndices, index]);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 pb-24 pt-10 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 font-serif mb-2">9 Reasons Why</h2>
        <p className="text-gray-500">Tap a card to reveal a secret</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {REASONS.map((reason, index) => (
          <div key={index} className="h-40 perspective-1000">
            <motion.div
              className="w-full h-full relative preserve-3d cursor-pointer"
              animate={{ rotateY: flippedIndices.includes(index) ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              onClick={() => handleCardClick(index)}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front of Card */}
              <div 
                className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden border-2 border-pink-100"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img src={BEAR_CARD_IMG} alt="Bear" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center bg-pink-500/10">
                   <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={40} />
                </div>
              </div>

              {/* Back of Card */}
              <div 
                className="absolute inset-0 backface-hidden bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl shadow-xl flex items-center justify-center p-4 text-center transform rotate-y-180"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <p className="text-white font-medium font-serif text-lg leading-tight">
                  {reason}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
