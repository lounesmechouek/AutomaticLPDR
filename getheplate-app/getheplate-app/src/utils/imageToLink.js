import { IMGBB_API_KEY } from "../constants"
import axios from 'axios'
export const getLink = imageFile => 
    axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {image :  imageFile},
        {headers: { 'Content-Type': 'multipart/form-data'}}
        )
    .then( res => res.data.data)
    .catch ( err => console.log(err))
