import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import MainComponent from './components/main/MainComponent';
import FullStep from './components/step/FullStep';
import SelectRange from './components/setting/SelectRange';
import SelectDifficult from './components/setting/SelectDifficult';
import SelectMode from './components/setting/SelectMode';
import Custom from './components/setting/Custom';

function App() {
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // 메인 페이지에서만 경고 표시
      if (location.pathname === '/') {
        e.preventDefault();
        e.returnValue = ''; // 이 줄이 있어야 일부 브라우저에서 경고가 제대로 표시됩니다.
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname]);

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
