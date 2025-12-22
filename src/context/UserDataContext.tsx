import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  coins: number;
  decisions: { [key: string]: string };
  lastRewardDate?: string;
}

interface UserDataContextType {
  userData: UserData;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => void;
  saveDecision: (serviceId: string, action: string) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : { coins: 100, decisions: {} };
  });

  // Save to localStorage whenever userData changes
  React.useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const addCoins = (amount: number) => {
    setUserData(prev => ({
      ...prev,
      coins: prev.coins + amount
    }));
  };

  const spendCoins = (amount: number) => {
    setUserData(prev => ({
      ...prev,
      coins: Math.max(0, prev.coins - amount) // Prevent negative coins
    }));
  };

  const saveDecision = (serviceId: string, action: string) => {
    setUserData(prev => ({
      ...prev,
      decisions: {
        ...prev.decisions,
        [serviceId]: action
      }
    }));
  };

  return (
    <UserDataContext.Provider value={{ userData, addCoins, spendCoins, saveDecision }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};