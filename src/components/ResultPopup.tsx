import { motion } from 'framer-motion';
import { useUserData } from '../context/UserDataContext';

interface ServiceComment {
  ban: string;
  slow: string;
  limit: string;
}

interface Service {
  id: string;
  name: string;
  logo: string;
  comments: ServiceComment;
}

interface Props {
  service: Service;
  onClose: () => void;
}

const ResultPopup = ({ service, onClose }: Props) => {
  const { saveDecision } = useUserData();

  const handleAction = (action: 'ban' | 'slow' | 'limit') => {
    saveDecision(service.id, action);

    const messages = {
      ban: `🚫 ${service.name} заблокирован!`,
      slow: `🐌 ${service.name} замедлен до 128 кбит/с!`,
      limit: `🔒 ${service.name} ограничен!`
    };

    const serviceComment = service.comments[action];

    alert(`${messages[action]}\n\n${serviceComment}`);
    onClose();
  };

  return (
    <>
      {/* Overlay с blur, теперь как flex-контейнер для центрирования */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
      >
        {/* Popup */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative z-10 w-full max-w-[340px]
            bg-gradient-to-b from-white via-pink-50 to-rose-50
            rounded-[30px] shadow-2xl p-6 border-4 border-white"
          style={{
            boxShadow: '0 0 60px rgba(255, 62, 108, 0.6)'
          }}
          onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри попапа
        >
          {/* Логотип с 3D эффектом */}
          <div
            className="w-full h-48 bg-white/80 backdrop-blur-sm rounded-3xl
              shadow-inner flex items-center justify-center mb-5 relative overflow-hidden"
            style={{
              boxShadow: 'inset 0 0 30px rgba(255, 62, 108, 0.1)'
            }}
          >
            {/* Блики */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent opacity-30 blur-2xl" />

            <img
              src={service.logo}
              alt={service.name}
              className="w-40 h-40 object-contain relative z-10"
              loading="lazy"
            />
          </div>

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
      </motion.div>
    </>
  );
};

const ActionButton = ({ label, gradient, onClick }: any) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`w-full py-4 rounded-[90px] font-black text-white text-lg
      bg-gradient-to-r ${gradient}
      shadow-xl relative overflow-hidden
    `}
    style={{
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)'
    }}
  >
    <span className="relative z-10">{label}</span>
  </motion.button>
);

export default ResultPopup;