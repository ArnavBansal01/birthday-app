import { motion, Variants } from 'motion/react';

interface BearProps {
  type: 'milk' | 'mocha';
  size?: number;
  holding?: 'heart' | 'gift' | 'none';
  animate?: boolean;
}

export function MilkAndMochaBear({ type, size = 80, holding = 'none', animate = true }: BearProps) {
  const bearColor = type === 'milk' ? '#F5F5F5' : '#8B6F47';
  const innerColor = type === 'milk' ? '#FFE4E1' : '#D4A574';

  const bearVariants: Variants = animate ? {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
      },
    },
  } : {};

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      variants={bearVariants}
      initial={animate ? "initial" : undefined}
      animate={animate ? "animate" : undefined}
      whileHover={animate ? "hover" : undefined}
    >
      {/* Ears */}
      <circle cx={25} cy={25} r={15} fill={bearColor} />
      <circle cx={75} cy={25} r={15} fill={bearColor} />
      <circle cx={25} cy={25} r={10} fill={innerColor} />
      <circle cx={75} cy={25} r={10} fill={innerColor} />
      
      {/* Head */}
      <circle cx={50} cy={50} r={30} fill={bearColor} />
      
      {/* Face */}
      <circle cx={50} cy={50} r={22} fill={innerColor} />
      
      {/* Eyes */}
      <circle cx={42} cy={45} r={3} fill="#2D2D2D" />
      <circle cx={58} cy={45} r={3} fill="#2D2D2D" />
      
      {/* Nose */}
      <ellipse cx={50} cy={55} rx={4} ry={3} fill="#2D2D2D" />
      
      {/* Mouth */}
      <path
        d="M 45 58 Q 50 62 55 58"
        stroke="#2D2D2D"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Blush */}
      <circle cx={35} cy={52} r={4} fill="#FFB6C1" opacity="0.5" />
      <circle cx={65} cy={52} r={4} fill="#FFB6C1" opacity="0.5" />
      
      {/* Holding items */}
      {holding === 'heart' && (
        <g transform="translate(50, 75)">
          <motion.path
            d="M 0,-5 C -3,-8 -8,-8 -10,-4 C -10,0 0,8 0,8 C 0,8 10,0 10,-4 C 10,-8 5,-8 0,-5 Z"
            fill="#FF69B4"
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </g>
      )}
      
      {holding === 'gift' && (
        <g transform="translate(50, 78)">
          <rect x="-6" y="-6" width="12" height="10" fill="#FFB6C1" />
          <rect x="-1" y="-6" width="2" height="10" fill="#FF69B4" />
          <rect x="-6" y="-2" width="12" height="2" fill="#FF69B4" />
          <path d="M -6,-6 L 0,-10 L 6,-6" stroke="#FF69B4" strokeWidth="1.5" fill="none" />
        </g>
      )}
    </motion.svg>
  );
}
