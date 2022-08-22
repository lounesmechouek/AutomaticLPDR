import { BASE_URL, MODEL_PORT ,LOCAL_URL,BE_PORT } from "../constants"
import axios from 'axios'

export const headers = {
    'Content-Type': 'application/json'
}

const ENV = "DEV" || "LOCAL" || "HYBRID"

const URLS = {
    DEV : {
        model_url : BASE_URL + ":" + MODEL_PORT ,
        be_url : BASE_URL + ":" + BE_PORT 
    },
    LOCAL : {
        model_url : LOCAL_URL + ":" + MODEL_PORT ,
        be_url : LOCAL_URL + ":" + BE_PORT 
    },
    HYBRID : {
        model_url : BASE_URL + ":" + MODEL_PORT ,
        be_url : LOCAL_URL + ":" + BE_PORT 
    }
}

export const model = {
    post : req =>
        axios.post("http://35.232.72.59:5000" + req.url,req.data, {headers})
        .then(res => res.data)
        .catch( err => response(err))
}

export const api = {
    get : req =>
        axios.get(URLS[DEV].be_url + req.url,{headers})
        .then(res => response(res.data))
        .catch( err => response(err))
    ,
    post : req =>
        axios.post(URLS[DEV].be_url+ req.url,req.data,{headers})
        .then(res => response(res.data))
        .catch( err => response(err))
}

export const response = res =>{
    return new Promise((resolve,reject) =>{
        if(res.success)
            return resolve(res.data)
        else if(!!res.error)
            reject(res.error)
        else
            reject(res.msg) 
    })
}

