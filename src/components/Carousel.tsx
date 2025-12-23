import { useEffect, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { SERVICES } from '../data/services';

interface Props {
  isSpinning: boolean;
  winner: any;
  onComplete?: () => void;
}

const Carousel = ({ isSpinning, winner, onComplete }: Props) => {
  const controls = useAnimation();

  // Оптимизируем количество дубликатов для производительности
  const repeatedServices = useMemo(() => [
    ...SERVICES,
    ...SERVICES,
    ...SERVICES
  ], []);

  useEffect(() => {
    if (isSpinning && winner) {
      // Победитель уже определен, начинаем анимацию: плавное ускорение -> замедление
      const winnerIndex = SERVICES.findIndex(s => s.id === winner.id);

      // Количество полных кругов для разгона
      const baseSpins = itemHeight * SERVICES.length * 5; // 5 полных кругов для разгона

      // Смещение для выравнивания победителя по центру
      const winnerOffset = winnerIndex * itemHeight;

      // Конечная цель: основные обороты + смещение до нужного элемента
      const finalTarget = -(baseSpins + winnerOffset);

      // Единая плавная анимация к конечной точке
      controls.start({
        y: finalTarget,
        transition: {
          duration: 5, // Общая продолжительность анимации
          ease: [0.45, 0.05, 0.55, 0.95] // Кубическая кривая Безье для плавного старта, быстрого полета и мягкого финиша
        }
      }).then(() => {
        // Вызываем onComplete после завершения анимации
        if (onComplete) {
          onComplete();
        }
      });
    } else {
      // Начальная позиция
      controls.set({ y: 0 });
    }
  }, [isSpinning, winner, controls, repeatedServices, itemHeight, onComplete]);


  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Индикатор центра (рамка выделения) */}
      <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none px-4">
        <div
          className="h-[200px] border-4 border-pink-500 rounded-3xl
            bg-gradient-to-r from-pink-500/10 to-rose-500/10 backdrop-blur-sm"
          style={{
            boxShadow: '0 0 30px rgba(255, 62, 108, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.1)',
            top: '50%',
            transform: 'translateY(-15%)'
          }}
        />
      </div>

      {/* Градиентные маски сверху и снизу */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-pink-500/0 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-400/0 to-transparent z-10 pointer-events-none" />

      {/* Барабан */}
      <motion.div
        animate={controls}
        className="flex flex-col items-center gap-5 py-[20vh]"
      >
        {repeatedServices.map((service, index) => (
          <div
            key={`${service.id}-${index}`}
            className="flex items-center justify-center bg-white/95 backdrop-blur-md
              rounded-3xl shadow-2xl border-2 border-white/50"
            style={{
              width: '280px',
              height: '180px', /* Уменьшена высота карточки */
              transform: `scale(${Math.max(0.7, 1 - Math.abs(index - repeatedServices.length / 2) * 0.05)})`,
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
        ))}
      </motion.div>
    </div>
  );
};

export default Carousel;