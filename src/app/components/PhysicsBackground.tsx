import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface FloatingItem {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'bow';
  scale: number;
  rotation: number;
}

export function PhysicsBackground() {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Generate floating items
    const newItems = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      type: Math.random() > 0.5 ? 'heart' : 'bow',
      scale: 0.5 + Math.random() * 0.8,
      rotation: Math.random() * 360,
    })) as FloatingItem[];
    setItems(newItems);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 40;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 40;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            scale: item.scale,
            x,
            y,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [item.rotation, item.rotation + 10, item.rotation],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        >
          {item.type === 'heart' ? (
            <Heart className="fill-pink-300/20 stroke-pink-400/30" size={24} />
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 6L14 8H16L12 12L8 8H10L12 6Z"
                fill="#DDA0DD"
                opacity="0.3"
              />
              <path
                d="M12 12L14 14H16L12 18L8 14H10L12 12Z"
                fill="#FFB6C1"
                opacity="0.3"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
