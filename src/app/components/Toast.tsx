import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, CakeSlice, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

type ToastType = 'heart' | 'sparkle' | 'cake' | 'mail';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  show: boolean;
  onClose: () => void;
}

const iconMap = {
  heart: Heart,
  sparkle: Sparkles,
  cake: CakeSlice,
  mail: Mail,
};

const colorMap = {
  heart: 'from-pink-400 to-rose-400',
  sparkle: 'from-purple-400 to-pink-400',
  cake: 'from-pink-400 to-purple-400',
  mail: 'from-purple-400 to-fuchsia-400',
};

export function Toast({ 
  message, 
  type = 'heart', 
  duration = 3000, 
  show,
  onClose 
}: ToastProps) {
  const Icon = iconMap[type];
  const colors = colorMap[type];

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
          initial={{ y: -100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="backdrop-blur-2xl bg-white/30 border-2 border-white/60 rounded-full shadow-2xl px-6 py-4">
            <div className="flex items-center gap-3">
              <motion.div
                className={`p-2 rounded-full bg-gradient-to-br ${colors}`}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Icon className="w-5 h-5 text-white" />
              </motion.div>
              <p className="font-semibold text-pink-900">{message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for easy toast usage
export function useToast() {
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: ToastType;
  }>({
    show: false,
    message: '',
    type: 'heart',
  });

  const showToast = (message: string, type: ToastType = 'heart') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  return {
    toast,
    showToast,
    hideToast,
  };
}
