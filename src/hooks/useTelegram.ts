// src/hooks/useTelegram.ts
import { useEffect, useState } from 'react';

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  BackButton: {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
  };
  themeParams: {
    bg_color?: string;
    text_color?: string;
    button_color?: string;
  };
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      username?: string;
    };
  };
  viewportHeight: number;
  viewportStableHeight: number;
  safeAreaInset: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  contentSafeAreaInset: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  CloudStorage?: {
    getItem: (key: string, callback: (error: Error | null, value: string | null) => void) => void;
    setItem: (key: string, value: string, callback: (error: Error | null) => void) => void;
    removeItem: (key: string, callback: (error: Error | null) => void) => void;
    getItems: (keys: string[], callback: (error: Error | null, values: { [key: string]: string }) => void) => void;
    removeItems: (keys: string[], callback: (error: Error | null) => void) => void;
    keys: (callback: (error: Error | null, keys: string[]) => void) => void;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export const useTelegram = () => {
  const [tg] = useState(() => window.Telegram?.WebApp);
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });

  useEffect(() => {
    if (tg) {
      // Инициализация
      tg.ready();
      tg.expand();

      // Для Bot API 8.0+ запрашиваем настоящий Fullscreen (без хедера ТГ)
      if (tg.isVersionAtLeast('8.0')) {
        tg.requestFullscreen();
      }

      // Отключаем вертикальные свипы, чтобы пользователь
      // случайно не закрыл приложение, когда крутит барабан
      if (tg.isVersionAtLeast('7.7')) {
        tg.disableVerticalSwipes();
      }

      // Получаем Safe Area Insets
      setSafeAreaInsets({
        top: tg.safeAreaInset?.top || 0,
        bottom: tg.safeAreaInset?.bottom || 0,
        left: tg.safeAreaInset?.left || 0,
        right: tg.safeAreaInset?.right || 0
      });

      // Устанавливаем переменные CSS
      document.documentElement.style.setProperty(
        '--tg-safe-area-top',
        `${tg.safeAreaInset?.top || 0}px`
      );
      document.documentElement.style.setProperty(
        '--tg-safe-area-bottom',
        `${tg.safeAreaInset?.bottom || 0}px`
      );
      document.documentElement.style.setProperty(
        '--tg-viewport-height',
        `${tg.viewportStableHeight || window.innerHeight}px`
      );
    }
  }, [tg]);

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    safeAreaInsets
  };
};