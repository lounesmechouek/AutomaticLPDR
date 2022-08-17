import { IMGBB_API_KEY } from "../constants"

export const getLink = imageFile => 
    axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {image :  imageFile},
        {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}}
        )
    .then( res => res.data )
    .catch ( err => {return {"error" : "Can't get the image"}})
