import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainComponent from './components/main/MainComponent';
import FullStep from './components/step/FullStep';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainComponent />} />
      <Route path="/step/full" element={<FullStep />} />
    </Routes>
  );
}

export default App;
