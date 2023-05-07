import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const [weather, setWeather] = useState([0, 0])

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_OPENWEATHERMAPAPI}`)
      .then(response => {
        setWeather([response.data.main.temp, response.data.wind.speed])
        document.querySelector('.weather_icon').src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      })
      .catch(error => console.log(error))
  }, [country.capital])
  
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <p>Languages</p>
      <ul>
        {Object.values(country.languages).map(lang => <li>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
      <p>Weather in {country.name.common}</p>
      <p>temparature {weather[0]} Celcius</p>
      <img className='weather_icon' alt='weather-icon'></img>
      <p>wind {weather[1]} m/s</p>
    </>
  )
}

const Content = ({filteredData, hcl, weather}) => {
  if (filteredData.length > 10 || filteredData.length === 0) {
    return <p>Search for a country, too many matches.</p>
  }
  if (filteredData.length === 1) {
    return <Country country={filteredData[0]}/>
  }
  return (
    <>
      {filteredData.map(country => {
        return <p key={country.name.common}>{country.name.common} <button onClick={() => hcl(country.name.common)}>show</button></p>
      })}
    </>
  )
}

const App = () => {
  const [query, setQuery] = useState('')
  const [countriesData, setCountriesData] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountriesData(response.data)
        // console.log(response.data)
      })
  }, [])

  let filteredData = []
  if (countriesData) {
    filteredData = countriesData.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
    // console.log(countriesData[0].name.common)
  }

  return (
    <>
      <p>Find countries <input value={query} onChange={(event) => setQuery(event.target.value)}></input></p>
      <Content filteredData={filteredData} hcl={(name) => setQuery(name)}/>
    </>
  )
}

export default App;
