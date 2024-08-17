import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainComponent from './components/main/MainComponent';
import FullStep from './components/step/FullStep';
import SelectRange from './components/setting/SelectRange';
import SelectDifficult from './components/setting/SelectDifficult';
import SelectMode from './components/setting/SelectMode';
import Custom from './components/setting/Custom';

let deferredPrompt;

function App() {
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setShowInstallButton(true); // 설치 버튼을 표시
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
        setShowInstallButton(false); // 설치 후 버튼 숨기기
      });
    }
  };

  return (
    <div>
      {showInstallButton && (
        <button
          onClick={handleInstallClick}
          style={{ position: 'fixed', bottom: 20, right: 20 }}
        >
          앱 설치
        </button>
      )}

      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/selectrange" element={<SelectRange />} />
        <Route path="/selectdifficult" element={<SelectDifficult />} />
        <Route path="/selectmode" element={<SelectMode />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/step" element={<FullStep />} />
      </Routes>
    </div>
  );
}

export default App;
