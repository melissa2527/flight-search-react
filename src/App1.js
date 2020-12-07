import React, { useState, useEffect } from 'react'
import { DateTime, datetimeFromREST  } from 'luxon';
import './App.css';
// import Button from 'react-bootstrap/Button';

function App1() {


  const [ flights, setFlights ] = useState(null)
  const [ departure, setDeparture ] = useState('')
  const [ destination, setDestination ] = useState('')

  
  // const url = 'https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2020&dateTo=12/12/2020&partner=picky&v=3'

  const searchFlights = async (e) => {
    // e.preventDefault()
    const url = `https://api.skypicker.com/flights?flyFrom=${departure}&to=${destination}&dateFrom=12/01/2021&dateTo=12/12/2021&partner=picky&v=3`
    try {
      const response = await fetch(url)
      const data = await response.json()
      const firstData = data.data.slice(0, 5)
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
      <div className="searchBar">
      <h1>Flight Search</h1>
      <form className="dropdown" onSubmit={searchFlights}>
        <label className="label" htmlFor="departure"></label>
          <select className="form-control form-control-sm w-100" name="departure" onChange={selectDeparture}>
            <option>Choose your departure</option>
            <option value="PRG">Prague</option>
            <option value="TXL">Berlin</option>
            <option value="WAW">Warsaw</option>
            <option value="PED">Pardubice</option>
            
          </select>
          <br/><br/>
        
        <select className="form-control form-control-sm w-100" name="destination" onChange={selectDestination}>
        <option>Choose your destination</option>
            <option value="VLC">Valencia</option>
            <option value="BCN">Barcelona</option>
            <option value="MAD">Madrid</option>
            <option value="MXP">Milano</option>
            <option value="AIA">Athens</option>
        </select>
        <br/><br/>
            
          <button className="button">search</button>

      </form>

      </div>

    
      <div className="flight-list">
      {/* <h3 className="card-title">Flight Details:</h3> */}
      <div>

       <h2> {departure.length ? (departure + ' to') : '' } {destination}</h2>
      
      { flights && (

        !!flights.length ? (
        
          flights.map (
          
          (flight, i) => 
            <ul className="flight--card">
            <li>Option {i+1}</li>
            <hr />

            <li>Departure: <strong>{DateTime.fromMillis(flight.dTime * 1000).toFormat('hh:mm')}</strong></li>
            
            <li>Arrival: <strong>{DateTime.fromMillis(flight.aTime * 1000).toFormat('hh:mm')}</strong></li>

            <li>Duration: <strong>{flight.fly_duration}</strong> </li>
          </ul>
          
          )) : (
            
            <h2>No flights available</h2>

          )
        
          )
        }

      </div>
  

    </div>
      
    </div>
  );
}

export default App1;

