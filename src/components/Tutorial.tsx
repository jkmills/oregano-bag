import React, { useState } from 'react';
import styled from 'styled-components';

const TutorialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

const TutorialSection = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  width: 100%;
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

const Tutorial: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Global Commodities Trader",
      content: "In this game, you'll learn about global trade, market dynamics, and economic principles while trying to build your trading empire."
    },
    {
      title: "Getting Started",
      content: "You begin with $2,000 in cash. Your goal is to increase your net worth by trading commodities across different global markets."
    },
    {
      title: "Trading Commodities",
      content: "Buy low and sell high! Each city specializes in certain commodities, offering better prices. Pay attention to market trends and events that may affect prices."
    },
    {
      title: "Traveling",
      content: "Move between cities to take advantage of price differences. Remember, travel costs money and takes time, so plan your moves carefully."
    },
    {
      title: "Managing Risk",
      content: "Watch out for market volatility, transportation hazards, and storage costs. Consider using insurance options to protect your investments."
    },
    {
      title: "Winning the Game",
      content: "The game lasts for 30 days. Try to accumulate $100,000 to win, or keep playing to reach $1,000,000 for an epic victory!"
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <TutorialContainer>
      <h2>Tutorial</h2>
      <TutorialSection>
        <h3>{tutorialSteps[currentStep].title}</h3>
        <p>{tutorialSteps[currentStep].content}</p>
      </TutorialSection>
      <div>
        <Button onClick={handlePrevious} disabled={currentStep === 0}>Previous</Button>
        <Button onClick={handleNext} disabled={currentStep === tutorialSteps.length - 1}>Next</Button>
      </div>
    </TutorialContainer>
  );
};

export default Tutorial;
