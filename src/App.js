import React from 'react'
import { CssBaseline, Grid } from '@material-ui/core';
import { Header, List, Map, PlaceDetails } from './components'
import { getPlacesData, getWeatherData } from './api';
import {useState, useEffect} from 'react'
import './App.css'
import userEvent from '@testing-library/user-event';

function App() {
  const [places, setPlaces ] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClick] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [rating, setRating ] = useState('')
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [weatherData, setWeatherData] = useState([])


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
      setCoordinates({lat: latitude, lng: longitude})
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating)
    setFilteredPlaces(filteredPlaces)
  }, [rating])
  
  
  
  useEffect(() => {
    if(bounds.sw && bounds.nw) {
      setIsLoading(true)
      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data))
        .then(console.log('this is about loading the weather data'))
      getPlacesData( bounds)
      .then((data) => {
        
        const valid_places = data?.map((place) => {
          return place.name && place.num_reviews > 0
         
        })
        setPlaces(valid_places)
        setFilteredPlaces([])
        setIsLoading(false)
      })
    }  
  }, [ type, bounds ])


  
  return (
    <>
        <CssBaseline />
        <Header setCoordinates={setCoordinates}/>
        <Grid container spacing={3} style={{width: '100%'}}>
            <Grid item xs={12} md={4}>
                <List 
                  places={ filteredPlaces.lenght ? filteredPlaces : places }
                  childClicked={childClicked}
                  isLoading={isLoading}
                  type={type}
                  setType={setType}
                  rating={rating}
                  setRating={setRating}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map 
                  weatherData={weatherData}
                  setCoordinates={setCoordinates}
                  setBounds={setBounds}
                  coordinates={coordinates}
                  places={ filteredPlaces.lenght ? filteredPlaces : places }
                  setChildClick={setChildClick}
                />
            </Grid>
        </Grid>
    </>
  )
}

export default App