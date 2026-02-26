import { motion } from 'motion/react';
import { Heart, Sparkles, Star } from 'lucide-react';

interface ParticleBurstProps {
  x: number;
  y: number;
  count?: number;
}

export function ParticleBurst({ x, y, count = 12 }: ParticleBurstProps) {
  const particles = Array.from({ length: count }, (_, i) => {
    const angle = (i * 360) / count;
    const distance = 100 + Math.random() * 50;
    const targetX = Math.cos((angle * Math.PI) / 180) * distance;
    const targetY = Math.sin((angle * Math.PI) / 180) * distance;
    
    const icons = [Heart, Sparkles, Star];
    const Icon = icons[Math.floor(Math.random() * icons.length)];
    const colors = [
      'text-pink-400',
      'text-purple-400',
      'text-rose-400',
      'text-fuchsia-400',
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return {
      id: i,
      Icon,
      color,
      targetX,
      targetY,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
    };
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: x,
            top: y,
          }}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            x: particle.targetX,
            y: particle.targetY,
            scale: [0, particle.scale, 0],
            opacity: [0, 1, 0],
            rotate: particle.rotation,
          }}
          transition={{
            duration: 1 + Math.random() * 0.5,
            ease: 'easeOut',
          }}
        >
          <particle.Icon
            className={`${particle.color} ${
              particle.Icon === Heart ? 'fill-current' : ''
            }`}
            size={20 + Math.random() * 10}
          />
        </motion.div>
      ))}
    </div>
  );
}
