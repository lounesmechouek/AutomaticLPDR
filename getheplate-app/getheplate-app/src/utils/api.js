import { BASE_URL } from "../contants"
import axios from 'axios'

export const headers = {
    //application-json
}

export const api = {
    get : req => {
        axios.get(BASE_URL + req.url,headers)
        .then(res => response(res))
        .catch( err => response(err))
    } ,
    post : req =>
        axios.post(BASE_URL + req.url,req.data,headers)
        .then(res => response(res))
        .catch( err => response(err))

}

export const response = res =>{
    return Promise((resolve,reject) =>{
        if(res.success)
            return resolve(res.data)
        else if(!!res.error)
            reject(res.error)
        else
            reject(res.msg) 
    })
}

export const Model = {
    Login : (username,password) => api.post({
        url : '/auth/login',
        data : {username,password}
    })
}
