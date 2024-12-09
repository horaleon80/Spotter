import React from 'react';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import CarRental from './pages/CarRental';
import Header from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/car-rentals" element={<CarRental />} />
      </Routes>
    </>
  );
};

export default App;