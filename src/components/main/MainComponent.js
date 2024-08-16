import React from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { VscDebugStart } from 'react-icons/vsc';
import { IoVolumeHigh } from 'react-icons/io5';
import { IoVolumeMute } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBgm } from '../../store';

function MainComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let bgm = useSelector((state) => state.bgm);

  return (
    <div className="bg-slate-800 min-h-screen w-full flex justify-center items-center">
      <VscDebugStart
        className="text-yellow-500"
        size="calc(17vw + 17vh)"
        onClick={() => {
          navigate('/selectrange');
        }}
      />

      {bgm ? (
        <IoVolumeHigh
          className="text-white absolute right-5 bottom-5 md:right-8 md:bottom-8"
          size="calc(6vw + 6vh)"
          onClick={() => {
            dispatch(toggleBgm());
          }}
        />
      ) : (
        <IoVolumeMute
          className="text-white absolute right-5 bottom-5 md:right-8 md:bottom-8"
          size="calc(6vw + 6vh)"
          onClick={() => {
            dispatch(toggleBgm());
          }}
        />
      )}
    </div>
  );
}

export default MainComponent;
