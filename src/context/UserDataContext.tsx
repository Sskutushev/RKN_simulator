import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  const [userData, setUserData] = useState<UserData>({ coins: 100, decisions: {} });

  // Load data from Telegram CloudStorage or localStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Check if we're in a Telegram environment
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
          try {
            // Try to get from Telegram CloudStorage
            const tg = window.Telegram.WebApp;
            if (tg.CloudStorage) {
              tg.CloudStorage.getItem('userData', (error, result) => {
                if (!error && result) {
                  try {
                    setUserData(JSON.parse(result));
                  } catch (parseError) {
                    console.error('Error parsing user data from CloudStorage:', parseError);
                    // Fallback to localStorage
                    const storedData = localStorage.getItem('userData');
                    if (storedData) {
                      setUserData(JSON.parse(storedData));
                    }
                  }
                } else {
                  // Fallback to localStorage
                  const storedData = localStorage.getItem('userData');
                  if (storedData) {
                    setUserData(JSON.parse(storedData));
                  }
                }
              });
            } else {
              // Fallback to localStorage
              const storedData = localStorage.getItem('userData');
              if (storedData) {
                setUserData(JSON.parse(storedData));
              }
            }
          } catch (error) {
            console.error('Error using Telegram CloudStorage:', error);
            // Fallback to localStorage
            const storedData = localStorage.getItem('userData');
            if (storedData) {
              setUserData(JSON.parse(storedData));
            }
          }
        } else {
          // Fallback to localStorage in development
          const storedData = localStorage.getItem('userData');
          if (storedData) {
            setUserData(JSON.parse(storedData));
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Fallback to default data
        setUserData({ coins: 100, decisions: {} });
      }
    };

    loadUserData();
  }, []);

  // Save to Telegram CloudStorage or localStorage whenever userData changes
  useEffect(() => {
    const saveUserData = async () => {
      try {
        const dataToSave = JSON.stringify(userData);

        // Check if we're in a Telegram environment
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
          try {
            const tg = window.Telegram.WebApp;
            if (tg.CloudStorage) {
              tg.CloudStorage.setItem('userData', dataToSave, (error) => {
                if (error) {
                  console.error('Error saving to CloudStorage:', error);
                  // Fallback to localStorage
                  localStorage.setItem('userData', dataToSave);
                }
              });
            } else {
              // Fallback to localStorage
              localStorage.setItem('userData', dataToSave);
            }
          } catch (error) {
            console.error('Error using Telegram CloudStorage:', error);
            // Fallback to localStorage
            localStorage.setItem('userData', dataToSave);
          }
        } else {
          // Use localStorage in development
          localStorage.setItem('userData', dataToSave);
        }
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    };

    saveUserData();
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