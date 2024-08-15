import React from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { VscDebugStart } from 'react-icons/vsc';
import { IoSettingsOutline } from 'react-icons/io5';

function MainComponent() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-800 min-h-screen w-full flex justify-center items-center">
      <VscDebugStart
        className="text-yellow-500"
        size="calc(17vw + 17vh)"
        onClick={() => {
          navigate('/step/full');
        }}
      />
      <IoSettingsOutline
        className="text-white absolute left-5 bottom-5 md:left-8 md:bottom-8"
        size="calc(8vw + 8vh)"
        onClick={() => {
          navigate('/setting');
        }}
      />
    </div>
  );
}

export default MainComponent;
