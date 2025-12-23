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
        `${tg.viewportStableHeight}px`
      );
    }
  }, [tg]);

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    safeAreaInsets
  };
};