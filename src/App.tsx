import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserDataProvider } from './context/UserDataContext';
import { useTelegram } from './hooks/useTelegram';
import Home from './pages/Home';
import Wheel from './pages/Wheel';
import './globals.css';

function AppContent() {
  const { tg } = useTelegram();

  useEffect(() => {
    if (tg) {
      // Инициализация при запуске
      tg.ready();
      tg.expand();
    }
  }, [tg]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wheel" element={<Wheel />} />
    </Routes>
  );
}

function App() {
  return (
    <UserDataProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </Router>
    </UserDataProvider>
  );
}

export default App;