import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ hideAll, setHideAll ] = useState(true)  
  const [ filterCountry, setFilterCountry] = useState('')
  const [ weather, setWeather ] = useState({})
  
  const hook = () => {
    //console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log('promise fulfilled')
        //console.log(response.data)
        const endpointdata = response.data
        const [ ...cleancountries ] = endpointdata.map(data => data)
        //console.log(cleancountries)
        setCountries(cleancountries)
      })
  }

  const weather_hook = () => {
    //powershell version of adding api key is better than windows cmd for formatting purposes...
    const api_key = process.env.REACT_APP_API_KEY
    const params = {
      access_key: api_key,
      query: filterCountry
    }
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        //console.log('promise fufilled')
        const responseCapture=response.data
        const currentWeather = responseCapture.current
        setWeather(currentWeather)
        //console.log(weather)
      })
  }

  useEffect(hook, [])
  useEffect(weather_hook, [filterCountry])

  //console.log(countries)
  const handleFilterChange = (event) => {
    setHideAll(false)
    setFilterCountry(event.target.value)
    if (event.target.value===''){
      setHideAll(true)
    }
  }

  const countriesToShow = hideAll    
  ? []
  : countries.filter(country => country.name.toUpperCase().includes(filterCountry.toUpperCase()))

  const displayMagic = (countriesToShow.length > 10)
  ? 'Too many matches, specify another filter'
  : countriesToShow.map( country => {   
      //required time for weather to be set...
      setTimeout(() => {  console.log("Buffering"); }, 2000);
      if (countriesToShow.length>1) {
        return (<div key={country.alpha3Code}>{country.name}<button onClick={() => setFilterCountry(country.name)}>show</button></div>)
      } else {
        return (
          <div key={country.alpha3Code}>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>
              { country.languages.map ( language => 
                <li key={language.name}>{language.name}</li>)
              }
            </ul>
            <img src={country.flag} alt={country.name} width='100px'></img>
            <h1>Weather in {country.name}</h1>
            <div><strong>temperature:</strong>{weather.temperature} Celcius</div>
            <img src={weather.weather_icons} alt={weather.weather_descriptions} width='60px'></img>
            <div><strong>wind:</strong>{weather.wind_speed} mph direction {weather.wind_dir}</div>
          </div>
          
        )
      }
    })

  return (
    <div>
      <div>
        find countries <input value={filterCountry} onChange={handleFilterChange} />
      </div>
      <div>
        {displayMagic}
      </div>
    </div>
  )
}

export default App;
