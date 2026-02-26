import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface CursorTrail {
  id: number;
  x: number;
  y: number;
}

export function CursorTrail() {
  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable on desktop
    setIsDesktop(window.innerWidth >= 768);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let lastTime = Date.now();
    const throttleMs = 100; // Only add trail every 100ms

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      const newTrail = {
        id: now,
        x: e.clientX,
        y: e.clientY,
      };

      setTrails((prev) => [...prev.slice(-8), newTrail]);

      // Auto-remove after animation
      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="absolute"
          style={{
            left: trail.x - 8,
            top: trail.y - 8,
          }}
          initial={{
            opacity: 0.6,
            scale: 0.3,
            rotate: Math.random() * 360,
          }}
          animate={{
            opacity: 0,
            scale: 1.2,
            rotate: Math.random() * 360 + 180,
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
        >
          <Heart
            className="fill-pink-300/60 stroke-pink-400/60"
            size={16}
          />
        </motion.div>
      ))}
    </div>
  );
}
