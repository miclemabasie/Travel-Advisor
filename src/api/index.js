import axios from 'axios'

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'




export const getPlacesData = async ( {ne, sw} ) => {
    try {
      const options = {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY
        }
      };
        const { data: {data}} = await axios.get(URL, options)
        return data
    } catch (error) {
        console.log(error)
    }
}


export const getWeatherData = async (lat, lng) => {
  try {
    const URL = 'https://community-open-weather-map.p.rapidapi.com/weather'
    const { data } = await axios.get(URL, {
      params: {lon: lng, lat: lat},
      headers: {
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_WEATHER_API_KEY
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}