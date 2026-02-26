/**
 * 🎂 Birthday App Configuration
 * 
 * Copy this file and customize for your celebration!
 */

export const birthdayConfig = {
  // ===================================
  // 🎯 ESSENTIAL SETTINGS
  // ===================================
  
  // Birthday date (REQUIRED)
  // Format: { year, month (0-11), day, hour, minute }
  birthdayDate: {
    year: 2026,
    month: 2, // 0 = January, 1 = February, ..., 11 = December
    day: 25,
    hour: 0,
    minute: 0,
  },
  
  // Person's name (REQUIRED)
  name: 'Saara',
  
  // ===================================
  // 💌 LETTER CONTENT
  // ===================================
  
  letterParagraphs: [
    'On this special day, I want you to know just how incredibly grateful I am to have you in my life...',
    'From the moment I met you, I knew there was something extraordinary about you...',
    // Add more paragraphs...
  ],
  
  letterQuote: 'You are braver than you believe, stronger than you seem, and loved more than you know.',
  
  letterSignature: {
    closing: 'With all my love,',
    from: 'Someone who cares deeply about you',
  },
  
  // ===================================
  // 🎴 MEMORY CARDS
  // ===================================
  
  memories: [
    {
      id: 1,
      title: 'The Day We Met',
      description: 'Your smile was the first thing I noticed',
      date: 'A Beautiful Beginning',
      imageColor: 'from-pink-300 to-rose-300',
    },
    {
      id: 2,
      title: 'Our First Adventure',
      description: 'Getting lost never felt so right',
      date: 'An Unforgettable Journey',
      imageColor: 'from-purple-300 to-pink-300',
    },
    // Add 4-10 memories total
  ],
  
  // ===================================
  // 💝 REASONS WHY YOU'RE LOVED
  // ===================================
  
  reasons: [
    { text: 'Your smile lights up every room you enter', bear: 'milk' },
    { text: 'You have the kindest heart I\'ve ever known', bear: 'mocha' },
    { text: 'Your laughter is the most beautiful sound', bear: 'milk' },
    { text: 'You make everyone around you feel special', bear: 'mocha' },
    { text: 'Your strength inspires me every single day', bear: 'milk' },
    { text: 'You see beauty in the smallest things', bear: 'mocha' },
    { text: 'Your creativity knows no bounds', bear: 'milk' },
    { text: 'You never give up on your dreams', bear: 'mocha' },
    { text: 'Simply being yourself is more than enough', bear: 'milk' },
  ],
  
  // ===================================
  // 🎨 VISUAL CUSTOMIZATION
  // ===================================
  
  theme: {
    // Primary colors (Coquette palette)
    colors: {
      primary: '#FFB6C1',    // Light Pink
      secondary: '#FF69B4',  // Hot Pink
      accent: '#DDA0DD',     // Plum
      lavender: '#E6E6FA',   // Lavender
    },
    
    // Gradient combinations for memories
    gradients: [
      'from-pink-300 to-rose-300',
      'from-purple-300 to-pink-300',
      'from-blue-300 to-purple-300',
      'from-yellow-300 to-pink-300',
      'from-green-300 to-teal-300',
    ],
  },
  
  // ===================================
  // 🎵 AUDIO SETTINGS
  // ===================================
  
  audio: {
    // Path to your music file
    musicFile: '/audio/lofi-birthday.mp3',
    
    // Path to celebration sound
    celebrationSound: '/audio/yay.mp3',
    
    // Auto-play music on home page (not recommended for mobile)
    autoPlay: false,
    
    // Default volume (0-1)
    defaultVolume: 0.5,
  },
  
  // ===================================
  // ✨ ANIMATION SETTINGS
  // ===================================
  
  animations: {
    // Global animation speed multiplier
    speedMultiplier: 1.0, // 0.5 = half speed, 2.0 = double speed
    
    // Confetti settings
    confetti: {
      desktop: {
        particles: 600,
        gravity: 0.2,
        duration: 8000, // milliseconds
      },
      mobile: {
        particles: 300,
        gravity: 0.3,
        duration: 6000,
      },
    },
    
    // Disable certain effects on mobile for performance
    mobileOptimizations: {
      disablePhysicsBackground: false,
      disableCursorTrail: true,
      reduceParticles: true,
    },
  },
  
  // ===================================
  // 🎯 FEATURE FLAGS
  // ===================================
  
  features: {
    // Enable/disable specific features
    enableCursorTrail: true,
    enablePhysicsBackground: true,
    enableScrollHints: true,
    enableHapticFeedback: true,
    
    // Enable achievement system
    enableAchievements: false,
    
    // Enable progress tracking
    enableProgressTracking: true,
    
    // Show page visit indicators
    showVisitedPages: false,
  },
  
  // ===================================
  // 📱 DISPLAY SETTINGS
  // ===================================
  
  display: {
    // Welcome message on home page
    welcomeMessage: 'Welcome to your special celebration! ✨',
    
    // Tagline
    tagline: 'A journey made just for you',
    
    // Gatekeeper messages
    gatekeeper: {
      locked: '✨ Locked Until...',
      unlocked: '🎉 Time to Celebrate!',
      subtitle: 'A birthday celebration for',
      earlyClickHint: 'Mocha is keeping watch... 🐻',
    },
    
    // Navigation labels (customize if needed)
    navigation: {
      home: 'Home',
      memories: 'Memories',
      reasons: 'Reasons',
      cake: 'Cake',
      letter: 'Letter',
    },
  },
  
  // ===================================
  // 🔧 ADVANCED SETTINGS
  // ===================================
  
  advanced: {
    // Enable debug mode (shows console logs)
    debugMode: false,
    
    // Analytics tracking ID (optional)
    analyticsId: '',
    
    // Custom meta tags for social sharing
    meta: {
      title: 'Happy Birthday Saara! 🎂',
      description: 'A special birthday celebration',
      imageUrl: '/og-image.jpg', // For social media previews
    },
    
    // Custom domain (if using)
    customDomain: '',
    
    // Enable PWA features (install as app)
    enablePWA: false,
  },
};

// ===================================
// 💡 USAGE EXAMPLE
// ===================================

/*
// In your page component:
import { birthdayConfig } from './config';

const { name, birthdayDate, memories } = birthdayConfig;

// Use in component:
<h1>Happy Birthday, {name}!</h1>

// For birthday date:
const date = new Date(
  birthdayDate.year,
  birthdayDate.month,
  birthdayDate.day,
  birthdayDate.hour,
  birthdayDate.minute
);
*/

// ===================================
// ✅ VALIDATION HELPERS
// ===================================

export const validateConfig = (config: typeof birthdayConfig) => {
  const errors: string[] = [];
  
  // Check required fields
  if (!config.name) errors.push('Name is required');
  if (!config.birthdayDate) errors.push('Birthday date is required');
  
  // Check memories
  if (config.memories.length < 3) {
    errors.push('Add at least 3 memories for best experience');
  }
  
  // Check reasons
  if (config.reasons.length !== 9) {
    errors.push('Exactly 9 reasons work best for 3x3 grid');
  }
  
  // Check letter
  if (config.letterParagraphs.length < 5) {
    errors.push('Add at least 5 paragraphs to the letter');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// ===================================
// 📋 EXPORT
// ===================================

export default birthdayConfig;
