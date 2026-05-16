import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import MainPage from './pages/MainPage';
import FloatingContacts from './components/FloatingContacts';

const RemontPage      = lazy(() => import('./pages/RemontPage'));
const CompanyPage     = lazy(() => import('./pages/CompanyPage'));
const ArendaPage      = lazy(() => import('./pages/ArendaPage'));
const TradeinPage     = lazy(() => import('./pages/TradeinPage'));
const ModelRepairPage = lazy(() => import('./pages/ModelRepairPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <Routes>
          <Route path="/"        element={<MainPage />} />
          <Route path="/remont"           element={<RemontPage />} />
          <Route path="/remont/:model"    element={<ModelRepairPage />} />
          <Route path="/company"          element={<CompanyPage />} />
          <Route path="/arenda"  element={<ArendaPage />} />
          <Route path="/tradein" element={<TradeinPage />} />
          <Route path="/uslugi"  element={<Navigate to="/remont" replace />} />
          <Route path="*"        element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <FloatingContacts />
    </BrowserRouter>
  );
}
