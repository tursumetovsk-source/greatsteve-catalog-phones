import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import RemontPage from './pages/RemontPage';
import MainPage from './pages/MainPage';
import CompanyPage from './pages/CompanyPage';
import ArendaPage from './pages/ArendaPage';
import TradeinPage from './pages/TradeinPage';
import FloatingContacts from './components/FloatingContacts';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/remont" element={<RemontPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/arenda" element={<ArendaPage />} />
        <Route path="/tradein" element={<TradeinPage />} />
        <Route path="/uslugi" element={<Navigate to="/remont" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FloatingContacts />
    </BrowserRouter>
  );
}
