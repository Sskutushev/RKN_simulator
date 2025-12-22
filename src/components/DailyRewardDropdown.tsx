import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUserData } from '../context/UserDataContext';

interface Props {
  onClose: () => void;
}

const DailyRewardDropdown = ({ onClose }: Props) => {
  const { userData, addCoins } = useUserData();
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [canClaim, setCanClaim] = useState(false);

  // Calculate time until next reward
  useEffect(() => {
    const checkRewardTime = () => {
      if (userData.lastRewardDate) {
        const lastReward = new Date(userData.lastRewardDate);
        const nextReward = new Date(lastReward);
        nextReward.setDate(nextReward.getDate() + 1); // Next day
        
        const now = new Date();
        if (now >= nextReward) {
          setCanClaim(true);
          setTimeLeft(null);
        } else {
          setCanClaim(false);
          const diff = nextReward.getTime() - now.getTime();
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeLeft(`${hours}ч ${minutes}м`);
        }
      } else {
        setCanClaim(true);
      }
    };

    checkRewardTime();
    const interval = setInterval(checkRewardTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [userData.lastRewardDate]);

  const claimReward = () => {
    if (canClaim) {
      addCoins(10); // Daily reward of 10 coins
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 z-40"
      />

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="absolute bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg 
                   rounded-t-[24px] shadow-2xl p-4 mx-auto max-w-[375px]"
        style={{
          boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-pink-600 text-lg">Ежедневная награда</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl">🎁</span>
            <span className="font-bold text-xl">+10 🪙</span>
          </div>
          <p className="text-center text-sm text-gray-600">
            Получите 10 монет за вход сегодня!
          </p>
        </div>
        
        {canClaim ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={claimReward}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 
              text-white font-bold rounded-xl shadow-lg"
          >
            Забрать награду
          </motion.button>
        ) : (
          <div className="text-center py-3 text-gray-500 font-medium">
            Следующая награда: {timeLeft}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default DailyRewardDropdown;