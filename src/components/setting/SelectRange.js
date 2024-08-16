import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import fullIcon from '../../img/full.jpg';
import backIcon from '../../img/back.jpg';
import frontIcon from '../../img/front.jpg';
import customIcon from '../../img/custom.jpg';
import { IoIosArrowBack } from 'react-icons/io';

const SelectRange = () => {
  const [range, setRange] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
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
          setRange('full');
          navigate('/selectdifficult', { state: { range: 'full' } });
        }}
      >
        <h2 className="text-white font-bold text-lg text-center w-full">
          Full
        </h2>
        <img
          src={fullIcon}
          alt="Full icon"
          className="h-20 w-20 object-contain"
        />
      </div>
      <div
        className="mode-option flex-grow flex justify-between items-center cursor-pointer px-4 border-b-4 border-yellow-500"
        onClick={() => {
          setRange('front');
          navigate('/selectdifficult', { state: { range: 'front' } });
        }}
      >
        <h2 className="text-white font-bold text-lg text-center w-full">
          Front
        </h2>
        <img
          src={frontIcon}
          alt="Front icon"
          className="h-20 w-20 object-contain"
        />
      </div>
      <div
        className="mode-option flex-grow flex justify-between items-center cursor-pointer px-4 border-b-4 border-yellow-500"
        onClick={() => {
          setRange('back');
          navigate('/selectdifficult', { state: { range: 'back' } });
        }}
      >
        <h2 className="text-white font-bold text-lg text-center w-full">
          Back
        </h2>
        <img
          src={backIcon}
          alt="Back icon"
          className="h-20 w-20 object-contain"
        />
      </div>
      <div
        className="mode-option flex-grow flex justify-between items-center cursor-pointer px-4"
        onClick={() => {
          setRange('custom');
          navigate('/custom', {
            state: { range: 'custom' },
          });
        }}
      >
        <h2 className="text-white font-bold text-lg text-center w-full">
          Custom
        </h2>
        <img
          src={customIcon}
          alt="Custom icon"
          className="h-20 w-20 object-contain"
        />
      </div>
    </div>
  );
};

export default SelectRange;
