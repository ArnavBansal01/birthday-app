import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { FlipCard } from '../components/FlipCard';
import { FloatingHearts } from '../components/FloatingHearts';
import { BottomNav } from '../components/BottomNav';

const reasons = [
  { text: 'Your smile lights up every room you enter', bear: 'milk' as const },
  { text: 'You have the kindest heart I\'ve ever known', bear: 'mocha' as const },
  { text: 'Your laughter is the most beautiful sound', bear: 'milk' as const },
  { text: 'You make everyone around you feel special', bear: 'mocha' as const },
  { text: 'Your strength inspires me every single day', bear: 'milk' as const },
  { text: 'You see beauty in the smallest things', bear: 'mocha' as const },
  { text: 'Your creativity knows no bounds', bear: 'milk' as const },
  { text: 'You never give up on your dreams', bear: 'mocha' as const },
  { text: 'Simply being yourself is more than enough', bear: 'milk' as const },
];

export function ReasonsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 pb-24 overflow-hidden relative">
      <FloatingHearts />

      <div className="relative z-10 px-4 pt-8">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-8 h-8 text-pink-600 fill-pink-600" />
            <Sparkles className="w-6 h-6 text-purple-500" />
            <Heart className="w-8 h-8 text-pink-600 fill-pink-600" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Why You're Loved
          </h1>
          <p className="text-pink-700 mb-2">
            Here are just a few of the countless reasons...
          </p>
          <p className="text-sm text-pink-600">
            💝 Click each card to reveal a special reason 💝
          </p>
        </motion.div>

        {/* Grid of Cards */}
        <motion.div
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: index * 0.1,
              }}
            >
              <FlipCard reason={reason.text} bearType={reason.bear} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          className="max-w-2xl mx-auto backdrop-blur-xl bg-gradient-to-br from-pink-200/40 to-purple-200/40 border-2 border-white/50 rounded-3xl p-8 shadow-xl"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <p className="text-center text-pink-900 font-medium leading-relaxed">
            These are just 9 reasons, but there are countless more. You bring so much joy,
            warmth, and love into this world. Today, we celebrate YOU and all the wonderful
            things that make you unique! 💕✨
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
