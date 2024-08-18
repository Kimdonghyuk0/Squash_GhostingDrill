import React, { useEffect, useState } from 'react';
import { FiPauseCircle } from 'react-icons/fi';
import '../../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { VscDebugRestart } from 'react-icons/vsc';
import { FaHome } from 'react-icons/fa';
import { HiMiniPlayPause } from 'react-icons/hi2';
import { IoVolumeHigh } from 'react-icons/io5';
import { IoVolumeMute } from 'react-icons/io5';
import backleft from '../../sound/backleft.wav';
import backright from '../../sound/backright.wav';
import frontleft from '../../sound/frontleft.wav';
import frontright from '../../sound/frontright.wav';
import sideleft from '../../sound/sideleft.wav';
import sideright from '../../sound/sideright.wav';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBgm } from '../../store';

function FullStep() {
  const sounds = [
    new Audio(frontleft),
    null,
    new Audio(frontright),
    new Audio(sideleft),
    null,
    new Audio(sideright),
    new Audio(backleft),
    null,
    new Audio(backright),
  ];

  const [activeCells, setActiveCells] = useState(Array(9).fill(false));
  const [time, setTime] = useState(5);
  const [start, setStart] = useState(false);
  const location = useLocation();
  const { difficulty, range, mode, selectedCells } = location.state || {};
  const [eligibleCells, setEligibleCells] = useState([0, 2, 3, 5, 6, 8]);
  const [difTime, setDifTime] = useState(0);
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [restart, setRestart] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [check, setCheck] = useState(true);

  let count = 0;
  let bgm = useSelector((state) => state.bgm);
  let wakeLock = null;

  useEffect(() => {
    async function requestWakeLock() {
      try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock is active');
        wakeLock.addEventListener('release', () => {
          console.log('Wake Lock was released');
        });
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    }

    document.addEventListener('visibilitychange', async () => {
      if (wakeLock !== null && document.visibilityState === 'visible') {
        wakeLock.release();
        wakeLock = null;
        requestWakeLock();
      }
    });

    requestWakeLock();

    return () => {
      document.removeEventListener('visibilitychange', async () => {
        if (wakeLock !== null) {
          wakeLock.release();
          wakeLock = null;
        }
      });

      if (wakeLock !== null) {
        wakeLock.release();
        wakeLock = null;
      }
    };
  }, []);

  //카운트 다운
  useEffect(() => {
    count = 0;
    console.log('time : ' + time);
    console.log('restart : ' + restart);
    console.log('ispuased : ' + isPaused);
    console.log('selectedCells : ' + selectedCells);
    if (time >= 1) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }

    if (time < 1) {
      setStart(true);
    }
    return () => clearTimeout(time);
  }, [time, restart]);

  useEffect(() => {
    if (start && !isPaused) {
      console.log('dif:', difficulty);
      console.log('range:', range);
      console.log('mode:', mode);
      console.log('ispuased : ' + isPaused);
      let newEligibleCells = [];
      if (range === 'front') {
        newEligibleCells = [0, 2, 3, 5, 0, 0, 2, 2, 0, 0, 2, 2];
      } else if (range === 'full') {
        newEligibleCells = [
          0, 2, 3, 5, 6, 8, 0, 0, 2, 2, 6, 6, 8, 8, 6, 6, 8, 8, 0, 0, 2, 2,
        ];
      } else if (range === 'back') {
        newEligibleCells = [3, 5, 6, 8, 6, 6, 8, 8, 6, 6, 8, 8];
      } else {
        if (selectedCells && selectedCells.length > 0)
          newEligibleCells = selectedCells;
        else
          newEligibleCells = [
            0, 2, 3, 5, 6, 8, 0, 0, 2, 2, 6, 6, 8, 8, 6, 6, 8, 8, 0, 0, 2, 2,
          ];
      }
      setEligibleCells(newEligibleCells);

      let newDifTime = 7000;
      if (difficulty === 0) {
        newDifTime = 9000;
      } else if (difficulty === 1) {
        newDifTime = 7000;
      } else if (difficulty === 2) {
        newDifTime = 5000;
      } else if (difficulty === 3) {
        newDifTime = 3000;
      }
      setDifTime(newDifTime);

      // 첫 라운드 즉시 실행
      const executeRound = () => {
        const randomCell =
          newEligibleCells[Math.floor(Math.random() * newEligibleCells.length)];

        setActiveCells(() => {
          console.log('newEligibleCells' + newEligibleCells);
          const newCells = Array(9).fill(false);
          newCells[randomCell] = true;
          if (bgm) sounds[randomCell].play();

          return newCells;
        });

        setTimeout(() => {
          setActiveCells(Array(9).fill(false));
        }, 2000); // 2초 후에 원이 사라짐
      };

      executeRound(); // 첫 라운드 즉시 실행

      // 반복적으로 실행되는 부분
      const intervalId = setInterval(() => {
        console.log('Count:' + count);
        console.log('mode:' + mode);

        if (mode === -1 && !isPaused) executeRound();
        else if (mode != -1 && count >= mode - 1) {
          setStart(false);
          clearInterval(intervalId); // 반복 종료
          setShowModal(true); // 모달 표시
        } else {
          if (!isPaused) {
            executeRound();
            count += 1; // 반복 횟수 증가
          }
        }
      }, newDifTime);

      return () => clearInterval(intervalId);
    }
  }, [start, range, difficulty, mode, isPaused]);

  return (
    <div className="squash-court relative">
      {showModal && (
        <FinishModal
          setRestart={setRestart}
          restart={restart}
          setShowModal={setShowModal}
          setTime={setTime}
        />
      )}
      {!start && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-red-600 font-bold">
            {time}
          </span>
        </div>
      )}

      {start && (
        <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-3 grid-rows-3">
          <div className="absolute right-5 top-5">
            <FiPauseCircle
              className="text-4xl text-black md:text-3xl opacity-30 z-50"
              onClick={() => {
                console.log('일시정지중');
                setIsPaused((prev) => !prev);
              }}
            />
            {isPaused && <PauseModal setIsPaused={setIsPaused} />}
          </div>
          {activeCells.map((isActive, idx) => (
            <div
              key={idx}
              className={`flex justify-center items-center p-0 m-0 h-full w-full ${
                isActive ? 'bg-red-600' : ''
              }`}
            ></div>
          ))}
        </div>
      )}

      <div className="court-line top"></div>
      <div className="court-line bottom"></div>
      <div className="court-line left"></div>
      <div className="court-line right"></div>
      <div className="court-box left-box"></div>
      <div className="court-box l-box"></div>
      <div className="court-box right-box"></div>
      <div className="court-box r-box"></div>
    </div>
  );
}

const FinishModal = ({ setRestart, restart, setShowModal, setTime }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-stone-900 p-6 rounded-lg shadow-lg z-50">
        <h2 className="text-2xl font-bold mb-4 text-amber-400">
          Finish Your Drill
        </h2>
        <div className="flex justify-center space-x-4">
          <FaHome
            size={50}
            className="text-white"
            onClick={() => {
              const historyLength = window.history.length;
              if (historyLength > 0) {
                navigate(-historyLength + 1); // 히스토리 길이 - 1 만큼 뒤로 가기
              } else {
                navigate('/'); // 히스토리가 없으면 홈으로 가기 (필요시 대체)
              }
            }}
          />
          <VscDebugRestart
            size={50}
            className="text-white"
            onClick={() => {
              setRestart(restart + 1);
              setShowModal(false);
              setTime(3);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const PauseModal = ({ setIsPaused }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let bgm = useSelector((state) => state.bgm);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-stone-900 p-6 rounded-lg shadow-lg z-50">
        <h2 className="text-2xl font-bold mb-4 text-amber-400">
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; Paused
        </h2>
        <div className="flex justify-center space-x-4">
          <FaHome
            size={50}
            className="text-white"
            onClick={() => {
              const historyLength = window.history.length;
              if (historyLength > 0) {
                navigate(-historyLength + 1); // 히스토리 길이 - 1 만큼 뒤로 가기
              } else {
                navigate('/'); // 히스토리가 없으면 홈으로 가기 (필요시 대체)
              }
            }}
          />
          <HiMiniPlayPause
            size={50}
            className="text-white"
            onClick={() => {
              setIsPaused((prev) => !prev);
            }}
          />

          {bgm ? (
            <IoVolumeHigh
              size={50}
              className="text-white"
              onClick={() => {
                dispatch(toggleBgm());
              }}
            />
          ) : (
            <IoVolumeMute
              size={50}
              className="text-white"
              onClick={() => {
                dispatch(toggleBgm());
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FullStep;
