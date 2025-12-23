import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import { useTelegram } from '../hooks/useTelegram';
import DailyRewardDropdown from '../components/DailyRewardDropdown';
import logo from '../assets/logo.png';

const Home = () => {
  const navigate = useNavigate();
  const [showRewardMenu, setShowRewardMenu] = useState(false);
  const { userData } = useUserData();
  const { tg, safeAreaInsets } = useTelegram();

  useEffect(() => {
    if (tg) {
      // Скрываем BackButton на главной
      tg.BackButton.hide();
    }
  }, [tg]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        paddingTop: `${safeAreaInsets.top}px`,
        paddingBottom: `${safeAreaInsets.bottom}px`,
        height: 'var(--tg-viewport-height, 100vh)'
      }}
    >
      {/* Контейнер на ПОЛНУЮ ширину */}
      <div className="w-full h-full relative overflow-hidden">

        {/* Анимированный градиентный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-600 to-orange-400 animate-gradient-shift" />

        {/* 3D декор */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-30 blur-sm animate-float" />
          <div className="absolute bottom-40 right-8 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 blur-md animate-float-reverse" />

          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-pulse"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2 + i}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>

        {/* Контент */}
        <div className="relative z-10 h-full flex flex-col">

          {/* Header с балансом - учитываем Safe Area */}
          <div
            className="px-4 flex justify-end"
            style={{
              paddingTop: `${Math.max(safeAreaInsets.top + 16, 60)}px`
            }}
          >
            <button
              onClick={() => {
                tg?.HapticFeedback.impactOccurred('light');
                setShowRewardMenu(true);
              }}
              className="flex items-center gap-2 px-5 py-3
                bg-gradient-to-r from-amber-400 to-orange-500
                rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200"
              style={{
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)'
              }}
            >
              <span className="text-3xl animate-spin-slow">🌟</span>
              <span className="text-white font-black text-xl">{userData.coins}</span>
            </button>
          </div>

          {/* Центральный контент */}
          <div className="flex-1 flex flex-col items-center justify-center px-6">

            {/* 3D Иконка */}
            <div className="mb-8 scale-0 animate-scale-in">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-3xl blur-3xl opacity-40 animate-pulse" />
                <div className="relative w-32 h-32 bg-gradient-to-br from-red-500 via-rose-600 to-red-700
                  rounded-3xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
                  style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px)' }}
                >
                  <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent" />
                </div>
              </div>
            </div>

            {/* Заголовок */}
            <div className="mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-4xl font-black text-center text-white mb-2 drop-shadow-2xl">
                РОСКОМНАДЗОР
              </h1>
              <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-12 bg-gradient-to-r from-transparent via-white to-transparent animate-scale-x opacity-0"
                  style={{ animationDelay: '0.5s' }}
                />
                <h2 className="text-2xl font-bold text-white/90">SIMULATOR</h2>
                <div className="h-1 w-12 bg-gradient-to-r from-transparent via-white to-transparent animate-scale-x opacity-0"
                  style={{ animationDelay: '0.5s' }}
                />
              </div>
            </div>

            {/* Описание */}
            <div className="bg-white/95 backdrop-blur-md rounded-[20px] p-5 shadow-2xl mb-8
              border border-white/50 opacity-0 animate-fade-in max-w-sm"
              style={{ animationDelay: '0.6s' }}
            >
              <p className="text-center text-gray-800 leading-relaxed text-sm font-medium">
                Это <span className="font-black text-pink-600">юмористическое приложение</span>
                {' '}для развлечения. Попробуйте себя в роли сотрудника Роскомнадзора.
              </p>
              <div className="mt-4 pt-4 border-t border-pink-200">
                <p className="text-xs text-center text-gray-500 italic">
                  ⚠️ Все события выдуманы. Любые совпадения случайны.
                </p>
              </div>
            </div>

            {/* Кнопка запуска */}
            <button
              onClick={() => {
                tg?.HapticFeedback.impactOccurred('medium');
                navigate('/wheel');
              }}
              className="w-full max-w-sm py-5 bg-gradient-to-r from-pink-500 to-rose-600
                text-white font-black text-lg rounded-[90px] shadow-2xl
                relative overflow-hidden group opacity-0 animate-fade-in
                hover:scale-102 active:scale-98 transition-transform duration-200"
              style={{
                boxShadow: '0 0 30px rgba(255, 62, 108, 0.5)',
                animationDelay: '0.8s'
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Начать правосудие
                <span className="text-2xl">⚖️</span>
              </span>
            </button>
          </div>

          {/* Отступ снизу под Safe Area */}
          <div style={{ height: `${safeAreaInsets.bottom + 20}px` }} />
        </div>

        {/* Dropdown меню наград */}
        {showRewardMenu && (
          <DailyRewardDropdown onClose={() => setShowRewardMenu(false)} />
        )}
      </div>
    </div>
  );
};

export default Home;