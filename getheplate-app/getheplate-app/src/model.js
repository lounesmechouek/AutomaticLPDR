import { api, model } from "./utils/api";
import axios from "axios";
export const Model = {
    Login : (username,password) => api.post({
        url : '/auth/login',
        data : {username,password}
    }),
    Scan : imgLink =>
        model.post({
            url : '/getplatenumber',
            data : {
                filename : "image.jpg", //default
                img : imgLink
            }
        }),
    DeletePhotoLink : delUrl => axios.post(delUrl) ,

}

export default Model ;