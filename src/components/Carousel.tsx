import { useEffect, useRef } from 'react';
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
    if (isSpinning) {
      // Анимация вращения при запуске
      controls.start({
        y: [-100, -4000], // Начальное смещение и быстрое вращение
        transition: {
          duration: 5,
          ease: "easeOut"
        }
      });
    } else if (winner) {
      // Плавная остановка на выигрышном элементе
      const winnerIndex = SERVICES.findIndex(s => s.id === winner.id);
      const centerOffset = Math.floor(repeatedServices.length / 2);

      // Высота одного элемента (карточка + gap)
      const itemHeight = 220; // 200px карточка + 20px gap

      // Финальная позиция
      const finalPosition = -(centerOffset + winnerIndex) * itemHeight;

      // Анимация плавной остановки
      controls.start({
        y: finalPosition,
        transition: {
          duration: 1,
          ease: [0.25, 0.1, 0.25, 1] // easeOutCubic
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