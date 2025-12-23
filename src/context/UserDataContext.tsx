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
        if (window.Telegram?.WebApp?.CloudStorage) {
          // Try to get from Telegram CloudStorage
          const storedData = await new Promise<string | null>((resolve) => {
            if (window.Telegram?.WebApp?.CloudStorage) {
              window.Telegram.WebApp.CloudStorage.getItem('userData', (error, result) => {
                if (error) {
                  console.error('Error getting data from CloudStorage:', error);
                  // Fallback to localStorage if CloudStorage fails
                  const localData = localStorage.getItem('userData');
                  resolve(localData);
                } else {
                  resolve(result);
                }
              });
            } else {
              // Fallback to localStorage if CloudStorage is not available
              const localData = localStorage.getItem('userData');
              resolve(localData);
            }
          });

          if (storedData) {
            setUserData(JSON.parse(storedData));
          }
        } else {
          // Fallback to localStorage
          const storedData = localStorage.getItem('userData');
          if (storedData) {
            setUserData(JSON.parse(storedData));
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Fallback to localStorage if parsing fails
        const storedData = localStorage.getItem('userData');
        if (storedData) {
          setUserData(JSON.parse(storedData));
        }
      }
    };

    loadUserData();
  }, []);

  // Save to Telegram CloudStorage or localStorage whenever userData changes
  useEffect(() => {
    const saveUserData = async () => {
      try {
        const dataToSave = JSON.stringify(userData);

        if (window.Telegram?.WebApp?.CloudStorage) {
          // Save to Telegram CloudStorage
          await new Promise<void>((resolve) => {
            window.Telegram.WebApp.CloudStorage.setItem('userData', dataToSave, (error) => {
              if (error) {
                console.error('Error saving to CloudStorage:', error);
                // Fallback to localStorage if CloudStorage fails
                localStorage.setItem('userData', dataToSave);
              }
              resolve();
            });
          });
        } else {
          // Fallback to localStorage
          localStorage.setItem('userData', dataToSave);
        }
      } catch (error) {
        console.error('Error saving user data:', error);
        // Fallback to localStorage if anything fails
        try {
          localStorage.setItem('userData', JSON.stringify(userData));
        } catch (localStorageError) {
          console.error('Error saving to localStorage:', localStorageError);
        }
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