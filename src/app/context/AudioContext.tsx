import { createContext, useContext, useState, useEffect, useRef } from 'react';

type AudioTrack = 'lofi' | 'birthday';

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: AudioTrack;
  togglePlay: () => void;
  setTrack: (track: AudioTrack) => void;
  play: () => void;
  pause: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>('lofi');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // URLs for the audio files - moved birthday.mp3 to public/ for better serving
  const lofiUrl = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'; 
  const birthdayUrl = '/birthday.mp3';

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack === 'lofi' ? lofiUrl : birthdayUrl);
      audioRef.current.loop = true;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle Play/Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn("Audio playback was prevented by the browser. Interaction required.", err);
          // Don't set isPlaying(false) here, keep it true so it starts on next interaction
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Handle Track Changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = isPlaying;
    audio.pause();
    audio.src = currentTrack === 'lofi' ? lofiUrl : birthdayUrl;
    audio.load();

    if (wasPlaying) {
      audio.play().catch(err => {
        console.warn("Track switch play failed (interaction required):", err);
      });
    }
  }, [currentTrack]);

  // Global click listener to resume play if browser blocked it
  useEffect(() => {
    const handleGlobalClick = () => {
      if (isPlaying && audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('touchstart', handleGlobalClick);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('touchstart', handleGlobalClick);
    };
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(prev => !prev);
  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const setTrack = (track: AudioTrack) => setCurrentTrack(track);

  return (
    <AudioContext.Provider value={{ isPlaying, currentTrack, togglePlay, setTrack, play, pause }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
