import React from 'react';
import styled from 'styled-components';
import { useGameStore } from '../store/gameStore';
import { cities } from '../data/cities';

const TravelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CityList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
`;

const CityCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TravelButton = styled.button`
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

  &:disabled {
    background-color: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const TravelSystem: React.FC = () => {
  const { location, setLocation, cash, setCash, setDay } = useGameStore();

  const handleTravel = (cityName: string) => {
    const travelCost = 500; // Fixed travel cost for now
    if (cash >= travelCost) {
      setLocation(cityName);
      setCash(cash - travelCost);
      setDay(useGameStore.getState().day + 1);
    }
  };

  return (
    <TravelContainer>
      <h2>Travel System</h2>
      <p>Current Location: {location}</p>
      <p>Available Cash: ${cash.toFixed(2)}</p>
      <CityList>
        {cities.map(city => (
          <CityCard key={city.id}>
            <h3>{city.name}</h3>
            <p>Specialties: {city.specialties.join(', ')}</p>
            <TravelButton
              onClick={() => handleTravel(city.name)}
              disabled={city.name === location || cash < 500}
            >
              Travel (Cost: $500)
            </TravelButton>
          </CityCard>
        ))}
      </CityList>
    </TravelContainer>
  );
};

export default TravelSystem;
