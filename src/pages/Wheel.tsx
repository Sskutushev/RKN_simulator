import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserData } from '../context/UserDataContext';
import { SERVICES } from '../data/services';
import Carousel from '../components/Carousel';
import ResultPopup from '../components/ResultPopup';
import DailyRewardDropdown from '../components/DailyRewardDropdown';

const Wheel = () => {
  const navigate = useNavigate();
  const { userData, spendCoins } = useUserData();
  const [showRewardMenu, setShowRewardMenu] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  // Показываем popup когда winner определен и прошло время анимации
  useEffect(() => {
    if (isSpinning && winner) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000); // Соответствует duration анимации в Carousel.tsx

      return () => clearTimeout(timer);
    }
  }, [isSpinning, winner]);

  const handleSpin = async () => {
    if (userData.coins < 2) {
      alert('Недостаточно монет! 😢');
      return;
    }
    if (isSpinning) return;

    setIsSpinning(true);
    spendCoins(2);

    // Сразу определяем случайного победителя
    const randomIndex = Math.floor(Math.random() * SERVICES.length);
    const selectedService = SERVICES[randomIndex];
    setWinner(selectedService); // Устанавливаем победителя сразу
  };

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[480px] min-w-[320px] h-screen relative">

        {/* Анимированный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-600 to-orange-400 animate-gradient-shift" />

        {/* 3D декор */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Анимированные круги */}
          <div
            className="absolute top-20 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse opacity-10"
            style={{ animationDuration: '4s' }}
          />
        </div>

        {/* Контент */}
        <div className="relative z-10 h-full flex flex-col">

          {/* Header */}
          <div className="pt-16 px-4 flex items-center justify-between">
            {/* Кнопка назад */}
            <button
              onClick={() => navigate('/')}
              className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full
                shadow-xl flex items-center justify-center hover:scale-110 active:scale-90 transition-transform duration-200"
            >
              <span className="text-2xl leading-none">←</span>
            </button>

            {/* Баланс */}
            <button
              onClick={() => setShowRewardMenu(true)}
              className="flex items-center gap-2 px-5 py-3
                bg-gradient-to-r from-amber-400 to-orange-500
                rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200"
              style={{
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)'
              }}
            >
              <span
                className="text-3xl animate-spin-slow"
              >
                🪙
              </span>
              <span className="text-white font-black text-xl">
                {userData.coins}
              </span>
            </button>
          </div>

          {/* Барабан */}
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <Carousel
              isSpinning={isSpinning}
              winner={winner}
            />
          </div>

          {/* Кнопка "Крутить" */}
          <div className="pb-24 px-4">
            <button
              onClick={handleSpin}
              disabled={isSpinning || userData.coins < 2}
              className={`
                w-full py-5 rounded-[90px] font-black text-lg shadow-2xl
                transition-all duration-300 relative overflow-hidden
                ${isSpinning || userData.coins < 2
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:scale-102 active:scale-98'
                }
              `}
              style={{
                boxShadow: isSpinning || userData.coins < 2
                  ? 'none'
                  : '0 0 30px rgba(255, 62, 108, 0.6)'
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSpinning ? '🎰 Крутится...' : (
                  <>
                    Крутить
                    <span className="flex items-center gap-1">
                      🪙 2
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
              // Сбрасываем winner и spinning только после закрытия popup
              setTimeout(() => {
                setWinner(null);
                setIsSpinning(false);
              }, 100); // Небольшая задержка для плавного закрытия
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Wheel;