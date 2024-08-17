import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { IoInfinite } from 'react-icons/io5';
import { TbNumber10Small } from 'react-icons/tb';
import { RiNumber1, RiNumber0 } from 'react-icons/ri';
import { TbRewindBackward10 } from 'react-icons/tb';
import { TbRewindForward10 } from 'react-icons/tb';
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
        <h2 className="text-white font-bold text-4xl text-center w-full flex items-center justify-center">
          <IoInfinite className="text-6xl text-red-500 mr-2" />
          Infinity
        </h2>
      </div>
      <div className="mode-option flex-grow flex flex-col justify-center items-center cursor-pointer px-4 border-b-4 border-yellow-500">
        <h2 className="text-white font-bold text-lg text-center w-full">
          <div className="flex flex-wrap justify-center items-center space-x-4">
            <button
              onClick={() => setNum((prev) => Math.max(0, prev - 10))}
              className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition duration-300 text-3xl sm:text-2xl sm:py-2 sm:px-4"
            >
              <TbRewindBackward10 />
            </button>

            <button
              onClick={() => setNum((prev) => Math.max(0, prev - 1))}
              className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition duration-300 text-3xl sm:text-2xl sm:py-2 sm:px-4"
            >
              <FaMinus />
            </button>

            <span className="text-black font-bold text-4xl mx-4 sm:text-3xl">
              {num}
            </span>

            <button
              onClick={() => setNum((prev) => prev + 1)}
              className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition duration-300 text-3xl sm:text-2xl sm:py-2 sm:px-4"
            >
              <FaPlus />
            </button>

            <button
              onClick={() => setNum((prev) => prev + 10)}
              className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition duration-300 text-3xl sm:text-2xl sm:py-2 sm:px-4"
            >
              <span className="flex items-center">
                <TbRewindForward10 />
              </span>
            </button>
          </div>

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
            className="mt-6 bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-600 transition duration-300 text-2xl"
          >
            Select
          </button>
        </h2>
      </div>
    </div>
  );
};

export default SelectDifficult;
