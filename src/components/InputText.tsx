import React, { FC } from 'react';

interface InputTextProps {
  placeholder: string;
}

const InputText: FC<InputTextProps> = ({ placeholder }) => {
  return (
    <>
      <input 
      type="text"
      className='py-3 px-6 w-[700px] text-lg rounded-3xl border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:outline-none bg-white-600/100 shadow-md'
      placeholder={placeholder} />
    </>
  );
};

export default InputText;
