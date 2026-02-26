import { motion } from 'motion/react';
import { Mail, Heart, Sparkles } from 'lucide-react';
import { MilkAndMochaBear } from '../components/MilkAndMochaBear';
import { FloatingHearts } from '../components/FloatingHearts';
import { BottomNav } from '../components/BottomNav';

export function LetterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 pb-24 overflow-hidden relative">
      <FloatingHearts />

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
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Mail className="w-8 h-8 text-pink-600" />
            <Sparkles className="w-6 h-6 text-purple-500" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            A Letter for You
          </h1>
          <p className="text-pink-700">
            A heartfelt message on your special day 💌
          </p>
        </motion.div>

        {/* Bears */}
        <motion.div
          className="flex justify-center gap-6 mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        >
          <MilkAndMochaBear type="milk" size={60} holding="heart" />
          <MilkAndMochaBear type="mocha" size={60} holding="gift" />
        </motion.div>

        {/* Letter */}
        <motion.div
          className="max-w-3xl mx-auto backdrop-blur-xl bg-white/40 border-2 border-white/60 rounded-3xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-pink-300/50 to-purple-300/50 p-6 border-b-2 border-white/40">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-600 fill-pink-600" />
              <h2 className="text-2xl font-bold text-pink-900">Dear Saara,</h2>
            </div>
          </div>

          <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            <motion.p
              className="text-pink-900 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              On this special day, I want you to know just how incredibly grateful I am to have you
              in my life. Your birthday isn't just a celebration of another year—it's a celebration
              of the amazing person you are and the light you bring into this world.
            </motion.p>

            <motion.p
              className="text-pink-900 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              From the moment I met you, I knew there was something extraordinary about you. Your
              kindness, your warmth, your genuine care for others—these aren't just qualities you
              possess, they're the very essence of who you are. You have this incredible gift of
              making everyone around you feel seen, heard, and valued.
            </motion.p>

            <motion.div
              className="bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-2xl p-6 border-2 border-white/40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-pink-900 leading-relaxed italic">
                "You are braver than you believe, stronger than you seem, smarter than you think,
                and loved more than you know."
              </p>
            </motion.div>

            <motion.p
              className="text-pink-900 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Your strength inspires me constantly. The way you handle challenges with grace, the
              way you never give up on your dreams, and the way you continue to grow and evolve—it's
              nothing short of remarkable. You've taught me so much about resilience, compassion,
              and what it means to truly live with purpose.
            </motion.p>

            <motion.p
              className="text-pink-900 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              I hope you know that your smile has the power to brighten the darkest days. Your
              laughter is contagious, your energy is magnetic, and your presence is a gift. The
              world is genuinely a better place because you're in it, and I feel incredibly
              fortunate to witness your journey.
            </motion.p>

            <motion.p
              className="text-pink-900 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              As you celebrate another year around the sun, I want you to remember that you are
              deeply loved, appreciated, and cherished. You deserve all the happiness, success, and
              beautiful moments that life has to offer. May this year bring you closer to your
              dreams and fill your days with joy, laughter, and love.
            </motion.p>

            <motion.p
              className="text-pink-900 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Thank you for being you—authentic, kind, brilliant, and beautiful inside and out.
              Thank you for the memories we've made and for all the adventures yet to come. Thank
              you for your friendship, your support, and for simply existing in this world.
            </motion.p>

            <motion.div
              className="pt-6 border-t-2 border-pink-200/40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="text-pink-900 leading-relaxed font-medium mb-4">
                Here's to you, Saara—to your dreams, your journey, and the incredible person you
                continue to become. Happy Birthday! 🎉
              </p>
              <p className="text-pink-900 leading-relaxed">
                May your day be filled with love, laughter, cake, and all your favorite things.
                You deserve nothing less than the most magical birthday ever! ✨💖
              </p>
            </motion.div>

            <motion.div
              className="text-right pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-pink-900 font-semibold text-lg">With all my love,</p>
              <div className="flex justify-end items-center gap-3 mt-2">
                <Heart className="w-5 h-5 text-pink-600 fill-pink-600" />
                <p className="text-pink-700 italic">Someone who cares deeply about you</p>
                <Heart className="w-5 h-5 text-pink-600 fill-pink-600" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="max-w-3xl mx-auto mt-6 flex justify-center gap-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <Heart className="w-6 h-6 fill-pink-400/60 stroke-pink-500/60" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
