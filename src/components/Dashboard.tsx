import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGameStore } from '../store/gameStore';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Stat = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavButton = styled(Link)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  margin: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
`;

const Dashboard: React.FC = () => {
  const { cash, loan, day, location } = useGameStore();

  return (
    <DashboardContainer>
      <h1>Global Commodities Trader</h1>
      <StatsContainer>
        <Stat>Cash: ${cash.toFixed(2)}</Stat>
        <Stat>Loan: ${loan.toFixed(2)}</Stat>
        <Stat>Day: {day}</Stat>
        <Stat>Location: {location}</Stat>
      </StatsContainer>
      <div>
        <NavButton to="/trade">Trade</NavButton>
        <NavButton to="/travel">Travel</NavButton>
        <NavButton to="/stats">Stats</NavButton>
        <NavButton to="/tutorial">Tutorial</NavButton>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
