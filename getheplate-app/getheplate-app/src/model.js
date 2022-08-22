import { api, model } from "./utils/api";

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
        })
}

export default Model ;