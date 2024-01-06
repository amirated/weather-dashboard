import React, { useState } from 'react';
import axios from 'axios';
import InputText from './components/InputText';

function App() {
  const [data, setData] = useState({});
  
  const searchLocation = (location: string) => {
    const url = `${process.env.REACT_APP_OPENWEATHER_API_ENDPOINT}?q=${location}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    axios.get(url)
      .then((response) => {
        setData(response.data);
      });
  }
  return (
    <div className="w-full h-full relative">
      <div className="text-center p-4">
        <InputText
          placeholder={'Type the city name here.'}
          handleEnter={searchLocation}
         />
      </div>
    </div>
  );
}

export default App;
