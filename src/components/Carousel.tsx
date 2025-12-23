import { useEffect, useMemo } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { SERVICES } from '../data/services';

interface Props {
  isSpinning: boolean;
  winner: any;
  onComplete?: () => void;
}

const Carousel = ({ isSpinning, winner, onComplete }: Props) => {
  const controls = useAnimation();
  const y = useMotionValue(0);

  // Константы
  const ITEM_HEIGHT = 180;
  const GAP = 20;
  const STEP = ITEM_HEIGHT + GAP;

  // Повторяем сервисы для создания бесконечной ленты
  const repeatedServices = useMemo(() => {
    const result = [];
    for (let i = 0; i < 30; i++) {
      result.push(...SERVICES);
    }
    return result;
  }, []);

  // Стартовая позиция - в середине списка
  const startPosition = -5000;

  useEffect(() => {
    if (isSpinning && winner) {
      const winnerIndex = SERVICES.findIndex(s => s.id === winner.id);
      
      // Рассчитываем дистанцию: 3 полных круга + позиция победителя
      const fullRoundDistance = SERVICES.length * STEP;
      const roundsDistance = 3 * fullRoundDistance;
      const winnerPositionDistance = winnerIndex * STEP;
      
      // Общая дистанция - общее расстояние, которое нужно пройти
      const totalDistance = roundsDistance + winnerPositionDistance;
      
      // Чтобы победитель оказался в центре, нужно компенсировать половину высоты экрана
      // (предполагаем, что высота контейнера 600px, значит центр на 300px)
      const centerOffset = 300; // Примерно центр экрана
      
      const finalPosition = startPosition - totalDistance + centerOffset;

      // Анимация с резким стартом и плавным торможением
      controls.start({
        y: finalPosition,
      }, {
        duration: 6,
        ease: [0.12, 0, 0.39, 0] // Резкий старт и очень плавное торможение
      }).then(() => {
        // Вызываем onComplete после завершения анимации
        if (onComplete) {
          onComplete();
        }
      });
    } else {
      // Начальная позиция
      controls.set({ y: startPosition });
    }
  }, [isSpinning, winner, controls, repeatedServices, onComplete]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Индикатор центра (рамка выделения) */}
      <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none px-4">
        <div
          className="h-[180px] border-4 border-pink-500 rounded-3xl"
          style={{
            boxShadow: '0 0 30px rgba(255, 62, 108, 0.5)'
          }}
        />
      </div>

      {/* Градиентные маски сверху и снизу */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-pink-500/0 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-400/0 to-transparent z-10 pointer-events-none" />

      {/* Барабан */}
      <motion.div
        animate={controls}
        className="flex flex-col items-center py-[230px]"
      >
        {repeatedServices.map((service, index) => {
          // Рассчитываем положение карточки относительно центра экрана
          const position = index * STEP;
          const centerPosition = 230; // Примерно центр визуальной области (с учетом py-[230px])
          const distanceFromCenter = Math.abs(position - (controls.get('y') || 0) - centerPosition);
          
          // Эффект лупы: масштаб и прозрачность в зависимости от расстояния до центра
          const scale = distanceFromCenter < 100 ? 1.2 : 0.8;
          const opacity = distanceFromCenter < 100 ? 1 : 0.4;

          return (
            <div
              key={`${service.id}-${index}`}
              className="flex items-center justify-center bg-white/95 backdrop-blur-md
                rounded-3xl shadow-2xl border-2 border-white/50"
              style={{
                width: '280px',
                height: '180px',
                transform: `scale(${scale})`,
                opacity: opacity,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.5)'
              }}
            >
              <img
                src={service.logo}
                alt={service.name}
                className="max-w-[80%] max-h-[80%] object-contain"
                loading="lazy"
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Carousel;