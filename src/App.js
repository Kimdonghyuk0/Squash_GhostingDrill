import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainComponent from './components/main/MainComponent';
import FullStep from './components/step/FullStep';
import SelectRange from './components/setting/SelectRange';
import SelectDifficult from './components/setting/SelectDifficult';
import SelectMode from './components/setting/SelectMode';
import Custom from './components/setting/Custom';
import { useLocation } from 'react-router-dom';

function App() {
  const [lastBackPress, setLastBackPress] = useState(0);
  const [exitApp, setExitApp] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleBackButton = (e) => {
      // 메인 화면에서만 뒤로 가기 이벤트를 처리하도록 설정
      if (location.pathname === '/' || location.pathname === '/home') {
        e.preventDefault();

        const currentTime = new Date().getTime();

        if (currentTime - lastBackPress < 1500) {
          setExitApp(true);
        } else {
          setLastBackPress(currentTime);
          alert('뒤로 가기 버튼을 한 번 더 누르시면 앱이 종료됩니다.');
        }
      }
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [lastBackPress, location.pathname]);

  useEffect(() => {
    if (exitApp) {
      if (
        window.navigator &&
        window.navigator.app &&
        window.navigator.app.exitApp
      ) {
        window.navigator.app.exitApp(); // Cordova 또는 웹뷰 환경에서 앱 종료
      } else {
        window.close(); // 브라우저에서 이 명령어는 거의 사용되지 않음
      }
    }
  }, [exitApp]);

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
