import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const measure = useRef(null);
  const [location, setLocation] = useState('');
  const [getWeatherInfo, setGetWeatherInfo] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [errorMsg, setErrorMsg] = useState(null);

  // const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=17a8040c18ed4f3da448e2fff7b3a6f6`;

  const getUrl = (measureUnit, location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${measureUnit}&appid=17a8040c18ed4f3da448e2fff7b3a6f6`;
    return url;
  };

  const searchLocation = async (e) => {
    if (e.key === 'Enter') {
      try {
        const url = getUrl(unit, location);
        const data = await fetch(url);
        if (data?.ok) {
          setErrorMsg(null);
          const jsonData = await data.json();
          setGetWeatherInfo(jsonData);
        } else {
          // console.log(data?.statusText);
          setGetWeatherInfo(null);
          setErrorMsg(`Location '${location}' could not be found`);
        }

        // console.log(getWeatherInfo);
      } catch (error) {
        console.log('There was an error: ', error);
      }
      // const url = getUrl(unit, location);
      // const data = await fetch(url);
      // const jsonData = await data.json();
      // setGetWeatherInfo(jsonData);
      // setLocation('');
    }
  };

  const changeUnit = (e) => {
    setUnit(measure.current.value);
    callApi(measure.current.value);
  };

  const callApi = async (item) => {
    const url = getUrl(item, location);
    const data = await fetch(url);
    const jsonData = await data.json();
    setGetWeatherInfo(jsonData);
  };

  return (
    <div>
      <img
        src='https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
        className='object-cover w-full h-screen'
        alt=''
      />

      <div className='absolute top-10 left-0 right-0 mx-auto   flex justify-center items-center'>
        <input
          type='text'
          value={location}
          ref={measure}
          placeholder='Enter Location'
          className='bg-transparent/10 p-2 text-white'
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          required
        />
        <select
          className='ml-4'
          value={unit}
          onChange={changeUnit}
          name='measure-unit'
          ref={measure}
        >
          <option value='metric'>Celsius</option>
          <option value='imperial'>Farenheit</option>
        </select>
      </div>

      {errorMsg && (
        <div className='absolute top-1/3 font-bold text-white left-0 right-0 mx-auto flex flex-col gap-5 justify-center items-center'>
          {errorMsg}
        </div>
      )}

      {getWeatherInfo && (
        <div className='absolute top-1/3 font-bold text-white left-0 right-0 mx-auto flex flex-col gap-5 justify-center items-center'>
          <h1 className='text-2xl'>{getWeatherInfo?.name.toUpperCase()}</h1>
          <p className='text-9xl'>
            {getWeatherInfo?.main?.temp.toFixed()}
            {unit === 'metric' ? '°C' : '°F'}
          </p>
          <p className='text-xl'> {getWeatherInfo?.weather[0]?.description} </p>
        </div>
      )}
      {getWeatherInfo && (
        <div className='absolute bottom-5 left-0 right-0 mx-auto  flex justify-center items-center gap-10 p-4 bg-black/50 rounded text-white'>
          <div>
            <p className='text-xl'>
              {getWeatherInfo?.main?.feels_like.toFixed()}
              {unit === 'metric' ? '°C' : '°F'}
            </p>
            <p>Feels like</p>
          </div>
          <div>
            <p>{getWeatherInfo?.main?.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div>
            <p>
              {getWeatherInfo?.wind?.speed}
              {unit === 'metric' ? 'm/s' : 'MPH'}
            </p>
            <p>Wind speed</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
