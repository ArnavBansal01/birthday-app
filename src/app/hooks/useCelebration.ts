import { useState, useEffect, useCallback } from 'react';
import { playCelebrationSound, saveProgress, loadProgress } from '../utils/helpers';

// Hook for tracking visited pages
export function useVisitedPages() {
  const [visitedPages, setVisitedPages] = useState<Set<string>>(() => {
    const saved = loadProgress('visitedPages', []);
    return new Set(saved);
  });

  const markPageAsVisited = useCallback((page: string) => {
    setVisitedPages((prev) => {
      const newSet = new Set(prev);
      newSet.add(page);
      saveProgress('visitedPages', Array.from(newSet));
      return newSet;
    });
  }, []);

  return { visitedPages, markPageAsVisited };
}

// Hook for countdown timer
export function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isReached, setIsReached] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsReached(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsReached(true);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft, isReached };
}

// Hook for confetti state management
export function useConfetti(autoStop = true, duration = 8000) {
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    playCelebrationSound('confetti');
    
    if (autoStop) {
      setTimeout(() => {
        setShowConfetti(false);
      }, duration);
    }
  }, [autoStop, duration]);

  const stopConfetti = useCallback(() => {
    setShowConfetti(false);
  }, []);

  return { showConfetti, triggerConfetti, stopConfetti };
}

// Hook for window size tracking
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Hook for scroll progress tracking
export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
}

// Hook for device motion (tilt) tracking
export function useDeviceMotion() {
  const [motion, setMotion] = useState({ x: 0, y: 0 });
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (!window.DeviceOrientationEvent) {
      return;
    }

    const handleMotion = (event: DeviceOrientationEvent) => {
      if (event.beta && event.gamma) {
        // beta: front-to-back tilt (-180 to 180)
        // gamma: left-to-right tilt (-90 to 90)
        setMotion({
          x: Math.max(-30, Math.min(30, event.gamma)),
          y: Math.max(-30, Math.min(30, event.beta - 90)),
        });
        setIsSupported(true);
      }
    };

    window.addEventListener('deviceorientation', handleMotion);
    
    return () => window.removeEventListener('deviceorientation', handleMotion);
  }, []);

  return { motion, isSupported };
}

// Hook for managing music state
export function useMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
    // In production, you would control actual audio here
  }, []);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  }, []);

  return { isPlaying, volume, togglePlay, changeVolume };
}

// Hook for celebration achievements
export function useCelebrationAchievements() {
  const [achievements, setAchievements] = useState<Record<string, boolean>>(() => {
    return loadProgress('achievements', {});
  });

  const unlockAchievement = useCallback((achievementId: string) => {
    setAchievements((prev) => {
      if (prev[achievementId]) return prev; // Already unlocked
      
      const updated = { ...prev, [achievementId]: true };
      saveProgress('achievements', updated);
      playCelebrationSound('yay');
      
      return updated;
    });
  }, []);

  const hasAchievement = useCallback((achievementId: string) => {
    return achievements[achievementId] || false;
  }, [achievements]);

  return { achievements, unlockAchievement, hasAchievement };
}
