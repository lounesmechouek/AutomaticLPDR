import { api, model } from "./utils/api";
import axios from "axios";


import { storage } from "./utils/storage";
export var getToken = async () => await storage.get('token')
export var getUserd = async () => await storage.get('user_id')


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
    verifLogin : async () => api.post({
        url : '/auth/verif',
        data : null,
        token : await getToken()
    }),
    getScans : async ()=> api.get({
        url : '/user/scans',
        token : await getToken()
    }),
    getScanPhotos : async scan_id => api.get({
        url : `/user/scan/${scan_id}/photos`,
        token : await getToken()
    }),
    flagScan : async (plate_id,val) => 
        val ? api.patch({
        url : `/plate/flag/${plate_id}`,
            data : null,
            token : await getToken()
        }) : 
        api.patch({
            url : `/plate/unflag/${plate_id}`,
            data : null,
            token : await getToken()
        }) 
        //some code may be added
    ,
    saveScan : async scan => api.post({
        url : '/scan/save',
        data : scan,
        token : await getToken()
    }),
    deleteScan : async scan_id => api.delete({
        url : `/user/delete/scan/${scan_id}`,
        token : await getToken()
    }),

}

export default Model ;