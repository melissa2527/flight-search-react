import React, { useState, useEffect } from 'react'
import { DateTime, datetimeFromREST  } from 'luxon';
import './App.css';

function App2() {

  const [ flights, setFlights ] = useState([])
  const [ departure, setDeparture ] = useState('')
  const [ destination, setDestination ] = useState('')

  
  // const url = 'https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2020&dateTo=12/12/2020&partner=picky&v=3'

  const searchFlights = async (e) => {
    // e.preventDefault()
    const url = `https://api.skypicker.com/flights?flyFrom=${departure}&to=${destination}&dateFrom=12/01/2021&dateTo=12/12/2021&partner=picky&v=3`
    try {
      const response = await fetch(url)
      const data = await response.json()
      const firstData = data.data.slice(0, 6)
      console.log(firstData)
      setFlights(firstData)
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    searchFlights();
    // console.log(departure)
    // console.log(destination)
  },[departure, destination])

  const selectDeparture = (e) => {
    setDeparture(
      e.target.value
    )
  } 

  const selectDestination = (e) => {
    setDestination(
      e.target.value
    )
  } 

  return (
    <div className="App">
      Hanka
      <form className="form" onSubmit={searchFlights}>
        <label className="label" htmlFor="departure">Departure</label>
          <select name="departure" onChange={selectDeparture}>
            <option>Choose your departure</option>
            <option value="PRG">Prague</option>
            <option value="TXL">Berlin</option>
            <option value="WAW">Warsaw</option>
            <option value="PED">Pardubice</option>
          </select>

        <label>Destination</label>
        <select name="destination" onChange={selectDestination}>
        <option>Choose your destination</option>
            <option value="VLC">Valencia</option>
            <option value="BCN">Barcelona</option>
            <option value="MAD">Madrid</option>
            <option value="MXP">Milano</option>
            <option value="AIA">Athens</option>
        </select>
            
          <button className="button">search</button>
      </form>

      <div className="flight-list">
          {/* <h3>Flight Details:</h3> */}
          <div className="flight-card">{departure} to {destination}
          
          {flights.length == 0 ? (
            <h2>No available flights</h2>
          
          ) : (
                flights.map (
                
                  (flight, i) => 
                  
                  <ul>
                    <li>Option {i+1}</li>
      
                    <li>Departure: {DateTime.fromMillis(flight.dTime * 1000).toFormat('hh:mm')}</li>
                    
                    <li>Arrival: {DateTime.fromMillis(flight.aTime * 1000).toFormat('hh:mm')}</li>
      
                    <li>Duration: {flight.fly_duration} </li>
      
                    <li>Price: {flight.price} EUR</li>
                  </ul>
                  
                  )
            )
          }
          
          </div>

          
  
      </div>
    </div>
  );
}

export default App2;

