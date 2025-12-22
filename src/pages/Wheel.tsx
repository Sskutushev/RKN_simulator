import { useState } from 'react';
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

  const handleSpin = async () => {
    if (userData.coins < 2) {
      alert('Недостаточно монет! 😢');
      return;
    }
    if (isSpinning) return;

    setIsSpinning(true);
    spendCoins(2);
    setWinner(null); // Reset winner to allow re-spinning the same result

    // We need a small delay for the reset to register, then set the new winner
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * SERVICES.length);
        const selectedService = SERVICES[randomIndex];
        setWinner(selectedService); // This starts the animation in Carousel.tsx

        // After animation is done (5s), show popup
        setTimeout(() => {
            setShowPopup(true);
        }, 5000); // Corresponds to animation duration in Carousel.tsx
    }, 10);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[375px] min-w-[320px] h-screen relative">

        {/* Анимированный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-600 to-orange-400 animate-gradient-shift" />

        {/* 3D декор */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Анимированные круги */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity
            }}
            className="absolute top-20 left-0 w-64 h-64 bg-white rounded-full blur-3xl"
          />
        </div>

        {/* Контент */}
        <div className="relative z-10 h-full flex flex-col">

          {/* Header */}
          <div className="pt-12 px-4 flex items-center justify-between">
            {/* Кнопка назад */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/')}
              className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full
                shadow-xl flex items-center justify-center"
            >
              <span className="text-2xl leading-none">←</span>
            </motion.button>

            {/* Баланс */}
            <motion.button
              onClick={() => setShowRewardMenu(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3
                bg-gradient-to-r from-amber-400 to-orange-500
                rounded-full shadow-2xl"
              style={{
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)'
              }}
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >
                🪙
              </motion.span>
              <span className="text-white font-black text-xl">
                {userData.coins}
              </span>
            </motion.button>
          </div>

          {/* Барабан */}
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <Carousel
              isSpinning={isSpinning}
              winner={winner}
            />
          </div>

          {/* Кнопка "Крутить" */}
          <div className="pb-8 px-4">
            <motion.button
              whileHover={{ scale: isSpinning ? 1 : 1.02 }}
              whileTap={{ scale: isSpinning ? 1 : 0.98 }}
              onClick={handleSpin}
              disabled={isSpinning || userData.coins < 2}
              className={`
                w-full py-5 rounded-[90px] font-black text-lg shadow-2xl
                transition-all duration-300 relative overflow-hidden
                ${isSpinning || userData.coins < 2
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white'
                }
              `}
              style={{
                boxShadow: isSpinning || userData.coins < 2
                  ? 'none'
                  : '0 0 30px rgba(255, 62, 108, 0.6)'
              }}
            >
              {!isSpinning && userData.coins >= 2 && (
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              )}

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
            </motion.button>
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