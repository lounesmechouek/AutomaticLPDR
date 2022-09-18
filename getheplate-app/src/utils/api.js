import { BASE_URL, MODEL_PORT ,LOCAL_URL,BE_PORT } from "../constants"
import axios from 'axios'

export const headers = {
    'Content-Type': 'application/json'
}

const ENV = "DEV" || "LOCAL" || "HYBRID"

const URLS = {
    DEV : {
        model_url : BASE_URL + ":" + MODEL_PORT ,
        be_url : BASE_URL + ":" + BE_PORT + "/api"
    },
    LOCAL : {
        model_url : LOCAL_URL + ":" + MODEL_PORT ,
        be_url : LOCAL_URL + ":" + BE_PORT + "/api"
    },
    HYBRID : {
        model_url : BASE_URL + ":" + MODEL_PORT ,
        be_url : LOCAL_URL + ":" + BE_PORT + "/api"
    }
}

export const model = {
    post : req =>
        axios.post(URLS[ENV].model_url + req.url,req.data,{
            headers : {
                ...headers ,
                Authorization : "Bearer " + req.token
            }
        })
        .then(res => res.data)
        .catch( err => response(err))
}

export const api = {
    get : req =>
        axios.get(URLS[ENV].be_url + req.url,{
            headers : {
                ...headers ,
                Authorization : "Bearer " + req.token
            }
        })
        .then(res => response(res.data))
        .catch( err => response(err))
    ,
    post : req =>
        axios.post(URLS[ENV].be_url+ req.url,req.data,{
            headers : {
                ...headers ,
                Authorization : "Bearer " + req.token
            }
        })
        .then(res => response(res.data))
        .catch( err => response(err))
    ,
    patch : req =>
        axios.patch(URLS[ENV].be_url+ req.url,req.data,{
            headers : {
                ...headers ,
                Authorization : "Bearer " + req.token
            }
        })
        .then(res => response(res.data))
        .catch( err => response(err))
    ,
    delete : req =>
        axios.delete(URLS[ENV].be_url + req.url,{
            headers : {
                ...headers ,
                Authorization : "Bearer " + req.token
            }
        })
        .then(res => response(res.data))
        .catch( err => response(err))
    ,
}

export const response = res => {
    return new Promise((resolve,reject) =>{
        if(res.success)
            return resolve(res.data)
        else 
            reject(res.response)
    })
}

