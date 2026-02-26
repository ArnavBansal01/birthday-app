import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ left: `${heart.x}%` }}
          initial={{ y: '110%', opacity: 0 }}
          animate={{
            y: '-10%',
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Heart
            className="fill-pink-300/30 stroke-pink-400/40"
            size={16 + Math.random() * 16}
          />
        </motion.div>
      ))}
    </div>
  );
}
