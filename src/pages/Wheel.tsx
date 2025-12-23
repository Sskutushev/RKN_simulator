import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import { useTelegram } from '../hooks/useTelegram';
import { SERVICES } from '../data/services';
import Carousel from '../components/Carousel';
import ResultPopup from '../components/ResultPopup';
import DailyRewardDropdown from '../components/DailyRewardDropdown';

const Wheel = () => {
  const navigate = useNavigate();
  const { userData, spendCoins } = useUserData();
  const { tg, safeAreaInsets } = useTelegram();
  const [showRewardMenu, setShowRewardMenu] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (tg) {
      // Скрываем BackButton, так как у TMA есть своя навигация
      tg.BackButton.hide();
    }
  }, [tg]);

  const handleSpin = async () => {
    if (userData.coins < 2) {
      tg?.HapticFeedback.notificationOccurred('error');
      alert('Недостаточно звёзд! 😢');
      return;
    }
    if (isSpinning) return;

    tg?.HapticFeedback.impactOccurred('heavy');
    setIsSpinning(true);
    spendCoins(2);

    const randomIndex = Math.floor(Math.random() * SERVICES.length);
    const selectedService = SERVICES[randomIndex];
    setWinner(selectedService);

    setTimeout(() => {
      tg?.HapticFeedback.notificationOccurred('success');
      setShowPopup(true);
    }, 5000);
  };

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden">
      {/* Контейнер на ПОЛНУЮ ширину */}
      <div
        className="w-full h-full relative"
        style={{
          paddingTop: `${safeAreaInsets.top}px`,
          paddingBottom: `${safeAreaInsets.bottom}px`,
        }}
      >
        {/* Анимированный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-600 to-orange-400 animate-gradient-shift" />

        {/* 3D декор */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse opacity-10"
            style={{ animationDuration: '4s' }}
          />
        </div>

        {/* Контент */}
        <div className="relative z-10 h-full pb-[120px] flex flex-col">

          {/* Header - учитываем Safe Area, убрана кнопка назад */}
          <div
            className="px-4 flex justify-end"
            style={{
              paddingTop: `${safeAreaInsets.top}px`
            }}
          >
            {/* Баланс */}
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

          {/* Барабан - поднят на 100px */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 pt-[50px]">
            <Carousel isSpinning={isSpinning} winner={winner} />
          </div>

          {/* Кнопка "Крутить" в абсолютном позиционировании, поднята на 50px */}
          <div className="absolute left-0 right-0 px-4">
            <button
              onClick={handleSpin}
              disabled={isSpinning || userData.coins < 2}
              className={`
                w-full py-5 rounded-[90px] font-black text-lg shadow-2xl
                transition-all duration-300 relative overflow-hidden
                ${isSpinning ? 'opacity-0' : 'opacity-100'}
                ${isSpinning || userData.coins < 2
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:scale-102 active:scale-98'
                }
              `}
              style={{
                boxShadow: isSpinning || userData.coins < 2
                  ? 'none'
                  : '0 0 30px rgba(255, 62, 108, 0.6)',
                bottom: `${safeAreaInsets.bottom -700}px`, // Поднята на 50px
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'calc(100% - 32px)',
                maxWidth: '480px',
                zIndex: 40 // Убедимся, что кнопка поверх других элементов
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSpinning ? '🎰 Крутится...' : (
                  <>
                    Крутить
                    <span className="flex items-center gap-1">
                      🌟 2
                    </span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Dropdown и Popup */}
        {showRewardMenu && <DailyRewardDropdown onClose={() => setShowRewardMenu(false)} />}
        {showPopup && winner && (
          <ResultPopup
            service={winner}
            onClose={() => {
              setShowPopup(false);
              setWinner(null);
              setIsSpinning(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Wheel;