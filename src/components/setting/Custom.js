import React, { useState } from 'react';
import '../../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const Custom = () => {
  const location = useLocation();
  const { range } = location.state || {}; // location.state가 null이면 빈 객체를 사용
  const [customRange, setCustomRange] = useState([0, 2, 3, 5, 6, 8]);
  const [selectedCells, setSelectedCells] = useState([]);
  console.log('ssss:' + selectedCells);
  console.log('range:' + range);
  const navigate = useNavigate();

  const toggleCell = (index) => {
    if (customRange.includes(index)) {
      setSelectedCells((prev) => {
        if (prev.includes(index)) {
          return prev.filter((item) => item !== index); // 이미 포함되어 있다면 제거
        } else {
          return [...prev, index]; // 포함되어 있지 않다면 추가
        }
      });
    }
  };

  return (
    <div className="squash-court relative">
      <div className="court-line top"></div>
      <div className="court-line bottom"></div>
      <div className="court-line left"></div>
      <div className="court-line right"></div>
      <div className="court-box left-box"></div>
      <div className="court-box l-box"></div>
      <div className="court-box right-box"></div>
      <div className="court-box r-box"></div>

      <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-3 grid-rows-3">
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            className={`grid-cell ${
              selectedCells.includes(index)
                ? 'flex justify-center items-center p-0 m-0 h-full w-full bg-red-400'
                : ''
            }`}
            onClick={() => toggleCell(index)}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            {index === 7 && (
              <div className="button-container">
                <button
                  className="bg-slate-700 text-yellow-300 font-bold py-4 px-8 md:py-6 md:px-12 lg:py-8 lg:px-16 rounded-lg hover:bg-yellow-600 transition duration-300"
                  onClick={() =>
                    navigate('/selectdifficult', {
                      state: { range: range, selectedCells: selectedCells },
                    })
                  }
                >
                  Select
                </button>
              </div>
            )}
            {index === 0 && (
              <IoIosArrowBack
                size={40}
                style={{
                  position: 'absolute',
                  top: '10px', // 원하는 위치로 조정 가능
                  left: '10px', // 원하는 위치로 조정 가능
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigate(-1);
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="button-container"></div>
    </div>
  );
};

export default Custom;
