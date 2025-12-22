import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserData } from '../context/UserDataContext';
import DailyRewardDropdown from '../components/DailyRewardDropdown';

const Home = () => {
  const navigate = useNavigate();
  const [showRewardMenu, setShowRewardMenu] = useState(false);
  const { userData } = useUserData();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Основной контейнер */}
      <div className="w-full max-w-[375px] min-w-[320px] h-screen relative overflow-hidden">

        {/* Анимированный градиентный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-600 to-orange-400 animate-gradient-shift" />

        {/* 3D декоративные элементы на фоне */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Плавающие фишки казино */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-30 blur-sm"
          />

          <motion.div
            animate={{
              y: [0, 30, 0],
              rotate: [0, -360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-40 right-8 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 blur-md"
          />

          {/* Звезды */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
                delay: i * 0.4
              }}
              className="absolute text-4xl"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        {/* Контент */}
        <div className="relative z-10 h-full flex flex-col">

          {/* Header с балансом */}
          <div className="pt-12 px-4">
            <motion.button
              onClick={() => setShowRewardMenu(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-auto flex items-center gap-2 px-5 py-3
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

          {/* Центральный контент */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">

            {/* 3D Иконка */}
            <motion.div
              initial={{ scale: 0, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{
                duration: 1,
                type: 'spring',
                stiffness: 100
              }}
              className="mb-8"
            >
              <div className="relative">
                {/* Свечение за иконкой */}
                <div className="absolute inset-0 bg-red-500 rounded-3xl blur-3xl opacity-40 animate-pulse" />

                {/* Сама иконка */}
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotateY: 15,
                    rotateX: 15
                  }}
                  className="relative w-32 h-32 bg-gradient-to-br from-red-500 via-rose-600 to-red-700
                    rounded-3xl flex items-center justify-center shadow-2xl"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'perspective(1000px)'
                  }}
                >
                  <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="Logo" className="w-full h-full object-contain" />

                  {/* 3D грани */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent" />
                </motion.div>
              </div>
            </motion.div>

            {/* Заголовок */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h1 className="text-4xl font-black text-center text-white mb-2 drop-shadow-2xl">
                РОСКОМНАДЗОР
              </h1>
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-1 w-12 bg-gradient-to-r from-transparent via-white to-transparent"
                />
                <h2 className="text-2xl font-bold text-white/90">
                  SIMULATOR
                </h2>
                <motion.div
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-1 w-12 bg-gradient-to-r from-transparent via-white to-transparent"
                />
              </div>
            </motion.div>

            {/* Описание */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white/95 backdrop-blur-md rounded-[20px] p-5 shadow-2xl mb-8
                border border-white/50"
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
            </motion.div>

            {/* Кнопка запуска */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/wheel')}
              className="w-full py-5 bg-gradient-to-r from-pink-500 to-rose-600
                text-white font-black text-lg rounded-[90px] shadow-2xl
                relative overflow-hidden group"
              style={{
                boxShadow: '0 0 30px rgba(255, 62, 108, 0.5)'
              }}
            >
              {/* Эффект переливания */}
              <motion.div
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />

              {/* Текст */}
              <span className="relative z-10 flex items-center justify-center gap-2">
                Начать правосудие
                <span className="text-2xl">⚖️</span>
              </span>

              {/* Пульсирующее свечение */}
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                className="absolute inset-0 rounded-[90px] bg-gradient-to-r from-pink-400 to-rose-500 blur-xl -z-10"
              />
            </motion.button>
          </div>
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