import React, { useState } from 'react'

function WeatherApp() {
  const [inputQuery,setInputQuery] = useState('');
  const [weather,setWeather] = useState({});
  const api = {
    key:'6a6119720e6aca067c98c9e5f6b59b4a',
    base:'https://api.openweathermap.org/data/2.5/'
  }
  const search =e =>{
    if (e.key === 'Enter'){
      fetch(`${api.base}weather?q=${inputQuery}&units=metric&APPID=${api.key}`)
      .then(res =>res.json())
      .then(result =>{
        setWeather(result);
        setInputQuery('');
      })
    }
  }
  const datebuilder=(d)=>{
    let months =['January','Febuary','March',
    'April','May','June',
    'July','August','September',
    'October','November','December'];
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className='main h-screen w-screen '>
      
      <div className="search-bar">
        <input type="text" className=" w-3/5 p-4 pt-2 mt-4 font-semibold rounded-xl" 
        placeholder='search...' value={inputQuery}
        onChange={e=>setInputQuery(e.target.value)} onKeyPress={search} />
      </div>
      <div className="location-box  mt-16">
        <div className="location font-bold text-4xl p-2 ">
          {weather.name}{ (typeof weather.sys != 'undefined')?<span className='ml-4 ' >,{weather.sys.country}</span>:('')}
        </div>
        <div className="font-semibold p-2">
          {datebuilder(new Date())}
        </div>
      </div>
      {(typeof weather.main != 'undefined')?
      (
        <div className='temp-box mt-8 flex justify-center flex-col items-center'>
          <div className="temp bg-transparent border-4 w-1/6 text-8xl font-bold p-10 rounded-2xl">
            {Math.round(weather.main.temp)}°c
          </div>
          <div className="wether mt-2 text-4xl font-semibold p-2">
            {weather.weather[0].main}
          </div>
        </div>
      ):('')}
      
    </div>
  )
}

export default WeatherApp
