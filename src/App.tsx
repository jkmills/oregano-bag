import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useGameStore } from './store/gameStore';
import Dashboard from './components/Dashboard';
import TradingInterface from './components/TradingInterface';
import TravelSystem from './components/TravelSystem';
import Stats from './components/Stats';
import Tutorial from './components/Tutorial';
import { lightTheme, darkTheme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

const App: React.FC = () => {
  const isDarkMode = useGameStore(state => state.isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trade" element={<TradingInterface />} />
          <Route path="/travel" element={<TravelSystem />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/tutorial" element={<Tutorial />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
