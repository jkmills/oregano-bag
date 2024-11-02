import create from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, Commodity, City, InventoryItem } from '../types';

const initialState: GameState = {
  cash: 2000,
  loan: 0,
  day: 1,
  location: 'New York',
  inventory: [],
  isDarkMode: false,
};

export const useGameStore = create(
  persist<GameState>(
    (set) => ({
      ...initialState,
      setCash: (cash: number) => set({ cash }),
      setLoan: (loan: number) => set({ loan }),
      setDay: (day: number) => set({ day }),
      setLocation: (location: string) => set({ location }),
      addToInventory: (item: InventoryItem) =>
        set((state) => ({ inventory: [...state.inventory, item] })),
      removeFromInventory: (itemId: string) =>
        set((state) => ({
          inventory: state.inventory.filter((item) => item.id !== itemId),
        })),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      resetGame: () => set(initialState),
    }),
    {
      name: 'game-storage',
    }
  )
);
