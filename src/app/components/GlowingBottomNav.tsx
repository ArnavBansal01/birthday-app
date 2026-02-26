import { motion } from 'motion/react';
import { Heart, Images, CakeSlice, Mail, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function GlowingBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Images, label: 'Memories', path: '/memories' },
    { icon: Heart, label: 'Reasons', path: '/reasons' },
    { icon: CakeSlice, label: 'Cake', path: '/cake' },
    { icon: Mail, label: 'Letter', path: '/letter' },
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 pb-safe"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
    >
      <div className="mx-auto max-w-md px-4 pb-4">
        {/* Glassmorphism 2.0 with moving gradient border */}
        <div className="relative rounded-full overflow-hidden p-[2px]">
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #FFB6C1, #DDA0DD, #FFB6C1, #DDA0DD)',
              backgroundSize: '300% 100%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          {/* Main nav container */}
          <div className="relative backdrop-blur-2xl bg-white/20 rounded-full shadow-2xl px-4 py-2">
            <div className="flex justify-around items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="relative p-3 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon
                      className={`${
                        isActive ? 'stroke-pink-600' : 'stroke-pink-400'
                      } relative z-10`}
                      size={20}
                    />
                    
                    {isActive && (
                      <>
                        {/* Glow effect */}
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/40 to-purple-400/40 blur-xl"
                          layoutId="glow"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Active background */}
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-br from-pink-300/40 to-purple-300/40 rounded-full"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                        
                        {/* Pulsing ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-pink-400/60"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 0, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      </>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
