import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const SelectDifficult = () => {
  const [difficulty, setDifficulty] = useState(0);
  const location = useLocation();
  const { range, selectedCells } = location.state; // 이전 단계에서 전달된 range 값
  const navigate = useNavigate();

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
          setDifficulty(0);
          navigate('/selectmode', {
            state: {
              difficulty: 0,
              range: range,
              selectedCells: selectedCells,
            },
          });
        }}
      >
        <h2 className="text-yellow-200 font-bold text-lg text-center w-full">
          Very Easy
          <br></br>
          (9s)
        </h2>
      </div>
      <div
        className="mode-option flex-grow flex justify-between items-center cursor-pointer px-4 border-b-4 border-yellow-500"
        onClick={() => {
          setDifficulty(1);
          navigate('/selectmode', {
            state: {
              difficulty: 1,
              range: range,
              selectedCells: selectedCells,
            },
          });
        }}
      >
        <h2 className="text-yellow-500 font-bold text-lg text-center w-full">
          Easy
          <br></br>
          (7s)
        </h2>
      </div>
      <div
        className="mode-option flex-grow flex justify-between items-center cursor-pointer px-4 border-b-4 border-yellow-500"
        onClick={() => {
          setDifficulty(2);
          navigate('/selectmode', {
            state: {
              difficulty: 2,
              range: range,
              selectedCells: selectedCells,
            },
          });
        }}
      >
        <h2 className="text-red-400 font-bold text-lg text-center w-full">
          Normal
          <br></br>
          (5s)
        </h2>
      </div>
      <div
        className="mode-option flex-grow flex justify-between items-center cursor-pointer px-4"
        onClick={() => {
          setDifficulty(3);
          navigate('/selectmode', {
            state: {
              difficulty: 3,
              range: range,
              selectedCells: selectedCells,
            },
          });
        }}
      >
        <h2 className="text-red-600 font-bold text-lg text-center w-full">
          Hard
          <br></br>
          (3s)
        </h2>
      </div>
    </div>
  );
};

export default SelectDifficult;
