# 🎀 Quick Customization Guide

## 🎯 Essential Customizations

### 1. Set the Birthday Date
**File**: `/src/app/pages/EnhancedGatekeeperPage.tsx`
**Line**: 14

```tsx
// Format: new Date(YEAR, MONTH-1, DAY, HOUR, MINUTE, SECOND)
const birthdayDate = new Date(2026, 2, 25, 0, 0, 0); // March 25, 2026 at midnight
```

**Month Index**: 0 = January, 1 = February, ..., 11 = December

---

### 2. Customize Memory Cards
**File**: `/src/app/pages/MemoriesPage.tsx`
**Line**: 9-52

```tsx
const memories = [
  {
    id: 1,
    title: 'Your Custom Title',
    description: 'Your custom description (keep under 60 chars)',
    date: 'Date Label (e.g., "Summer 2023")',
    imageColor: 'bg-gradient-to-br from-pink-300 to-rose-300', // Tailwind gradient
  },
  // Add up to 10-12 memories for best experience
];
```

**Available Gradient Colors**:
- `from-pink-300 to-rose-300`
- `from-purple-300 to-pink-300`
- `from-blue-300 to-purple-300`
- `from-yellow-300 to-pink-300`
- `from-green-300 to-teal-300`
- `from-indigo-300 to-purple-300`

---

### 3. Update "Reasons Why" Messages
**File**: `/src/app/pages/EnhancedReasonsPage.tsx`
**Line**: 7-17

```tsx
const reasons = [
  { text: 'Your reason here (keep under 50 chars)', bear: 'milk' as const },
  { text: 'Another reason...', bear: 'mocha' as const },
  // Exactly 9 reasons work best for 3x3 grid
];
```

**Bear Types**:
- `'milk'` - White bear
- `'mocha'` - Brown bear

---

### 4. Personalize the Letter
**File**: `/src/app/pages/EnhancedLetterPage.tsx`
**Line**: 29-66

```tsx
const letterParagraphs = [
  {
    text: 'Your paragraph text here...',
    delay: 0, // Animation delay in seconds
  },
  // Add as many paragraphs as needed
];
```

**Tips**:
- Keep paragraphs 2-4 sentences for readability
- Increase delay by 0.1s for each paragraph
- Use emojis sparingly for emphasis

**Quote Section** (Line 212-225):
```tsx
<p className="text-pink-900 leading-relaxed italic text-center font-medium">
  "Your inspirational quote here..."
</p>
```

**Signature** (Line 243-245):
```tsx
<p className="text-pink-900 font-semibold text-lg mb-2">
  With all my love,
</p>
<p className="text-pink-700 italic">Your Name or Message</p>
```

---

### 5. Change Welcome Message
**File**: `/src/app/pages/EnhancedHomePage.tsx`
**Line**: 304-310

```tsx
<p className="text-pink-800 leading-relaxed text-center mb-4 text-lg">
  Your custom welcome message here! This appears on the home page
  and sets the tone for the entire experience.
</p>
```

---

## 🎨 Visual Customizations

### Change Color Scheme
**File**: `/src/styles/theme.css`

**Current Coquette Palette**:
```css
--primary-pink: #FFB6C1;
--hot-pink: #FF69B4;
--lavender: #DDA0DD;
--light-purple: #E6E6FA;
```

**To Change**: Search and replace color codes throughout the app. Main locations:
- Gradient backgrounds: `from-pink-XXX to-purple-XXX`
- Border colors: `border-pink-XXX`
- Text colors: `text-pink-XXX`

### Adjust Animation Speed
**Global Speed Multiplier**:
Search for `duration:` in all files and multiply/divide by desired factor.

**Quick Changes**:
- Confetti: `/src/app/pages/EnhancedHomePage.tsx` line 26
- Cake flames: `/src/app/pages/EnhancedCakePage.tsx` line 28-50
- Card flips: `/src/app/components/FlipCard.tsx` line 21

---

## 🔊 Add Real Audio

### Music Toggle
**File**: `/src/app/pages/EnhancedHomePage.tsx`
**Line**: 11

```tsx
const [isMusicPlaying, setIsMusicPlaying] = useState(false);
const audioRef = useRef<HTMLAudioElement>(null);

// Add in return statement:
<audio ref={audioRef} src="/path/to/your-music.mp3" loop />

// In toggle function:
const toggleMusic = () => {
  if (audioRef.current) {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }
  setIsMusicPlaying(!isMusicPlaying);
};
```

### Cake "Yay!" Sound
**File**: `/src/app/pages/EnhancedCakePage.tsx`
**Line**: 102

Replace the data URI with:
```tsx
<audio ref={audioRef} src="/sounds/yay.mp3" />
```

---

## 📱 Mobile vs Desktop Differences

### Adjust Confetti Amount
**File**: `/src/app/utils/helpers.ts`
**Line**: 81-90

```tsx
export const getConfettiConfig = () => {
  const mobile = isMobile();
  return {
    numberOfPieces: mobile ? 200 : 800, // Adjust these numbers
    gravity: mobile ? 0.4 : 0.2, // Higher = faster fall
  };
};
```

### Disable Physics on Mobile
**File**: `/src/app/components/PhysicsBackground.tsx`

Add condition at line 15:
```tsx
const [enabled, setEnabled] = useState(window.innerWidth >= 768);
```

---

## 🎭 Advanced Customizations

### Add a New Page

1. **Create page file**: `/src/app/pages/YourNewPage.tsx`
2. **Import GlowingBottomNav and PhysicsBackground**
3. **Add route** in `/src/app/App.tsx`:
```tsx
<Route path="/yourpage" element={<YourNewPage />} />
```
4. **Add nav item** in `/src/app/components/GlowingBottomNav.tsx` line 9:
```tsx
{ icon: YourIcon, label: 'Label', path: '/yourpage' },
```

### Change Bear Characters
**File**: `/src/app/components/MilkAndMochaBear.tsx`

Edit SVG paths and colors to create different characters. Key sections:
- Ears: Lines 24-27
- Face: Lines 32-34
- Eyes: Lines 37-38
- Colors: `bearColor` and `innerColor` variables

### Add Custom Animations
Use these Motion patterns:

**Entrance**:
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ type: 'spring', stiffness: 200 }}
```

**Infinite Loop**:
```tsx
animate={{ rotate: [0, 360] }}
transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
```

**Hover**:
```tsx
whileHover={{ scale: 1.1, rotate: 5 }}
whileTap={{ scale: 0.95 }}
```

---

## 🐛 Common Issues & Fixes

### Issue: Countdown shows wrong time
**Fix**: Check timezone in birthdayDate. Use specific hour:
```tsx
new Date(2026, 2, 25, 0, 0, 0) // Midnight local time
```

### Issue: Cards won't swipe on mobile
**Fix**: Ensure parent has defined height in MemoriesPage.tsx line 114:
```tsx
<div className="max-w-sm mx-auto relative" style={{ height: '500px' }}>
```

### Issue: Animations laggy
**Fix**: Reduce particle counts and animation complexity on mobile.

---

## 🎉 Testing Checklist

- [ ] Set correct birthday date
- [ ] Test countdown timer
- [ ] Customize all 6-10 memory cards
- [ ] Personalize all 9 reasons
- [ ] Write complete letter (6-10 paragraphs)
- [ ] Test on mobile device
- [ ] Test swipe gestures
- [ ] Verify all navigation links work
- [ ] Check animations smooth at 60fps
- [ ] Test with low network speed

---

## 💡 Pro Tips

1. **Image Placeholders**: Replace gradient backgrounds with actual images using Unsplash
2. **Real Photos**: Use `ImageWithFallback` component for memory cards
3. **Custom Icons**: Import from lucide-react for consistent style
4. **Accessibility**: Add aria-labels to interactive elements
5. **SEO**: Update page titles and meta descriptions
6. **Performance**: Use `loading="lazy"` for images below fold

---

**Need Help?** Check `/DOCUMENTATION.md` and `/FEATURES.md` for detailed technical information!

🎂 **Happy Customizing!**
