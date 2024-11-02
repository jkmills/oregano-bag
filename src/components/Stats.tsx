import React from 'react';
import styled from 'styled-components';
import { useGameStore } from '../store/gameStore';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  width: 100%;
  max-width: 600px;
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 2rem;
`;

const Stats: React.FC = () => {
  const { cash, loan, day, inventory } = useGameStore();

  // Mock data for the chart
  const chartData = {
    labels: Array.from({ length: day }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Cash',
        data: Array.from({ length: day }, () => Math.random() * 10000),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cash Over Time',
      },
    },
  };

  const totalInventoryValue = inventory.reduce((total, item) => {
    return total + item.quantity * item.purchasePrice;
  }, 0);

  const netWorth = cash - loan + totalInventoryValue;

  return (
    <StatsContainer>
      <h2>Game Statistics</h2>
      <StatCard>
        <h3>Financial Overview</h3>
        <p>Cash: ${cash.toFixed(2)}</p>
        <p>Loan: ${loan.toFixed(2)}</p>
        <p>Inventory Value: ${totalInventoryValue.toFixed(2)}</p>
        <p>Net Worth: ${netWorth.toFixed(2)}</p>
      </StatCard>
      <StatCard>
        <h3>Game Progress</h3>
        <p>Current Day: {day}</p>
        <p>Items in Inventory: {inventory.length}</p>
      </StatCard>
      <ChartContainer>
        <Line options={chartOptions} data={chartData} />
      </ChartContainer>
    </StatsContainer>
  );
};

export default Stats;
