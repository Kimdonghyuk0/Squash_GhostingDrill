import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import MainComponent from './components/main/MainComponent';
import FullStep from './components/step/FullStep';
import SelectRange from './components/setting/SelectRange';
import SelectDifficult from './components/setting/SelectDifficult';
import SelectMode from './components/setting/SelectMode';
import Custom from './components/setting/Custom';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      // 특정 경로에서 뒤로 가기 버튼을 무력화
      if (location.pathname === '/') {
        navigate(location.pathname); // 다시 현재 페이지로 리다이렉트하여 뒤로 가기를 무력화
      }
    };

    window.history.pushState(null, null, location.pathname); // 히스토리 상태 추가
    window.addEventListener('popstate', handlePopState); // popstate 이벤트 리스너 추가

    return () => {
      window.removeEventListener('popstate', handlePopState); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, [location, navigate]);

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
