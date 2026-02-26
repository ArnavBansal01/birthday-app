// Utility functions for the birthday app

// Play celebration sound (placeholder - replace with actual audio files)
export const playCelebrationSound = (type: 'yay' | 'confetti' | 'whoosh' = 'yay') => {
  try {
    // In production, you would load actual audio files:
    // const audio = new Audio(`/sounds/${type}.mp3`);
    // audio.play();
    
    // For now, using Web Audio API to generate a simple cheerful tone
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'yay') {
      // Happy ascending tone
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.exponentialRampToValueAtTime(784, audioContext.currentTime + 0.3); // G5
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    } else if (type === 'confetti') {
      // Sparkle sound
      oscillator.frequency.setValueAtTime(1046.5, audioContext.currentTime); // C6
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    } else {
      // Whoosh sound
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.log('Audio playback not supported:', error);
  }
};

// Generate random pastel color for decorative elements
export const getRandomPastelColor = () => {
  const pastels = [
    '#FFB6C1', // Light Pink
    '#FF69B4', // Hot Pink
    '#DDA0DD', // Plum
    '#E6E6FA', // Lavender
    '#FFC0CB', // Pink
    '#F0E6FF', // Light Purple
    '#FFE4E1', // Misty Rose
    '#D8BFD8', // Thistle
  ];
  return pastels[Math.floor(Math.random() * pastels.length)];
};

// Format time remaining for countdown
export const formatTimeRemaining = (date: Date) => {
  const now = new Date();
  const difference = date.getTime() - now.getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isReached: true };
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isReached: false,
  };
};

// Check if it's the birthday
export const isBirthday = (birthdayDate: Date) => {
  const now = new Date();
  return now >= birthdayDate;
};

// Get a random celebration emoji
export const getRandomCelebrationEmoji = () => {
  const emojis = ['🎉', '🎊', '🎈', '🎁', '🎂', '✨', '💖', '🌟', '💝', '🎀', '🦋', '🌸'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

// Vibrate device (if supported) for haptic feedback
export const vibrateDevice = (pattern: number | number[] = 50) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

// Save progress to localStorage
export const saveProgress = (key: string, value: any) => {
  try {
    localStorage.setItem(`birthday-saara-${key}`, JSON.stringify(value));
  } catch (error) {
    console.log('LocalStorage not available:', error);
  }
};

// Load progress from localStorage
export const loadProgress = <T>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(`birthday-saara-${key}`);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.log('LocalStorage not available:', error);
    return defaultValue;
  }
};

// Calculate which page user is on for progress tracking
export const getPageProgress = (pathname: string): number => {
  const pages = ['/', '/home', '/memories', '/reasons', '/cake', '/letter'];
  const index = pages.indexOf(pathname);
  return index === -1 ? 0 : Math.round((index / (pages.length - 1)) * 100);
};

// Generate sparkle positions for decorative elements
export const generateSparkles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 8,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
  }));
};

// Check if user is on mobile
export const isMobile = () => {
  return window.innerWidth < 768;
};

// Get appropriate animation duration based on device
export const getAnimationDuration = (baseMs: number) => {
  // Reduce animation time on mobile for better performance
  return isMobile() ? baseMs * 0.7 : baseMs;
};

// Create confetti configuration
export const getConfettiConfig = () => {
  const mobile = isMobile();
  return {
    numberOfPieces: mobile ? 300 : 600,
    gravity: mobile ? 0.3 : 0.2,
    colors: ['#FFB6C1', '#FF69B4', '#DDA0DD', '#E6E6FA', '#FFC0CB', '#F0E6FF'],
    recycle: false,
  };
};
