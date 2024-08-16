import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainComponent from './components/main/MainComponent';
import FullStep from './components/step/FullStep';
import SelectRange from './components/setting/SelectRange';
import SelectDifficult from './components/setting/SelectDifficult';
import SelectMode from './components/setting/SelectMode';
import Custom from './components/setting/Custom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainComponent />} />
      <Route path="/selectrange" element={<SelectRange />} />
      <Route path="/selectdifficult" element={<SelectDifficult />} />
      <Route path="/selectmode" element={<SelectMode />} />
      <Route path="/custom" element={<Custom />} />
      <Route path="/step" element={<FullStep />} />
    </Routes>
  );
}

export default App;
