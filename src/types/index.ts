export interface Commodity {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  unit: string;
}

export interface City {
  id: string;
  name: string;
  specialties: string[];
}

export interface InventoryItem {
  id: string;
  commodityId: string;
  quantity: number;
  purchasePrice: number;
}

export interface GameState {
  cash: number;
  loan: number;
  day: number;
  location: string;
  inventory: InventoryItem[];
  isDarkMode: boolean;
  setCash: (cash: number) => void;
  setLoan: (loan: number) => void;
  setDay: (day: number) => void;
  setLocation: (location: string) => void;
  addToInventory: (item: InventoryItem) => void;
  removeFromInventory: (itemId: string) => void;
  toggleDarkMode: () => void;
  resetGame: () => void;
}
