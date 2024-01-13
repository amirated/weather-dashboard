import { FC, useState } from 'react';

interface InputTextProps {
  placeholder: string;
  handleEnter: (value: string) => void;
}

const InputText: FC<InputTextProps> = ({ placeholder, handleEnter }) => {
  const [value, setValue] = useState<string>("");
  const handleKeyDown = (event: {key: string;}) => {
    if (event.key === "Enter") {
      handleEnter(value);
      setValue("");
    }
  }
  return (
    <>
      <input 
        type="text"
        className='py-3 px-6 w-[85%] text-lg rounded-3xl border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:outline-none bg-white-600/100 shadow-md'
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDownCapture={(event) => handleKeyDown(event)}
      />
    </>
  );
};

export default InputText;
