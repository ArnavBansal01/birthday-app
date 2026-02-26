import { motion } from 'motion/react';
import { Clock, Sparkles } from 'lucide-react';
import { TimelineCard } from '../components/TimelineCard';
import { FloatingHearts } from '../components/FloatingHearts';
import { BottomNav } from '../components/BottomNav';

const moments = [
  {
    title: 'The Day We Met',
    date: 'A Beautiful Beginning',
    message: 'From the very first moment, I knew you were someone special. Your smile lit up the room and your energy was contagious. Little did I know that this would be the start of something amazing.',
  },
  {
    title: 'Our First Adventure',
    date: 'Making Memories',
    message: 'Remember when we got completely lost but ended up finding that hidden gem of a café? That\'s when I realized that with you, even being lost feels like an adventure worth taking.',
  },
  {
    title: 'The Midnight Conversation',
    date: 'Deep Connections',
    message: 'That night we talked until the sun came up, sharing dreams and fears. I\'ve never felt so understood by anyone. You have this incredible ability to make people feel heard.',
  },
  {
    title: 'Your Support Through Tough Times',
    date: 'Always There',
    message: 'When everything seemed impossible, you were there with your unwavering support and encouragement. You reminded me of my strength when I had forgotten it myself.',
  },
  {
    title: 'The Laughter We Share',
    date: 'Joy in Every Moment',
    message: 'No one makes me laugh quite like you do. Those inside jokes, the silly moments, the way you can turn any situation into something fun - you bring light to every day.',
  },
  {
    title: 'Growing Together',
    date: 'An Ongoing Journey',
    message: 'Watching you grow and achieve your dreams has been such a privilege. Your dedication, passion, and kindness continue to inspire me every single day.',
  },
];

export function TimelinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 pb-24 overflow-hidden relative">
      <FloatingHearts />

      <div className="relative z-10 px-4 pt-8">
        {/* Header */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Clock className="w-8 h-8 text-pink-600" />
            <Sparkles className="w-6 h-6 text-purple-500" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Our Best Moments
          </h1>
          <p className="text-pink-700">
            A journey through the memories we've shared together
          </p>
          <p className="text-sm text-pink-600 mt-2">
            ✨ Tap each moment to read the full story ✨
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-300 via-purple-300 to-pink-300" />

          {/* Timeline items */}
          <div className="space-y-12 pb-8">
            {moments.map((moment, index) => (
              <TimelineCard key={index} moment={moment} index={index} />
            ))}
          </div>

          {/* End marker */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="backdrop-blur-xl bg-gradient-to-br from-pink-300/50 to-purple-300/50 border-2 border-white/60 rounded-full px-8 py-4 shadow-xl">
              <p className="text-pink-900 font-semibold text-center">
                And many more moments to come... 💕
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
