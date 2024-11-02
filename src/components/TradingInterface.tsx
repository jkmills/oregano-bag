import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../store/gameStore';
import { commodities } from '../data/commodities';
import { cities } from '../data/cities';

const TradingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommodityList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
`;

const CommodityCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
`;

const TradingInterface: React.FC = () => {
  const { cash, location, addToInventory, removeFromInventory, setCash } = useGameStore();
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const newPrices: Record<string, number> = {};
    commodities.forEach(commodity => {
      const citySpecialty = cities.find(city => city.name === location)?.specialties.includes(commodity.id);
      const priceRange = commodity.maxPrice - commodity.minPrice;
      const basePrice = commodity.minPrice + Math.random() * priceRange;
      const specialtyDiscount = citySpecialty ? 0.9 : 1;
      newPrices[commodity.id] = Math.round(basePrice * specialtyDiscount * 100) / 100;
    });
    setPrices(newPrices);
  }, [location]);

  const handleBuy = (commodityId: string) => {
    const commodity = commodities.find(c => c.id === commodityId);
    if (commodity && prices[commodityId] <= cash) {
      addToInventory({
        id: `${commodityId}-${Date.now()}`,
        commodityId,
        quantity: 1,
        purchasePrice: prices[commodityId],
      });
      setCash(cash - prices[commodityId]);
    }
  };

  const handleSell = (commodityId: string) => {
    const inventoryItem = useGameStore.getState().inventory.find(item => item.commodityId === commodityId);
    if (inventoryItem) {
      removeFromInventory(inventoryItem.id);
      setCash(cash + prices[commodityId]);
    }
  };

  return (
    <TradingContainer>
      <h2>Trading in {location}</h2>
      <p>Available Cash: ${cash.toFixed(2)}</p>
      <CommodityList>
        {commodities.map(commodity => (
          <CommodityCard key={commodity.id}>
            <h3>{commodity.name}</h3>
            <p>Price: ${prices[commodity.id]?.toFixed(2)} / {commodity.unit}</p>
            <Button onClick={() => handleBuy(commodity.id)}>Buy</Button>
            <Button onClick={() => handleSell(commodity.id)}>Sell</Button>
          </CommodityCard>
        ))}
      </CommodityList>
    </TradingContainer>
  );
};

export default TradingInterface;
