import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EnhancedGatekeeperPage } from './pages/EnhancedGatekeeperPage';
import { EnhancedHomePage } from './pages/EnhancedHomePage';
import { MemoriesPage } from './pages/MemoriesPage';
import { EnhancedReasonsPage } from './pages/EnhancedReasonsPage';
import { EnhancedCakePage } from './pages/EnhancedCakePage';
import { EnhancedLetterPage } from './pages/EnhancedLetterPage';
import { CursorTrail } from './components/CursorTrail';
import { AudioProvider } from './context/AudioContext';
import { MagicFooter } from './components/MagicFooter';

export default function App() {
  return (
    <AudioProvider>
      <BrowserRouter>
        <CursorTrail />
        <Routes>
          <Route path="/" element={<EnhancedGatekeeperPage />} />
          <Route path="/home" element={<EnhancedHomePage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/reasons" element={<EnhancedReasonsPage />} />
          <Route path="/cake" element={<EnhancedCakePage />} />
          <Route path="/letter" element={<EnhancedLetterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <MagicFooter />
      </BrowserRouter>
    </AudioProvider>
  );
}
