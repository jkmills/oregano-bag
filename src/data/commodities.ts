import { Commodity } from '../types';

export const commodities: Commodity[] = [
  { id: 'coffee', name: 'Coffee', minPrice: 150, maxPrice: 300, unit: 'lb' },
  { id: 'preciousMetals', name: 'Precious Metals', minPrice: 1200, maxPrice: 1800, unit: 'oz' },
  { id: 'semiconductors', name: 'Semiconductors', minPrice: 50, maxPrice: 200, unit: 'unit' },
  { id: 'rareEarth', name: 'Rare Earth Elements', minPrice: 100, maxPrice: 500, unit: 'kg' },
  { id: 'agriculture', name: 'Agricultural Products', minPrice: 50, maxPrice: 150, unit: 'bushel' },
  { id: 'energy', name: 'Energy Futures', minPrice: 40, maxPrice: 100, unit: 'unit' },
];
