import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainComponent from './components/main/MainComponent';
import FullStep from './components/step/FullStep';
import SelectRange from './components/setting/SelectRange';
import SelectDifficult from './components/setting/SelectDifficult';
import SelectMode from './components/setting/SelectMode';
import Custom from './components/setting/Custom';

function App() {
  useEffect(() => {
    const preventPullToRefresh = (e) => {
      // 화면의 맨 위에서 아래로 드래그할 때 새로고침을 방지
      if (e.touches.length > 1 || e.touches[0].clientY > 0) {
        e.preventDefault();
      }
    };

    // 터치 움직임에 대한 이벤트 리스너 추가
    document.addEventListener('touchmove', preventPullToRefresh, {
      passive: false,
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('touchmove', preventPullToRefresh);
    };
  }, []);
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
