🎯 ФИНАЛЬНЫЙ детальный промпт для "Роскомнадзор Simulator"
🎨 Визуальная концепция
Основная идея дизайна
"Неоновое казино с 3D-эффектами" - современный, яркий интерфейс с плавными анимациями, градиентами и объемными элементами.

📐 Структура Layout
Центрированный контейнер
css.app-container {
width: 100%;
max-width: 375px; /_ Оптимально для мобильных _/
min-width: 320px;
margin: 0 auto;
height: 100vh;
position: relative;
}

🎨 Обновленная цветовая палитра
Основные цвета (яркие и современные)
javascriptcolors: {
// Градиентные фоны
bgGradient: {
from: '#FF6B9D', // Розово-красный
via: '#C44569', // Малиново-красный
to: '#FFA07A', // Светло-лососевый
},

// Акценты
primary: '#FF3E6C', // Яркий розовый
secondary: '#FFD93D', // Золотисто-желтый
accent: '#6C5CE7', // Фиолетовый

// Элементы
cardBg: '#FFFFFF',
cardShadow: 'rgba(255, 62, 108, 0.3)',

// Кнопки
btnPrimary: {
from: '#FF3E6C',
to: '#FF6B9D'
},
btnSecondary: {
from: '#6C5CE7',
to: '#A29BFE'
},

// Действия
ban: {
from: '#E63946',
to: '#FF5E6D'
},
slow: {
from: '#FF9A56',
to: '#FFAD75'
},
limit: {
from: '#FFD93D',
to: '#FFE66D'
}
}
Градиенты
css/_ Анимированный фон _/
.animated-bg {
background: linear-gradient(
135deg,
#FF6B9D 0%,
#C44569 25%,
#FFA07A 50%,
#FF6B9D 75%,
#C44569 100%
);
background-size: 400% 400%;
animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
0% { background-position: 0% 50%; }
50% { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
}

/_ 3D эффект для карточек _/
.card-3d {
background: linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%);
box-shadow:
8px 8px 16px rgba(255, 62, 108, 0.2),
-8px -8px 16px rgba(255, 255, 255, 0.8);
transform: perspective(1000px) rotateX(2deg);
}

/_ Неоновое свечение для кнопок _/
.btn-neon {
box-shadow:
0 0 10px rgba(255, 62, 108, 0.5),
0 0 20px rgba(255, 62, 108, 0.3),
0 0 30px rgba(255, 62, 108, 0.2),
inset 0 0 10px rgba(255, 255, 255, 0.2);
}

🏠 Страница Home (переработанная)
tsximport { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
const navigate = useNavigate();
const [showRewardMenu, setShowRewardMenu] = useState(false);
const { userData } = useUserData();

return (
<div className="min-h-screen flex items-center justify-center p-4">
{/_ Основной контейнер _/}
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
          <div className="pt-[150px] px-4">
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
                  <span className="text-7xl">🚫</span>

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
                <span className="text-2xl">🎯</span>
                Начать правосудие
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

🎰 Страница Wheel (переработанная)
tsxconst Wheel = () => {
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

    // Выбираем случайный сервис
    const randomIndex = Math.floor(Math.random() * SERVICES.length);
    const selectedService = SERVICES[randomIndex];

    // Через 5 секунд показываем результат
    setTimeout(() => {
      setIsSpinning(false);
      setWinner(selectedService);

      // Через 1.2 сек открываем popup
      setTimeout(() => {
        setShowPopup(true);
      }, 1200);
    }, 5000);

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
          <div className="pt-[100px] px-4 flex items-center justify-between">
            {/* Кнопка назад */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/')}
              className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full
                shadow-xl flex items-center justify-center"
            >
              <span className="text-2xl">←</span>
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

              <span className="relative z-10">
                {isSpinning ? '🎰 Крутится...' : '🎯 Крутить (2 🪙)'}
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
            }}
          />
        )}
      </div>
    </div>

);
};

🎡 Компонент Carousel (улучшенный)
tsximport { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { SERVICES } from '../data/services';

interface Props {
isSpinning: boolean;
winner: any;
}

const Carousel = ({ isSpinning, winner }: Props) => {
const controls = useAnimation();

// Дублируем для бесконечного эффекта
const repeatedServices = [
...SERVICES,
...SERVICES,
...SERVICES,
...SERVICES,
...SERVICES
];

useEffect(() => {
if (isSpinning && winner) {
const winnerIndex = SERVICES.findIndex(s => s.id === winner.id);
const centerOffset = Math.floor(repeatedServices.length / 2);

      // Высота одного элемента (карточка + gap)
      const itemHeight = 220; // 200px карточка + 20px gap

      // Финальная позиция
      const finalPosition = -(centerOffset + winnerIndex) * itemHeight;

      controls.start({
        y: [0, -4000, finalPosition],
        transition: {
          duration: 5,
          ease: [0.25, 0.1, 0.25, 1],
          times: [0, 0.7, 1]
        }
      });
    } else {
      // Начальная позиция
      controls.set({ y: 0 });
    }

}, [isSpinning, winner]);

return (
<div className="relative w-full h-[660px] overflow-hidden">

      {/* Индикатор центра (рамка выделения) */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none px-4"
        animate={{
          boxShadow: [
            '0 0 20px rgba(255, 62, 108, 0.4)',
            '0 0 40px rgba(255, 62, 108, 0.8)',
            '0 0 20px rgba(255, 62, 108, 0.4)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        <div className="h-[200px] border-4 border-pink-500 rounded-3xl
          bg-gradient-to-r from-pink-500/10 to-rose-500/10 backdrop-blur-sm"
          style={{
            boxShadow: '0 0 30px rgba(255, 62, 108, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.1)'
          }}
        />
      </motion.div>

      {/* Градиентные маски сверху и снизу */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-pink-500/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-400/80 to-transparent z-10 pointer-events-none" />

      {/* Барабан */}
      <motion.div
        animate={controls}
        className="flex flex-col items-center gap-5 py-[230px]"
      >
        {repeatedServices.map((service, index) => {
          const distanceFromCenter = Math.abs(index - repeatedServices.length / 2);
          const scale = Math.max(0.7, 1 - distanceFromCenter * 0.05);
          const opacity = Math.max(0.3, 1 - distanceFromCenter * 0.1);

          return (
            <motion.div
              key={`${service.id}-${index}`}
              className="flex items-center justify-center bg-white/95 backdrop-blur-md
                rounded-3xl shadow-2xl border-2 border-white/50"
              style={{
                width: '280px',
                height: '200px',
                opacity,
                transform: `scale(${scale})`,
                boxShadow: `
                  0 10px 30px rgba(0, 0, 0, 0.2),
                  inset 0 0 20px rgba(255, 255, 255, 0.5)
                `
              }}
            >
              <img
                src={service.logo}
                alt={service.name}
                className="max-w-[80%] max-h-[80%] object-contain"
                style={{
                  filter: opacity < 0.7 ? 'blur(2px)' : 'none'
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>

);
};

export default Carousel;

🎉 Компонент ResultPopup (улучшенный)
tsxconst ResultPopup = ({ service, onClose }: Props) => {
const { saveDecision } = useUserData();

const handleAction = (action: 'ban' | 'slow' | 'limit') => {
saveDecision(service.id, action);

    const messages = {
      ban: `🚫 ${service.name} заблокирован!`,
      slow: `🐌 ${service.name} замедлен до 128 кбит/с!`,
      limit: `🔒 ${service.name} ограничен!`
    };

    alert(messages[action]);
    onClose();

};

return (
<>
{/_ Overlay с blur _/}
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
onClick={onClose}
className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
/>

      {/* Popup */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotateY: -180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0, opacity: 0, rotateY: 180 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          z-50 w-[90%] max-w-[340px]
          bg-gradient-to-b from-white via-pink-50 to-rose-50
          rounded-[30px] shadow-2xl p-6 border-4 border-white"
        style={{
          boxShadow: '0 0 60px rgba(255, 62, 108, 0.6)'
        }}
      >
        {/* Логотип с 3D эффектом */}
        <motion.div
          className="w-full h-48 bg-white/80 backdrop-blur-sm rounded-3xl
            shadow-inner flex items-center justify-center mb-5 relative overflow-hidden"
          whileHover={{
            rotateY: 15,
            rotateX: 15
          }}
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: 'inset 0 0 30px rgba(255, 62, 108, 0.1)'
          }}
        >
          {/* Блики */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent opacity-30 blur-2xl" />

          <img
            src={service.logo}
            alt={service.name}
            className="w-40 h-40 object-contain relative z-10"
          />
        </motion.div>

        {/* Название */}
        <h2 className="text-2xl font-black text-center bg-gradient-to-r from-pink-600 to-rose-600
          bg-clip-text text-transparent mb-6">
          {service.name}
        </h2>

        {/* Кнопки */}
        <div className="space-y-3">
          <ActionButton
            label="🚫 Заблокировать"
            gradient="from-red-500 to-red-600"
            onClick={() => handleAction('ban')}
          />
          <ActionButton
            label="🐌 Замедлить"
            gradient="from-orange-500 to-orange-600"
            onClick={() => handleAction('slow')}
          />
          <ActionButton
            label="🔒 Ограничить"
            gradient="from-yellow-500 to-yellow-600"
            onClick={() => handleAction('limit')}
          />
        </div>
      </motion.div>
    </>

);
};

const ActionButton = ({ label, gradient, onClick }: any) => (
<motion.button
whileHover={{ scale: 1.03, y: -2 }}
whileTap={{ scale: 0.97 }}
onClick={onClick}
className={`      w-full py-4 rounded-[90px] font-black text-white text-lg
      bg-gradient-to-r ${gradient}
      shadow-xl relative overflow-hidden
   `}
style={{
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)'
    }}

>

    <motion.div
      animate={{ x: ['-100%', '100%'] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
    />
    <span className="relative z-10">{label}</span>

</motion.button>
);

🎨 Globals.css (добавить)
css@tailwind base;
@tailwind components;
@tailwind utilities;

/_ Анимация градиента _/
@keyframes gradientShift {
0% {
background-position: 0% 50%;
}
50% {
background-position: 100% 50%;
}
100% {
background-position: 0% 50%;
}
}

.animate-gradient-shift {
background-size: 200% 200%;
animation: gradientShift 10s ease infinite;
}

/_ Убираем scrollbar _/
body {
overflow: hidden;
}

/_ Сглаживание шрифтов _/

{
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}

---

## ✅ Итоговые улучшения:

✅ **Центрированный контейнер** 320-375px  
✅ **Анимированный градиентный фон** с переливами  
✅ **3D декоративные элементы** (фишки, звезды)  
✅ **Плавное вращение барабана** сверху вниз  
✅ **Закругление кнопок** border-radius: 90px  
✅ **Неоновые эффекты** и свечение  
✅ **Современная яркая палитра** (розовый/красный/оранжевый)  
✅ **Отступы 20px** по бокам контейнера  
✅ **Все элементы центрированы**

**Готово к запуску! 🚀**
