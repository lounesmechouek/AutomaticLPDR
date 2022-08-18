import { MAPS_API_KEY } from '../constants';
import axios from 'axios'

export const getGeo = (lat,lon)=> {
  if (!lat || !lon ) return Promise.reject()
  let requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${MAPS_API_KEY}`
  return axios.get(requestUrl)
  .then( res => res.data?.results[0].formatted_address)
  .catch( err => null)
}


export default getGeo;
