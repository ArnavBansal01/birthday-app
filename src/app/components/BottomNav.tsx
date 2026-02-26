import { motion } from 'motion/react';
import { Heart, Gift, Clock, Music, CakeSlice, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Heart, label: 'Home', path: '/home' },
    { icon: Clock, label: 'Timeline', path: '/timeline' },
    { icon: Gift, label: 'Reasons', path: '/reasons' },
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
        <div className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-full shadow-2xl px-6 py-3">
          <div className="flex justify-around items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative p-3 rounded-full transition-colors ${
                    isActive ? 'bg-pink-400/30' : 'hover:bg-pink-300/20'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon
                    className={`${
                      isActive ? 'stroke-pink-600' : 'stroke-pink-400'
                    }`}
                    size={20}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-br from-pink-300/40 to-purple-300/40 rounded-full"
                      style={{ zIndex: -1 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
