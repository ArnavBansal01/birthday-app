import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Mail, Heart, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { PhysicsBackground } from '../components/PhysicsBackground';
import { GlowingBottomNav } from '../components/GlowingBottomNav';

export function EnhancedLetterPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring animation for scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Milk bear follows scroll (right side)
  const milkY = useTransform(smoothProgress, [0, 1], ['0%', '80%']);
  const milkRotate = useTransform(smoothProgress, [0, 0.5, 1], [0, 5, -5]);

  // Mocha bear follows scroll (left side)
  const mochaY = useTransform(smoothProgress, [0, 1], ['10%', '90%']);
  const mochaRotate = useTransform(smoothProgress, [0, 0.5, 1], [0, -5, 5]);

  const letterParagraphs = [
    {
      text: "On this special day, I want you to know just how incredibly grateful I am to have you in my life. Your birthday isn't just a celebration of another year—it's a celebration of the amazing person you are and the light you bring into this world.",
      delay: 0,
    },
    {
      text: "From the moment I met you, I knew there was something extraordinary about you. Your kindness, your warmth, your genuine care for others—these aren't just qualities you possess, they're the very essence of who you are.",
      delay: 0.1,
    },
    {
      text: "You have this incredible gift of making everyone around you feel seen, heard, and valued. The way you listen with your whole heart, the way you offer support without judgment, and the way you celebrate others' successes as if they were your own—it's truly remarkable.",
      delay: 0.2,
    },
    {
      text: "Your strength inspires me constantly. The way you handle challenges with grace, the way you never give up on your dreams, and the way you continue to grow and evolve—it's nothing short of remarkable. You've taught me so much about resilience, compassion, and what it means to truly live with purpose.",
      delay: 0.3,
    },
    {
      text: "I hope you know that your smile has the power to brighten the darkest days. Your laughter is contagious, your energy is magnetic, and your presence is a gift. The world is genuinely a better place because you're in it.",
      delay: 0.4,
    },
    {
      text: "The memories we've created together are treasures I hold close to my heart. Every conversation, every adventure, every moment of shared laughter—they've all contributed to making life more beautiful and meaningful.",
      delay: 0.5,
    },
    {
      text: "As you celebrate another year around the sun, I want you to remember that you are deeply loved, appreciated, and cherished. You deserve all the happiness, success, and beautiful moments that life has to offer.",
      delay: 0.6,
    },
    {
      text: "May this year bring you closer to your dreams and fill your days with joy, laughter, and love. May you continue to shine your light on everyone fortunate enough to know you. May you always remember how truly special you are.",
      delay: 0.7,
    },
    {
      text: "Thank you for being you—authentic, kind, brilliant, and beautiful inside and out. Thank you for the memories we've made and for all the adventures yet to come. Thank you for your friendship, your support, and for simply existing in this world.",
      delay: 0.8,
    },
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 pb-60 relative overflow-x-hidden"
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <PhysicsBackground />
      </div>

      {/* Scroll-following bears */}
      <motion.div
        className="fixed right-4 top-20 z-20 pointer-events-none hidden md:block"
        style={{ y: milkY, rotate: milkRotate }}
      >
        <MilkBearSticker />
      </motion.div>

      <motion.div
        className="fixed left-4 top-32 z-20 pointer-events-none hidden md:block"
        style={{ y: mochaY, rotate: mochaRotate }}
      >
        <MochaBearSticker />
      </motion.div>

      {/* Mobile floating stickers */}
      <motion.div
        className="fixed right-2 top-24 z-20 pointer-events-none md:hidden"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <MilkBearSticker size={50} />
      </motion.div>

      <motion.div
        className="fixed left-2 top-40 z-20 pointer-events-none md:hidden"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        <MochaBearSticker size={50} />
      </motion.div>

      <div className="relative z-10 px-4 pt-8">
        {/* Header */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-8 sticky top-0 bg-gradient-to-b from-pink-100 via-purple-100/90 to-transparent pt-4 pb-8 backdrop-blur-sm z-30"
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
          
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent px-4">
            A Letter for You
          </h1>
          <p className="text-sm md:text-base text-pink-700 px-6">
            A heartfelt message on your special day 💌
          </p>
        </motion.div>

        {/* Letter */}
        <motion.div
          className="w-[82vw] md:w-full max-w-2xl mx-auto mb-8"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        >
          {/* Glassmorphism 2.0 wrapper */}
          <div className="relative rounded-3xl overflow-hidden p-[3px]">
            {/* Moving gradient border */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, #FFB6C1, #DDA0DD, #E6E6FA, #FFC0CB, #FFB6C1)',
                backgroundSize: '400% 100%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            <div className="relative backdrop-blur-2xl bg-white/20 rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-pink-300/30 to-purple-300/30 backdrop-blur-sm p-6 border-b-2 border-white/20">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-pink-600 fill-pink-600" />
                  <h2 className="text-2xl font-bold text-pink-900">Dear Saara,</h2>
                </div>
              </div>

              <div className="p-4 md:p-10 space-y-6 md:space-y-8 max-h-[60vh] md:max-h-[70vh] overflow-y-auto custom-scrollbar px-5 md:px-6">
                {/* Opening flourish */}
                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Heart className="w-4 h-4 fill-pink-400 stroke-pink-500" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Blooming paragraphs */}
                {letterParagraphs.map((para, index) => (
                  <BloomingParagraph key={index} delay={para.delay}>
                    {para.text}
                  </BloomingParagraph>
                ))}

                {/* Quote box */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden p-[2px] my-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400" />
                  <div className="relative backdrop-blur-xl bg-white/40 rounded-2xl p-6">
                    <p className="text-pink-900 leading-relaxed italic text-center font-medium">
                      "You are braver than you believe, stronger than you seem, smarter than you think,
                      and loved more than you know."
                    </p>
                  </div>
                </motion.div>

                {/* Final wishes */}
                <BloomingParagraph delay={0.9}>
                  Here's to you, Saara—to your dreams, your journey, and the incredible person you
                  continue to become. May your day be filled with love, laughter, cake, and all your
                  favorite things. You deserve nothing less than the most magical birthday ever! 🎉✨💖
                </BloomingParagraph>

                {/* Signature */}
                <motion.div
                  className="text-right pt-8 border-t-2 border-pink-300/30"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <p className="text-pink-900 font-semibold text-lg mb-2">
                    With all my love,
                  </p>
                  <div className="flex justify-end items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="w-5 h-5 text-pink-600 fill-pink-600" />
                    </motion.div>
                    <p className="text-pink-700 italic">Someone who cares deeply about you</p>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      <Heart className="w-5 h-5 text-pink-600 fill-pink-600" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Closing flourish */}
                <motion.div
                  className="flex justify-center gap-3 pt-6"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, delay: 1.2 }}
                >
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    >
                      <Sparkles className="w-5 h-5 text-pink-500" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <GlowingBottomNav />
    </div>
  );
}

// Blooming paragraph component
function BloomingParagraph({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.p
      className="text-pink-900 leading-relaxed text-base md:text-lg"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.8,
        delay,
        type: 'spring',
        stiffness: 100,
      }}
    >
      {children}
    </motion.p>
  );
}

// Milk bear sticker
function MilkBearSticker({ size = 80 }: { size?: number }) {
  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        {/* Ears */}
        <circle cx={25} cy={25} r={15} fill="#F5F5F5" />
        <circle cx={75} cy={25} r={15} fill="#F5F5F5" />
        <circle cx={25} cy={25} r={10} fill="#FFE4E1" />
        <circle cx={75} cy={25} r={10} fill="#FFE4E1" />
        
        {/* Head */}
        <circle cx={50} cy={50} r={30} fill="#F5F5F5" />
        
        {/* Face */}
        <circle cx={50} cy={50} r={22} fill="#FFE4E1" />
        
        {/* Eyes */}
        <circle cx={42} cy={45} r={3} fill="#2D2D2D" />
        <circle cx={58} cy={45} r={3} fill="#2D2D2D" />
        
        {/* Nose */}
        <ellipse cx={50} cy={55} rx={4} ry={3} fill="#2D2D2D" />
        
        {/* Smile */}
        <path d="M 45 58 Q 50 62 55 58" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        
        {/* Blush */}
        <circle cx={35} cy={52} r={4} fill="#FFB6C1" opacity="0.5" />
        <circle cx={65} cy={52} r={4} fill="#FFB6C1" opacity="0.5" />
        
        {/* Heart */}
        <motion.path
          d="M 50,75 C 48,72 43,72 41,76 C 41,80 50,85 50,85 C 50,85 59,80 59,76 C 59,72 54,72 50,75 Z"
          fill="#FF69B4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </svg>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 backdrop-blur-xl bg-white/90 rounded-full px-3 py-1 shadow-lg whitespace-nowrap">
        <p className="text-xs font-bold text-pink-600">💖</p>
      </div>
    </motion.div>
  );
}

// Mocha bear sticker
function MochaBearSticker({ size = 80 }: { size?: number }) {
  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.1, rotate: -5 }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        {/* Ears */}
        <circle cx={25} cy={25} r={15} fill="#8B6F47" />
        <circle cx={75} cy={25} r={15} fill="#8B6F47" />
        <circle cx={25} cy={25} r={10} fill="#D4A574" />
        <circle cx={75} cy={25} r={10} fill="#D4A574" />
        
        {/* Head */}
        <circle cx={50} cy={50} r={30} fill="#8B6F47" />
        
        {/* Face */}
        <circle cx={50} cy={50} r={22} fill="#D4A574" />
        
        {/* Eyes */}
        <circle cx={42} cy={45} r={3} fill="#2D2D2D" />
        <circle cx={58} cy={45} r={3} fill="#2D2D2D" />
        
        {/* Nose */}
        <ellipse cx={50} cy={55} rx={4} ry={3} fill="#2D2D2D" />
        
        {/* Smile */}
        <path d="M 45 58 Q 50 62 55 58" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        
        {/* Blush */}
        <circle cx={35} cy={52} r={4} fill="#DDA0DD" opacity="0.5" />
        <circle cx={65} cy={52} r={4} fill="#DDA0DD" opacity="0.5" />
        
        {/* Sparkles */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50px 75px' }}
        >
          <path d="M 50,70 L 52,75 L 50,80 L 48,75 Z" fill="#FFD700" />
          <path d="M 45,75 L 50,77 L 55,75 L 50,73 Z" fill="#FFD700" />
        </motion.g>
      </svg>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 backdrop-blur-xl bg-white/90 rounded-full px-3 py-1 shadow-lg whitespace-nowrap">
        <p className="text-xs font-bold text-purple-600">✨</p>
      </div>
    </motion.div>
  );
}
