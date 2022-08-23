import { api, model } from "./utils/api";
import axios from "axios";

export var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2MDY1NzI0OSwianRpIjoiNTY5YmI1M2QtNjc3MS00OTFjLThlODQtODU3ZjNmZjQ0MDBmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6MSwidXNlcm5hbWUiOiJtYWRqaWQiLCJoc2hfcGFzc3dvcmQiOiJwYmtkZjI6c2hhMjU2OjI2MDAwMCRJMWxlbnZwc3Zzb0dYNEJwJDQzZWQ3YmFjYzU5YjI2MDkxYWNkNzQ0ZDdjNWM4ZTllY2QwNjEyMTQ3YzIwMDkwNGY3ZWJkYzYxNTliOGU0N2MifSwibmJmIjoxNjYwNjU3MjQ5LCJleHAiOjE2NjE1NzUyNDl9.xhLmJtXy9KYf0TK5cMEjrCpdi7qjtzP0y94FzFQFEaI" 
export var user_id = 1

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
    verifLogin : () => api.post({
        url : '/auth/verif',
        data : null,
        token
    }),
    getScans : user_id => api.get({
        url : '/user/scans',
        token
    }),
    getScanPhotos : scan_id => api.get({
        url : `/user/scan/${scan_id}/photos`,
        token 
    }),
    flagScan : (plate_id,val) => 
        val ? api.patch({
        url : `/plate/flag/${plate_id}`,
            data : null,
            token 
        }) : 
        api.patch({
            url : `/plate/unflag/${plate_id}`,
            data : null,
            token 
        }) 
        //some code may be added
    ,
    saveScan : scan => api.post({
        url : '/scan/save',
        data : scan,
        token
    }),
    deleteScan : scan_id => api.delete({
        url : `/user/delete/scan/${scan_id}`,
        token 
    }),

}

export default Model ;