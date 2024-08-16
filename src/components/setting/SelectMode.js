import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const SelectDifficult = () => {
  const [mode, setMode] = useState(0); // mode가 0이면 무한 mode는 반복횟수임
  const [num, setNum] = useState(0);
  const location = useLocation();
  const { difficulty, range, selectedCells } = location.state || {}; // 이전 단계에서 전달된 값
  const navigate = useNavigate();
  console.log(difficulty);
  console.log(range);

  return (
    <div className="bg-slate-800 min-h-screen w-full flex flex-col">
      <div>
        <IoIosArrowBack
          size={40}
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
      <div
        className="mode-option flex-grow flex justify-between items-center cursor-pointer px-4 border-b-4 border-yellow-500"
        onClick={() => {
          setMode(-1);
          navigate('/step', {
            state: {
              difficulty: difficulty,
              range: range,
              mode: -1,
              selectedCells: selectedCells,
            },
          });
        }}
      >
        <h2 className="text-red-500 font-bold text-4xl text-center w-full">
          Infinity
        </h2>
      </div>
      <div className="mode-option flex-grow flex justify-between items-center cursor-pointer px-4 border-b-4 border-yellow-500">
        <h2 className="text-white font-bold text-lg text-center w-full">
          <input
            type="number"
            onChange={(e) => setNum(e.target.value)}
            placeholder="Enter the number of shots"
            className="w-full p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={() => {
              setMode(num);
              navigate('/step', {
                state: {
                  difficulty: difficulty,
                  range: range,
                  mode: num,
                  selectedCells: selectedCells,
                },
              });
            }}
            className="mt-4 bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Select
          </button>
        </h2>
      </div>
    </div>
  );
};

export default SelectDifficult;
