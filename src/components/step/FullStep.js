import React, { useEffect, useState } from 'react';
import { FiPauseCircle } from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';
import '../../App.css';
import { useNavigate } from 'react-router-dom';

function FullStep() {
  const [activeCells, setActiveCells] = useState(Array(9).fill(false));
  const [time, setTime] = useState(3);
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (time >= 1) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }

    if (time < 1) {
      setStart(true);
    }
    return () => clearTimeout(time);
  }, [time]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      // 1, 3, 4, 6, 7, 9 중 랜덤 위치 선택
      const eligibleCells = [0, 2, 3, 5, 6, 8];
      const randomCell =
        eligibleCells[Math.floor(Math.random() * eligibleCells.length)];

      setActiveCells((prev) => {
        const newCells = Array(9).fill(false);
        newCells[randomCell] = true;
        return newCells;
      });

      setTimeout(() => {
        setActiveCells(Array(9).fill(false));
      }, 1000); // 1초 후에 원이 사라짐
    }, 2000); // 5초마다 랜덤 위치 변경

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="squash-court relative">
      <div className="absolute right-5 top-5">
        <FiPauseCircle className="text-4xl text-black md:text-3xl opacity-15" />
      </div>

      {!start && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-red-600 font-bold">
            {time}
          </span>
        </div>
      )}

      {start && (
        <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-3 grid-rows-3">
          {activeCells.map((isActive, idx) => (
            <div
              key={idx}
              className={`flex justify-center items-center p-0 m-0 h-full w-full ${
                isActive ? 'bg-red-600' : ''
              }`}
            >
              {/* 아이콘을 제거하고, 셀에 노란색 배경을 적용 */}
            </div>
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

export default FullStep;
